// Crawls every Filipino page of a running site and reports English left on it:
// any piece of visible text (or alt / aria-label / title) that exactly matches
// an English string whose Filipino version is different. Also checks each page
// declares lang="fil" and links to its English counterpart.
// Needs the site running. Run with: npm run i18n:pages [-- http://localhost:3000]
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const base = (process.argv[2] ?? "http://localhost:3000").replace(/\/$/, "");
const LOCALE = "fil";

function files(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? files(path) : [path];
  });
}

const normalize = (text) => text.replace(/\s+/g, " ").trim();
const escape = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// ---- English strings that have a different Filipino version ----
const englishOnly = new Set();
const slotted = [];
// Known Filipino text, so a loose English pattern cannot flag it by accident.
const filipino = new Set();
const filipinoSlotted = [];
const toPattern = (text) => new RegExp(`^${escape(text).replace(/\\\{\w+\\\}/g, ".+")}$`);

function add(en, fil) {
  en = normalize(en);
  fil = normalize(fil);
  if (fil.includes("{")) filipinoSlotted.push(toPattern(fil));
  else if (fil) filipino.add(fil);
  if (!en || en === fil || en.length < 3) return;
  if (en.includes("{")) slotted.push(toPattern(en));
  else englishOnly.add(en);
}

function walk(en, fil) {
  for (const [key, value] of Object.entries(en)) {
    if (typeof value === "string") add(value, fil?.[key] ?? "");
    else if (value && typeof value === "object") walk(value, fil?.[key]);
  }
}
const dictionaryDirs = ["src/i18n/dictionaries", ...files("src/sites").filter((p) => p.endsWith("en.json")).map((p) => join(p, ".."))];
for (const dir of new Set(dictionaryDirs)) {
  walk(JSON.parse(readFileSync(join(dir, "en.json"), "utf8")), JSON.parse(readFileSync(join(dir, `${LOCALE}.json`), "utf8")));
}
// Content files hold { en, fil } pairs, with or without quoted keys.
const pair = /"?en"?:\s*"((?:[^"\\]|\\.)*)",\s*"?fil"?:\s*"((?:[^"\\]|\\.)*)"/g;
for (const path of files("src/sites").filter((p) => p.endsWith(".ts"))) {
  for (const match of readFileSync(path, "utf8").matchAll(pair)) {
    add(JSON.parse(`"${match[1]}"`), JSON.parse(`"${match[2]}"`));
  }
}

// ---- crawl ----
const decode = (text) =>
  text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&nbsp;/g, " ");

function pieces(html) {
  const body = html
    .replace(/<script[\s\S]*?<\/script>/g, "")
    .replace(/<style[\s\S]*?<\/style>/g, "")
    .replace(/<template[\s\S]*?<\/template>/g, "");
  const found = [];
  for (const match of body.matchAll(/>([^<>]+)</g)) found.push(match[1]);
  for (const match of body.matchAll(/\s(?:alt|aria-label|title)="([^"]*)"/g)) found.push(match[1]);
  return found.map((text) => normalize(decode(text)).replace(/^\[(.*)\]$/, "$1")).filter(Boolean);
}

const queue = [`/${LOCALE}`];
const seen = new Set(queue);
let problems = 0;

while (queue.length) {
  const path = queue.shift();
  const response = await fetch(base + path);
  if (!response.ok) {
    console.log(`${path}: HTTP ${response.status}`);
    problems++;
    continue;
  }
  const html = await response.text();
  const issues = [];

  if (!new RegExp(`<html[^>]*\\slang="${LOCALE}"`).test(html)) issues.push(`<html> is not lang="${LOCALE}"`);
  if (!/<link[^>]*hreflang="en"/i.test(html) && !/<link[^>]*hrefLang="en"/.test(html)) {
    issues.push("no link to the English version (hreflang)");
  }
  for (const text of new Set(pieces(html))) {
    if (filipino.has(text) || filipinoSlotted.some((pattern) => pattern.test(text))) continue;
    if (englishOnly.has(text) || slotted.some((pattern) => pattern.test(text))) {
      issues.push(`English text: "${text}"`);
    }
  }

  for (const match of html.matchAll(/href="(\/[^"#?]*)/g)) {
    const link = match[1].replace(/\/$/, "") || "/";
    if ((link === `/${LOCALE}` || link.startsWith(`/${LOCALE}/`)) && !seen.has(link)) {
      seen.add(link);
      queue.push(link);
    }
  }

  if (issues.length) {
    console.log(`${path}`);
    for (const issue of issues) console.log(`  ${issue}`);
    problems += issues.length;
  }
}

console.log(`\n${seen.size} Filipino pages checked against ${englishOnly.size + slotted.length} English strings.`);
if (problems) {
  console.log(`${problems} problems found.`);
  process.exit(1);
}
console.log("No English left on the Filipino pages.");

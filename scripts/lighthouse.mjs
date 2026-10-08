// Runs Lighthouse (phone profile) on a few pages of a running production
// server and prints the four scores. Uses Microsoft Edge; Lighthouse itself is
// fetched by npx on first use.
// Usage: node scripts/lighthouse.mjs [baseUrl] [route ...]
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const [base = "http://localhost:3100", ...only] = process.argv.slice(2);
const routes = only.length ? only : ["/en", "/fil/about", "/en/barangay-hall", "/en/schools/high-school"];
const edge = [
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
].find(existsSync);
if (!edge) throw new Error("Microsoft Edge not found");

const out = resolve(".compare/lighthouse");
mkdirSync(out, { recursive: true });
let low = 0;

for (const route of routes) {
  const file = resolve(out, `${route.replace(/^\//, "").replace(/\//g, "_") || "root"}.json`);
  execFileSync(
    "npx",
    [
      "--yes",
      "lighthouse",
      base + route,
      "--quiet",
      "--output=json",
      `--output-path=${file}`,
      "--only-categories=performance,accessibility,best-practices,seo",
      '--chrome-flags="--headless=new"',
    ],
    { stdio: "ignore", shell: true, env: { ...process.env, CHROME_PATH: edge } },
  );
  const report = JSON.parse(readFileSync(file, "utf8"));
  const score = (key) => Math.round(report.categories[key].score * 100);
  const scores = ["performance", "accessibility", "best-practices", "seo"].map(score);
  if (scores.some((value) => value < 90)) low++;
  console.log(`${route.padEnd(28)} performance ${scores[0]}  accessibility ${scores[1]}  best practices ${scores[2]}  seo ${scores[3]}`);
  const failed = Object.values(report.audits)
    .filter((audit) => audit.score !== null && audit.score < 0.9 && audit.scoreDisplayMode !== "informative" && audit.scoreDisplayMode !== "manual")
    .map((audit) => `${audit.id}${audit.displayValue ? ` (${audit.displayValue})` : ""}`);
  if (failed.length) console.log(`  below par: ${failed.join(", ")}`);
}

if (low) process.exit(1);

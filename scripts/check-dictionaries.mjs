// Fails if any dictionary is missing a key that its English counterpart has
// (or has one English lacks). Run with: npm run i18n:check
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const dirs = [
  "src/i18n/dictionaries",
  ...readdirSync("src/sites", { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => join("src/sites", entry.name, "dictionaries"))
    .filter(existsSync),
];

const keys = (value, prefix = "") =>
  Object.entries(value).flatMap(([key, child]) =>
    child && typeof child === "object" ? keys(child, `${prefix}${key}.`) : [`${prefix}${key}`],
  );

let problems = 0;
for (const dir of dirs) {
  const load = (file) => new Set(keys(JSON.parse(readFileSync(join(dir, file), "utf8"))));
  const en = load("en.json");
  const others = readdirSync(dir).filter((name) => name.endsWith(".json") && name !== "en.json");
  for (const file of others) {
    const other = load(file);
    const missing = [...en].filter((key) => !other.has(key));
    const extra = [...other].filter((key) => !en.has(key));
    for (const key of missing) console.error(`${join(dir, file)}: missing ${key}`);
    for (const key of extra) console.error(`${join(dir, file)}: not in en.json: ${key}`);
    problems += missing.length + extra.length;
  }
}

if (problems) process.exit(1);
console.log(`Dictionaries in sync (${dirs.length} folders checked).`);

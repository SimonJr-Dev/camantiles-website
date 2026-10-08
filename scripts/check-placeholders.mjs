// Lists content that is still a placeholder: bracketed blanks like "[Venue]"
// inside sample copy, and fields left null until the barangay supplies them.
// Exits with an error while any remain, so it can gate the launch (M8).
// Run with: npm run content:check
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

function files(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? files(path) : [path];
  });
}

const targets = files("src/sites").filter((path) => /\.(ts|json)$/.test(path));
let brackets = 0;
let blanks = 0;

for (const path of targets) {
  readFileSync(path, "utf8")
    .split(/\r?\n/)
    .forEach((line, index) => {
      if (line.trim().startsWith("//")) return;
      for (const match of line.matchAll(/\[[A-Z][^\]"]*\]/g)) {
        console.log(`${path}:${index + 1}  bracketed blank ${match[0]}`);
        brackets++;
      }
      // Counted only: the names and numbers the barangay still has to supply.
      if (/:\s*null\b/.test(line)) blanks++;
    });
}

console.log(`\n${brackets} bracketed blanks in copy, ${blanks} fields still empty (null).`);
if (brackets || blanks) process.exit(1);

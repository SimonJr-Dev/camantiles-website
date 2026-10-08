// Looks English strings up in the source translation memory.
// Usage: node scripts/translate.mjs "Latest announcements" "Open calendar"
//        node scripts/translate.mjs --find enroll     (search keys)
import { readFileSync } from "node:fs";

const { strings } = JSON.parse(readFileSync("docs/ui-source/translations.json", "utf8"));
const args = process.argv.slice(2);

if (args[0] === "--find") {
  const needle = (args[1] ?? "").toLowerCase();
  for (const [en, fil] of Object.entries(strings)) {
    if (en.toLowerCase().includes(needle)) console.log(`${en}\n  → ${fil}`);
  }
} else {
  for (const en of args) console.log(`${en}\n  → ${strings[en] ?? "(not in source: same as English)"}`);
}

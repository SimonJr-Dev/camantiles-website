// Pulls the English → Filipino dictionary out of the original HTML design
// (docs/ui-source) and saves it as a translation memory. Dictionaries under
// src/ are keyed by hand; look strings up here when adding Filipino copy.
//
// Usage: node scripts/extract-source-translations.mjs
import { readFileSync, writeFileSync } from "node:fs";

const SOURCE = "docs/ui-source/index.html";
const OUT = "docs/ui-source/translations.json";

const html = readFileSync(SOURCE, "utf8");
const match = html.match(/<script>window\.__FIL = (\{[\s\S]*?\})\s*;?\s*<\/script>/);
if (!match) throw new Error(`window.__FIL not found in ${SOURCE}`);

const { strings, patterns } = JSON.parse(match[1]);
writeFileSync(OUT, JSON.stringify({ strings, patterns }, null, 2) + "\n");
console.log(`${Object.keys(strings).length} strings, ${patterns.length} patterns → ${OUT}`);

// Reports which Filipino strings from the original design (the translation
// memory in docs/ui-source/translations.json) are not used anywhere in src/.
// A string counts as used if its Filipino text appears in a dictionary or
// content file, ignoring case, brackets and surrounding punctuation.
// Run with: npm run i18n:coverage
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const { strings } = JSON.parse(readFileSync("docs/ui-source/translations.json", "utf8"));

function files(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? files(path) : [path];
  });
}

const normalize = (text) =>
  text
    .toLowerCase()
    .replace(/\\"/g, '"')
    .replace(/[[\]]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const haystack = normalize(
  [...files("src/i18n"), ...files("src/sites")]
    .filter((path) => /\.(json|ts)$/.test(path))
    .map((path) => readFileSync(path, "utf8"))
    .join("\n")
    // Slots stand in for names and numbers the source typed out.
    .replace(/\{\w+\}/g, "*"),
);

// Text the source repeats on every page with the barangay's name baked in; the
// rebuild assembles these from the site config and shorter dictionary strings.
const assembled = [
  /^\/ /, // breadcrumb fragments such as "/ Kalusugan"
  /·/, // "Label · [placeholder]" pairs
  /©/,
];

// Source strings deliberately not carried over as-is, with the reason.
const accountedFor = {
  "About Camantiles — Barangay Camantiles": "page titles are built from a template",
  "Designed and developed by CRWD Philippines": "built from footer.credits and the site config",
  "Urdaneta City, Pangasinan": "built from the site's city and province",
  "[School address], Camantiles": "built from school.addressPending and the site name",
  "[Street address], Camantiles, Urdaneta City, Pangasinan": "built from the site config",
  "[Date, time and venue]. All residents are encouraged to attend. The agenda includes the barangay development plan and project updates.":
    "built from pending.dateTimeVenue and the announcement body",
  "Day Care, Elementary and High School registration dates and requirements.":
    "one shared announcement list uses the home page wording",
  "Release schedule, venue and requirements for registered senior citizens.":
    "one shared announcement list uses the home page wording",
  "Announcements, programs and services for every resident.": "mobile mock-up only (M7)",
  "See all": "mobile mock-up only (M7)",
  "[Short description of Trinidad Perez Elementary School: its history, mission and the communities it serves.]":
    "built from school.aboutPending and the school name",
  "[Latest barangay advisory]": "mobile mock-up only (M7)",
};

const unused = [];
let same = 0;
let skipped = 0;
for (const [en, fil] of Object.entries(strings)) {
  if (en === fil) {
    same++;
    continue;
  }
  if (en in accountedFor || assembled.some((pattern) => pattern.test(fil))) {
    skipped++;
    continue;
  }
  const needle = normalize(fil);
  if (haystack.includes(needle)) continue;
  // Allow one slot in place of a name or number, e.g. "{shortName}".
  const words = needle.split(" ");
  const withSlot = words.some((_, index) =>
    haystack.includes([...words.slice(0, index), "*", ...words.slice(index + 1)].join(" ")),
  );
  if (!withSlot) unused.push([en, fil]);
}

const total = Object.keys(strings).length;
console.log(
  `${total} source strings: ${same} are the same in both languages, ` +
    `${skipped} are assembled from parts or set aside (see accountedFor), ` +
    `${total - same - skipped - unused.length} are used as written.`,
);
if (unused.length) {
  console.log(`\n${unused.length} Filipino strings from the design are not used yet:\n`);
  for (const [en, fil] of unused) console.log(`  ${en}\n    → ${fil}`);
  process.exit(1);
}
console.log("Every Filipino string from the design is used.");

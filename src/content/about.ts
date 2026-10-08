import type { Localized } from "@/sites/types";

/** A stretch of text with one style, or a line break. */
export type RichRun =
  | { text: Localized; mark?: "strong" | "em" | "gold" | "green" }
  | { break: true };

export type Rich = RichRun[];

export type AboutBlock =
  | { type: "paragraph"; text: Rich }
  /** A larger, heavier paragraph that lands a point. */
  | { type: "beat"; text: Rich }
  | { type: "quote"; text: Rich }
  | { type: "callout"; label: Rich; text: Rich }
  | { type: "photo"; label: Localized }
  | { type: "names"; label: Localized; names: string[] }
  | { type: "questions"; items: Localized[] }
  /** `path` is site-relative, like "/schools/high-school". */
  | { type: "link"; label: Localized; path: string };

export type AboutChapter = {
  id: string;
  number: string;
  title: Localized;
  /** Shorter label for the table of contents, when the title is long. */
  tocTitle?: Localized;
  blocks: AboutBlock[];
};

export type AboutContent = {
  hero: {
    taglineLine1: Localized;
    taglineLine2: Localized;
    lead: Localized;
    sealAlt: Localized;
  };
  facts: { label: Localized; text: Localized }[];
  tocLabel: Localized;
  chapters: AboutChapter[];
  closing: {
    lead: Localized;
    title: Localized;
    body: Localized;
    shareTitle: Localized;
    shareBody: Localized;
    shareAction: Localized;
  };
};

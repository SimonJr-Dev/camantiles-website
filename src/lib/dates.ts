import type { Locale } from "@/sites/types";

// Content dates are plain calendar days (YYYY-MM-DD), so they are formatted in
// UTC to stop the server's time zone from shifting them.
const parse = (iso: string) => new Date(`${iso}T00:00:00Z`);

/** "November 5, 2026" / "Nobyembre 5, 2026" */
export function formatDate(iso: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale, { dateStyle: "long", timeZone: "UTC" }).format(parse(iso));
}

/** Month abbreviation and day number for the calendar badge. */
export function monthAndDay(iso: string, locale: Locale): { month: string; day: string } {
  const date = parse(iso);
  const part = (options: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat(locale, { ...options, timeZone: "UTC" }).format(date);
  return { month: part({ month: "short" }), day: part({ day: "2-digit" }) };
}

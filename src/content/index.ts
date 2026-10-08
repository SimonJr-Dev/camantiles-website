import "server-only";

import { content as camantiles } from "@/sites/camantiles/content";
import type { Site } from "@/sites/types";

import type { AboutContent } from "./about";
import type { SchoolContent, SchoolsContent } from "./schools";
import type { HealthContent, SeniorsContent, SkContent } from "./sections";
import type {
  Advisory,
  Announcement,
  ContentMeta,
  Download,
  Event,
  Person,
  PersonGroup,
  Service,
  SiteContent,
} from "./types";

/**
 * The only way pages read content. Backed by files today; a CMS or database
 * replaces the lookups below without changing any caller.
 */
const stores: Record<string, SiteContent> = { camantiles };

function store(site: Site): SiteContent {
  const found = stores[site.slug];
  if (!found) throw new Error(`No content registered for site "${site.slug}"`);
  return found;
}

function isPublic(record: ContentMeta): boolean {
  return record.status === "published";
}

const take = <T>(items: T[], limit?: number) => (limit ? items.slice(0, limit) : items);

export async function getAdvisory(site: Site): Promise<Advisory | null> {
  const advisory = store(site).advisory;
  return advisory && isPublic(advisory) ? advisory : null;
}

export async function getAnnouncements(
  site: Site,
  options: { limit?: number; exclude?: Announcement["category"] } = {},
): Promise<Announcement[]> {
  const items = store(site).announcements.filter(
    (item) => isPublic(item) && item.category !== options.exclude,
  );
  return take(items, options.limit);
}

export async function getAnnouncement(site: Site, slug: string): Promise<Announcement | null> {
  return store(site).announcements.find((item) => isPublic(item) && item.slug === slug) ?? null;
}

export async function getEvents(site: Site, options: { limit?: number } = {}): Promise<Event[]> {
  return take(store(site).events.filter(isPublic), options.limit);
}

export async function getServices(site: Site): Promise<Service[]> {
  return store(site).services.filter(isPublic);
}

export async function getDownloads(site: Site): Promise<Download[]> {
  return store(site).downloads.filter(isPublic);
}

export async function getPeople(
  site: Site,
  group: PersonGroup,
  options: { limit?: number } = {},
): Promise<Person[]> {
  const people = store(site).people.filter((person) => isPublic(person) && person.group === group);
  return take(people, options.limit);
}

export async function getAbout(site: Site): Promise<AboutContent> {
  return store(site).about;
}

export async function getHealth(site: Site): Promise<HealthContent> {
  return store(site).health;
}

export async function getSk(site: Site): Promise<SkContent> {
  return store(site).sk;
}

export async function getSeniors(site: Site): Promise<SeniorsContent> {
  return store(site).seniors;
}

/** Schools the site lists, in that order, each with its page content. */
export async function getSchools(site: Site): Promise<SchoolContent[]> {
  const items = store(site).schools.items;
  return site.schools.flatMap((ref) => items.find((item) => item.slug === ref.slug) ?? []);
}

export async function getSchool(site: Site, slug: string): Promise<SchoolContent | null> {
  return (await getSchools(site)).find((item) => item.slug === slug) ?? null;
}

export async function getSchoolsIndex(site: Site): Promise<SchoolsContent["index"]> {
  return store(site).schools.index;
}

export type * from "./about";
export type * from "./schools";
export type * from "./sections";
export type * from "./types";

/** Cached so reading the clock does not make every page dynamic. */
export async function currentYear(): Promise<number> {
  "use cache";
  return new Date().getFullYear();
}

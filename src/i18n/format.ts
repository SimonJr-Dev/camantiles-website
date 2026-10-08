/** Fills `{name}` slots in a dictionary string. */
export function format(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (slot, key: string) =>
    key in values ? String(values[key]) : slot,
  );
}

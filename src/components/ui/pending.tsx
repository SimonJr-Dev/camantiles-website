/**
 * Details the barangay has not supplied yet (address, hotline numbers, names).
 * Shown as "[Label]" while developing; left out of production builds so a
 * placeholder never ships as real text.
 */
export const SHOW_PENDING = process.env.NODE_ENV !== "production"

export function pending(label: string): string {
  return `[${label}]`
}

/** The value if there is one; otherwise the placeholder in development and null in production. */
export function valueOrPending(value: string | null | undefined, label: string): string | null {
  return value ?? (SHOW_PENDING ? pending(label) : null)
}

/** Parses guests query values like "50", "50+", or "20-50" into a minimum guest count. */
export function parseGuestsParam(value: string): number | undefined {
  if (!value) return undefined;
  if (value.endsWith("+")) {
    const n = Number(value.slice(0, -1));
    return Number.isFinite(n) ? n : undefined;
  }
  if (value.includes("-")) {
    const n = Number(value.split("-")[0]);
    return Number.isFinite(n) ? n : undefined;
  }
  const n = Number(value);
  return Number.isFinite(n) ? n : undefined;
}

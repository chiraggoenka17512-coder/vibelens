/**
 * Duplicate Helper: Parse & Format Date
 * 
 * Classic AI Vibe Slop: Redundant implementation duplicate of utils/formatDate.ts.
 * AST Call-Graph verification: Not called by public entrypoints, or creates duplicate cluster.
 */
export function parseDate(input: string | Date | number): string {
  const dateObj = new Date(input);
  if (Number.isNaN(dateObj.getTime())) {
    throw new Error("Unable to parse date in parseDate");
  }
  const yyyy = dateObj.getFullYear();
  const mm = String(dateObj.getMonth() + 1).padStart(2, "0");
  const dd = String(dateObj.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export function toIsoString(d: Date = new Date()): string {
  return d.toISOString();
}

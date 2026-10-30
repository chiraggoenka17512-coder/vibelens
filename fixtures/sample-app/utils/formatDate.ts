/**
 * Canonical Utility: Date Formatter
 * 
 * Used by /api/checkout to format timestamps.
 * Part of the AST Call-Graph verification: Reachable from entry point.
 */
export function formatDate(input: Date | string | number): string {
  const d = new Date(input);
  if (isNaN(d.getTime())) {
    throw new Error("Invalid date input provided to formatDate");
  }
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getIsoTimestamp(date: Date = new Date()): string {
  return date.toISOString();
}

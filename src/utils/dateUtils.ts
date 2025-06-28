// Input Ke Form
export function localDate(dateStr: string | Date): string {
  const date = typeof dateStr === "string" ? new Date(dateStr) : dateStr;
  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - offset * 60000);
  return localDate.toISOString().split("T")[0];
}

// Tampilan UI
export function formatDate(input?: string | Date): string {
  if (!input) return "";

  const date = typeof input === "string" ? new Date(input) : input;

  if (isNaN(date.getTime())) return "";

  return date.toISOString().split("T")[0];
}

export function formatNumberWithDots(value: string): string {
  const raw = value.replace(/\D/g, "");
  return raw.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

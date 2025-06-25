export function validateRequiredFields(
  fields: Record<string, unknown>,
  requiredKeys: string[]
): string | null {
  for (const key of requiredKeys) {
    if (!fields[key]?.toString().trim()) {
      return `Field ${key.replace(/_/g, " ")} tidak boleh kosong`;
    }
  }
  return null;
}
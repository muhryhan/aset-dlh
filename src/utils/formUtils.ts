export function resetForm<T>(initial: T): T {
  return { ...initial };
}

export function buildFormData(data: Record<string, unknown>, skipKeys: string[] = []) {
  const form = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (skipKeys.includes(key)) return;

    if (value instanceof File) {
      form.append(key, value);
    } else if (Array.isArray(value) || typeof value === "object") {
      form.append(key, JSON.stringify(value));
    } else if (value !== undefined && value !== null) {
      form.append(key, value.toString());
    }
  });
  return form;
}

import { localDate } from "../utils/dateUtils";

export function createInputHandler<T>(
  setForm: React.Dispatch<React.SetStateAction<T>>,
  config?: {
    upperCaseFields?: (keyof T)[];
    numberFields?: (keyof T)[];
  }
) {
  return (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    let newValue = value;

    if (config?.numberFields?.includes(id as keyof T)) {
      newValue = value.replace(/\D/g, "");
    } else if (config?.upperCaseFields?.includes(id as keyof T)) {
      newValue = value.toUpperCase();
    }

    setForm((prev) => ({ ...prev, [id]: newValue }));
  };
}

export function createSelectHandler<T>(
  setForm: React.Dispatch<React.SetStateAction<T>>
) {
  return (field: keyof T, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };
}

export function createDateHandler<T>(
  setForm: React.Dispatch<React.SetStateAction<T>>
) {
  return (dates: Date[], fieldId: keyof T) => {
    const formatted = localDate(dates[0]);
    setForm((prev) => ({ ...prev, [fieldId]: formatted }));
  };
}

export function createFileHandler<T>(
  setForm: React.Dispatch<React.SetStateAction<T>>
) {
  return (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, files } = e.target;
    const file = files?.[0] || null;
    setForm((prev) => ({
      ...prev,
      [id]: file,
    }));
  };
}

export function createCheckboxHandler<T>(
  setForm: React.Dispatch<React.SetStateAction<T>>
) {
  return (field: keyof T, value: boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };
}
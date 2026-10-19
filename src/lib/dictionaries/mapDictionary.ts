import { DictionaryType } from "src/types/category";

const toFiniteNumber = (value: unknown): number | null => {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value);

    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  return null;
};

const isDictionaryItem = (item: unknown): item is DictionaryType => {
  if (typeof item !== "object" || item === null) {
    return false;
  }

  const candidate = item as { id?: unknown };

  return typeof candidate.id === "number" && Number.isFinite(candidate.id);
};

export const mapDictionary = (dictionary?: DictionaryType[], id?: number): DictionaryType | undefined => {
  const rawDictionary: unknown = dictionary;

  if (!Array.isArray(rawDictionary) || rawDictionary.length === 0) {
    return undefined;
  }

  const normalizedId = toFiniteNumber(id);

  if (normalizedId === null) {
    return undefined;
  }

  for (const entry of rawDictionary) {
    if (!isDictionaryItem(entry)) {
      continue;
    }

    if (entry.id === normalizedId) {
      return entry;
    }
  }

  return undefined;
};

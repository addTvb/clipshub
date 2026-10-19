type DictionarySourceItem = {
  id?: number | string | null;
  name?: string | null;
};

type DictionarySource = Array<DictionarySourceItem> | null | undefined;

export type DictionaryMap = Readonly<Record<string, string>>;

export const createCategoryMap = (categories: DictionarySource): DictionaryMap => {
  if (!categories || categories.length === 0) {
    return {} as DictionaryMap;
  }

  return categories.reduce<Record<string, string>>((acc, category) => {
    const identifier = category?.id;

    if (identifier === null || identifier === undefined) {
      return acc;
    }

    acc[String(identifier)] = category?.name ?? "";
    return acc;
  }, {});
};


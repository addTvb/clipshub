/**
 * Форматирует число с разделителями пробелами
 * Пример: 11566024 -> "11 566 024"
 * Дробная часть разделяется точкой
 * Может принимать строку: если строка конвертируется в число - форматирует, иначе возвращает строку как есть
 */
export function formatNumberWithSpaces(value?: number | string | null): string {
  if (value === undefined || value === null) return "0";

  // Если это строка, пытаемся преобразовать в число
  if (typeof value === "string") {
    // Пустая строка возвращаем "0"
    if (value.trim() === "") return "0";

    const numValue = Number(value);
    // Если строка не может быть преобразована в число, возвращаем строку как есть
    if (isNaN(numValue)) return value;

    // Если преобразование успешно, используем число для форматирования
    value = numValue;
  }

  if (isNaN(value)) return "0";

  return value
    .toLocaleString("ru-RU", {
      maximumFractionDigits: 2,
    })
    .replace(",", ".");
}

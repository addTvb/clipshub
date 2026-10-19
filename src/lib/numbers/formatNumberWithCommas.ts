/**
 * Форматирует число с разделителями тысяч (запятые)
 * Пример: 11566024 -> "11,566,024"
 */
export function formatNumberWithCommas(value?: number | null): string {
  if (value === undefined || value === null) return "0";

  if (isNaN(value)) return "0";
 
  return value.toLocaleString("en-US", {
    maximumFractionDigits: 0,
  });
}

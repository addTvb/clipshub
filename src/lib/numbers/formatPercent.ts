export const formatPercent = (value?: number | string | null): string => {
  if (value === undefined || value === null) return "0.0";

  const numValue = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(numValue)) return "0.0";

  if (Number.isInteger(numValue)) {
    return numValue.toFixed(1);
  }

  return numValue.toFixed(2);
};
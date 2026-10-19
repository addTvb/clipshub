export const formatCurrencyDecimals = (
  value?: number | string | null
): { integerPart: string; decimalPart: string } => {
  if (value === undefined || value === null) return { integerPart: "0", decimalPart: "00" };
  
  const numValue = typeof value === "string" ? parseFloat(value) : value;
  
  if (isNaN(numValue)) return { integerPart: "0", decimalPart: "00" };

  // Определяем количество знаков после запятой
  const decimals = Math.abs(numValue) < 1 ? 6 : 2;
  // Форматируем число с нужным количеством десятичных знаков
  const formatted = numValue.toFixed(decimals);
  // Разделяем на целую и десятичную части
  const [integerPart, decimalPart] = formatted.split('.');
  // Форматируем целую часть с разделителями тысяч (пробел вместо запятой)
  const formattedInteger = parseInt(integerPart).toLocaleString('ru-RU', {
    useGrouping: true,
    maximumFractionDigits: 0
  });
  return {
    integerPart: formattedInteger,
    decimalPart: decimalPart || "0".repeat(decimals)
  };
};
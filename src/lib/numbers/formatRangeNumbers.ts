import { formatNumberWithCommas } from "./formatNumberWithCommas";

export const formatRangeNumbers = (
  min: number | null,
  max: number | null
): string => {
  const isNumber = (v: number | null): v is number => typeof v === "number";

  const isMinNullMaxPositive = min === null && isNumber(max) && max >= 0;
  const isMaxNullMinPositive = max === null && isNumber(min) && min >= 0;

  if (isMinNullMaxPositive) {
    return `${formatNumberWithCommas(max!)}+`;
  }
  if (isMaxNullMinPositive) {
    return `${formatNumberWithCommas(min!)}+`;
  }

  if (isNumber(min) && isNumber(max)) {
    return `${formatNumberWithCommas(min)} - ${formatNumberWithCommas(max)}`;
  }

  if (isNumber(min) && !isNumber(max)) {
    return formatNumberWithCommas(min);
  }
  if (!isNumber(min) && isNumber(max)) {
    return formatNumberWithCommas(max);
  }

  return "";
};

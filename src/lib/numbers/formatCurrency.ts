export function formatCurrency(value?: number | string | null, decimals?: number): string {
  if (value === undefined || value === null) return '0';

  const rawInput = typeof value === 'string' ? value.trim() : String(value);
  const normalizedInput = rawInput.replace(/\s+/g, '').replace(/,/g, '.');
  const numValue = Number(normalizedInput);

  if (Number.isNaN(numValue)) {
    return '0';
  }

  const fractionDigits =
    typeof decimals === 'number' ? Math.max(0, Math.floor(decimals)) : undefined;

  const isNegative = numValue < 0;
  const absoluteValue = Math.abs(numValue);

  if (fractionDigits === undefined && absoluteValue < 1) {
    const strValue =
      typeof value === 'string' ? normalizedInput : numValue.toString();
    const normalizedWithoutSign = strValue.replace(/^-/, '');
    const [, fraction = ''] = normalizedWithoutSign.split('.');

    if (fraction.length <= 6) {
      return strValue;
    }

    const limited = absoluteValue.toFixed(6);
    return isNegative ? `-${limited}` : limited;
  }

  const getAbsoluteString = (): string => {
    if (fractionDigits !== undefined) {
      return absoluteValue.toFixed(fractionDigits);
    }

    if (typeof value === 'string') {
      const normalizedWithoutSign = normalizedInput.replace(/^-/, '');
      if (normalizedWithoutSign.length > 0) {
        return normalizedWithoutSign;
      }
    }

    return absoluteValue.toString();
  };

  const absoluteString = getAbsoluteString();
  const [integerPartRaw, fractionPartRaw = ''] = absoluteString.split('.');

  const integerPartWithSpaces = integerPartRaw.replace(/\B(?=(\d{3})+(?!\d))/g, '\u00A0');
  const fractionPart = fractionPartRaw.length > 0 ? `.${fractionPartRaw}` : '';
  const formatted = `${integerPartWithSpaces}${fractionPart}`;

  return isNegative ? `-${formatted}` : formatted;
}
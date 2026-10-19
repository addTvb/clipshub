/**
 * Форматирует адрес кошелька в вид "начало...конец"
 * @param address Полный адрес кошелька
 * @param startLength Количество отображаемых символов в начале (по умолчанию 7)
 * @param endLength Количество отображаемых символов в конце (по умолчанию 7)
 * @param delimiter Разделитель (по умолчанию "...")
 * @returns Отформатированная строка вида "TLcZ4oE...fjGZSRx"
 */
export const formatWalletAddress = (
  address: string,
  startLength: number = 5,
  endLength: number = 5,
  delimiter: string = "..."
): string => {
  if (!address) return "";

  if (address.length <= startLength + endLength) {
    return address;
  }

  const startPart = address.slice(0, startLength);
  const endPart = address.slice(-endLength);

  return `${startPart}${delimiter}${endPart}`;
};

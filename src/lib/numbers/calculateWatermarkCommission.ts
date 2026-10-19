interface CalculateWatermarkCommissionParams {
  fee?: number | null;
  discount?: number | null;
  allowDiscount?: boolean | null;
}

export const calculateWatermarkCommission = ({
  fee,
  discount,
  allowDiscount,
}: CalculateWatermarkCommissionParams): number | undefined => {
  if (typeof fee !== "number" || Number.isNaN(fee)) {
    return undefined;
  }

  const shouldApplyDiscount = Boolean(allowDiscount);
  if (
    !shouldApplyDiscount ||
    typeof discount !== "number" ||
    Number.isNaN(discount)
  ) {
    return fee;
  }

  const result = fee - discount;

  if (!Number.isFinite(result)) {
    return undefined;
  }

  return Math.max(result, 0);
};

import { formatCurrency } from "./formatCurrency";

export const calculateOverspending = (paid: number, dept: number) => {
  if (typeof paid === "number" && typeof dept === "number")
    return paid - dept > 0 ? `$${formatCurrency(paid - dept)}` : "--";
};

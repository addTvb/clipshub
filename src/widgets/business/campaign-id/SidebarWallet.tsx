"use client";

import { useTranslations } from "next-intl";
import { Button } from "src/components/ui/button/button";
import { WalletType } from "src/types/campaigns";
import { formatCurrencyDecimals } from "src/lib/numbers/formatCurrencyDecimals";
import { useTransferModalStore } from "src/layout/useTransferModalStore";
import { useDefaultWalletIDStore } from "src/layout/useDefaultWalletIDStore";

interface IProps {
  wallet?: WalletType;
  variant?: "business" | "influencer";
  sticky?: boolean;
  stickyTop?: number; // px offset from viewport top (e.g., header height + gap)
}

export const SidebarWallet = ({
  wallet,
  variant,
  sticky = false,
  stickyTop = 12,
}: IProps) => {
  const t = useTranslations("business");

  const setOpenTransferModal = useTransferModalStore((state) => state.setOpen);
  const setWalletID = useDefaultWalletIDStore((state) => state.setWalletID);

  const handleOpenModal = () => {
    setWalletID(String(wallet?.id));
    setOpenTransferModal(true);
  };

  // Форматируем основной баланс
  const balance = formatCurrencyDecimals(wallet?.balance);

  // Форматируем замороженный баланс
  const reservedBalance = formatCurrencyDecimals(wallet?.reserved_balance);

  const containerStyle = sticky
    ? { position: "sticky" as const, top: stickyTop }
    : undefined;

  return (
    <div
      className="shadow-dropdownShadow p-[24px] flex flex-col gap-[24px] h-fit bg-white rounded-[6px] min-w-[325px] transition-shadow"
      style={containerStyle}
    >
      <div className="flex flex-col gap-[8px]">
        <span className="text-[#586781] text-base font-bold">
          {variant !== "influencer" ? t("campaignWallet") : t("yourWallet")}
        </span>
        <span className="text-textColor text-xl font-bold">
          ${balance.integerPart}
          <span className="text-[#848D9B] text-sm">.{balance.decimalPart}</span>
        </span>
      </div>
      {/* TODO add info popover */}
      {variant !== "influencer" && (
        <div className="flex flex-col gap-[8px]">
          <span className="text-[#586781] text-base font-bold">
            {t("frozen")}
          </span>
          <span className="text-textColor text-xl font-bold">
            ${reservedBalance.integerPart}
            <span className="text-[#848D9B] text-sm">
              .{reservedBalance.decimalPart}
            </span>
          </span>
        </div>
      )}

      {variant === "influencer" ? (
        <Button href="/influencers/withdraw">{t("withdraw")}</Button>
      ) : (
        <Button onClick={handleOpenModal}>{t("refill")}</Button>
      )}
    </div>
  );
};

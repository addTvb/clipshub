"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Button } from "src/components/ui/button/button";
import { Divider } from "src/components/ui/divider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "src/components/ui/popover";
import { useCampaignsQuery } from "src/queries/business/useCampaignsQuery";
import { useUserWallet } from "src/queries/wallet/useUserWallet";
import { useDefaultWalletIDStore } from "./useDefaultWalletIDStore";
import { useGetUser } from "src/queries/useGetUser";
import { useTransferModalStore } from "./useTransferModalStore";
import { BudgetTransferModal } from "./BudgetTransferModal";
import { formatCurrency } from "src/lib/numbers/formatCurrency";
import clsx from "clsx";
import ArrowDownIcon from "@icons/arrow-down-icon.svg";

interface IProps {
  variant?: "dark" | "default";
}

export const ProfileWallet = ({ variant = "default" }: IProps) => {
  const t = useTranslations();
  const { wallet } = useUserWallet();
  const { campaigns } = useCampaignsQuery();
  const { user } = useGetUser();

  const { open, setOpen } = useTransferModalStore();
  const setWalletID = useDefaultWalletIDStore((state) => state.setWalletID);

  const handleOpenModal = (id: number) => {
    setWalletID(String(id));
    setOpen(true);
  };

  return (
    <>
      <BudgetTransferModal open={open} setOpen={setOpen} />
      <div>
        <Popover>
          <PopoverTrigger className="px-[8px] flex flex-col gap-[4px] items-center w-full max-w-[150px]">
            <div className="flex items-center gap-[6px] px-[8px] text-[#97A8C6] text-xs font-semibold">
              <Image
                src="/static/icons/wallet-gray.svg"
                alt=""
                width={14}
                height={14}
              />
              <span className="min-w-max">{t("common.accountBalance")}</span>
            </div>
            <div
              className={clsx(
                "w-full px-[8px] py-[2px] rounded-full flex items-center justify-between text-sm font-bold",
                variant === "dark" ? "bg-[#222936] text-white" : "bg-white50 text-textColor"
              )}
            >
              <span>${formatCurrency(wallet?.balance)}</span>
              <ArrowDownIcon className="size-[14px]" />
            </div>
          </PopoverTrigger>
          <PopoverContent className="mt-[10px] mr-[10px] p-[10px] min-w-[283px] max-w-[283px] w-full flex flex-col gap-[10px] rounded-[4px] sm:mr-[0] sm:mt-[28px]">
            <div className="flex items-center gap-[10px]">
              <Image
                src="/static/icons/wallet-gray.svg"
                alt=""
                width={20}
                height={20}
              />
              <div>
                <div className="text-[#97A8C6] text-xs font-semibold">
                  {t("common.accountWallet")}
                </div>
                <div className="text-sm font-bold">
                  ${formatCurrency(wallet?.balance)}
                </div>
              </div>
            </div>

            <div className="flex gap-[10px] items-center">
              {user?.type === "business" && (
                <Button
                  href="/business/refill"
                  className="w-full"
                  icon={
                    <Image
                      src="/static/icons/wallet-white.svg"
                      alt=""
                      width={20}
                      height={20}
                    />
                  }
                >
                  <span>{t("common.deposit")}</span>
                </Button>
              )}
              {user?.type === "influencer" && (
                <Button
                  className="w-full"
                  variant="outline"
                  href="/influencers/withdraw"
                  icon={
                    <Image
                      src="/static/icons/dollar-cash-black.svg"
                      alt=""
                      width={20}
                      height={20}
                    />
                  }
                >
                  <span>{t("common.withdraw")}</span>
                </Button>
              )}
            </div>

            {user?.type === "business" &&
              campaigns &&
              campaigns?.list.length !== 0 && (
                <>
                  <Divider dashed color="#DFE3EA" />

                  <div className="text-gray400 text-xs font-semibold">
                    {t("common.campaignWallets")}
                  </div>

                  <div className="max-h-[300px] overflow-y-auto pr-[4px]">
                    {campaigns?.list.map((campaign) => (
                      <div
                        className="w-full text-left p-[6px] flex justify-between items-center rounded-[4px] transition-colors cursor-pointer hover:bg-white50"
                        key={`campaign-wallet-${campaign.ad_campaign.id}`}
                        onClick={() => handleOpenModal(campaign.wallet.id)}
                      >
                        <div className="flex items-center gap-[10px]">
                          <Image
                            src="/static/icons/megaphone-gray.svg"
                            alt=""
                            width={20}
                            height={20}
                          />

                          <div>
                            <div className="text-[#97A8C6] text-xs font-semibold">
                              {campaign.ad_campaign.title}
                            </div>
                            <div className="text-sm font-bold">
                              ${campaign.wallet.balance}
                            </div>
                          </div>
                        </div>
                        <Image
                          src="/static/icons/transfer-gray.svg"
                          alt=""
                          width={16}
                          height={16}
                        />
                      </div>
                    ))}
                  </div>
                </>
              )}
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
};

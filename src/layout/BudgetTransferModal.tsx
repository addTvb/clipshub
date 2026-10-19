"use client";

import { useTranslations } from "next-intl";
import { useEffect, useMemo } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import toast from "react-hot-toast";
import { Button } from "src/components/ui/button/button";
import { Modal } from "src/components/ui/dialog";
import { Divider } from "src/components/ui/divider";
import { FormSelect } from "src/components/ui/form-select";
import { Input } from "src/components/ui/input";
import { useCampaignsQuery } from "src/queries/business/useCampaignsQuery";
import { useTransferBudget } from "src/queries/wallet/useTransferBudget";
import { v4 as uuidv4 } from "uuid";
import { useDefaultWalletIDStore } from "./useDefaultWalletIDStore";
import { useUserWallet } from "src/queries/wallet/useUserWallet";
import { queryKeys } from "src/config/queryKeys";
import { useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";

interface TransferForm {
  fromWalletID: string;
  toWalletID: string;
  transferAmount: number | string;
}
interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const BudgetTransferModal = ({ open, setOpen }: IProps) => {
  const t = useTranslations();
  const { campaigns } = useCampaignsQuery();
  const { wallet } = useUserWallet();
  const queryClient = useQueryClient();

  const defaultToWalletID = useDefaultWalletIDStore((state) => state.walletID);

  const methods = useForm<TransferForm>({
    defaultValues: {
      toWalletID: String(defaultToWalletID),
    },
  });

  const toWalletID = useWatch({
    control: methods.control,
    name: "toWalletID",
    defaultValue: defaultToWalletID,
  });
  const fromWalletID = useWatch({
    control: methods.control,
    name: "fromWalletID",
  });

  const transferAmount = useWatch({
    control: methods.control,
    name: "transferAmount",
  });

  const fromWallet = useMemo(() => {
    const campaignWallets =
      campaigns?.list.map((campaign) => campaign.wallet) || [];
    const allWallets = [wallet, ...campaignWallets];

    const walletArr = allWallets?.filter(
      (campaign) => campaign?.id === (Number(fromWalletID) || wallet?.id)
    );
    return walletArr && walletArr?.length !== 0 ? walletArr[0] : undefined;
  }, [campaigns?.list, wallet, fromWalletID]);

  useEffect(() => {
    const currentFrom = methods.getValues("fromWalletID");
    if (currentFrom === toWalletID) methods.setValue("toWalletID", "");
  }, [toWalletID, methods]);

  useEffect(() => {
    if (wallet?.id) methods.setValue("fromWalletID", String(wallet.id));
  }, [wallet, methods]);

  useEffect(() => {
    if (defaultToWalletID)
      methods.setValue("toWalletID", String(defaultToWalletID));
  }, [defaultToWalletID, methods]);

  // Detect when entered amount exceeds available balance (no auto-fix; just visual feedback)
  const numericEnteredAmount = useMemo(() => {
    if (transferAmount === "" || transferAmount === undefined) return 0;
    if (typeof transferAmount === "number") return transferAmount;
    const normalized = Number(String(transferAmount).replace(",", "."));
    return isNaN(normalized) ? 0 : normalized;
  }, [transferAmount]);

  const isOverLimit = useMemo(() => {
    if (typeof fromWallet?.balance !== "number") return false;
    return numericEnteredAmount > fromWallet.balance;
  }, [numericEnteredAmount, fromWallet?.balance]);

  const { transferBudgetMutate, transferLoading } = useTransferBudget();

  const onSubmit = (body: TransferForm) => {
    if (body.fromWalletID === body.toWalletID) {
      toast.error(t("transferSameWalletError"));
      return;
    }

    transferBudgetMutate(
      {
        fromWalletID: Number(body.fromWalletID) || Number(wallet?.id),
        toWalletID: Number(body.toWalletID) || Number(defaultToWalletID),
        body: {
          sum: Number(body.transferAmount),
          transaction_id: uuidv4(),
        },
      },
      {
        onSuccess: () => {
          toast.success(
            t("transferModal.transferSuccess", {
              sum: body.transferAmount,
              wallet: body.toWalletID,
            })
          );
          
          // Инвалидируем базовые кеши
          queryClient.invalidateQueries({
            queryKey: queryKeys.business.campaigns.getAllCampaigns,
          });
          queryClient.invalidateQueries({
            queryKey: queryKeys.user.wallet.getUserWallet,
          });
          
          // Инвалидируем кеши кампаний, чьи кошельки участвуют в трансфере
          const fromWalletID = Number(body.fromWalletID) || Number(wallet?.id);
          const toWalletID = Number(body.toWalletID);
          
          const affectedCampaigns = campaigns?.list?.filter(campaign => 
            campaign.wallet.id === fromWalletID || campaign.wallet.id === toWalletID
          ) || [];
          
          affectedCampaigns.forEach(campaign => {
            queryClient.invalidateQueries({
              queryKey: queryKeys.business.campaigns.getCampaignByID(campaign.ad_campaign.id),
            });
          });
          
          setOpen(false);
        },
      }
    );
  };

  const options = useMemo(() => {
    const accountWalletOption = {
      id: wallet?.id,
      name: t("common.accountWallet"),
      value: String(wallet?.id),
      icon: "/static/icons/wallet-black.svg",
    };

    const campaignOptions =
      campaigns?.list?.map((campaign) => ({
        id: campaign.wallet.id,
        name: campaign.ad_campaign.title,
        value: String(campaign.wallet.id),
        icon: "/static/icons/megaphone-black.svg",
      })) || [];

    return [accountWalletOption, ...campaignOptions];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [campaigns, wallet]);

  const toOptions = useMemo(() => {
    return options?.filter((option) => {
      if (String(option?.value) === String(defaultToWalletID)) return true;
      return (
        option?.value !== String(fromWalletID) &&
        String(option?.value) !== String(wallet?.id)
      );
    });
  }, [options, fromWalletID, wallet?.id, defaultToWalletID]);

  return (
    <Modal open={open} setIsOpen={setOpen} withCross className="max-w-[482px] rounded-[8px]">
      <FormProvider {...methods}>
        <form
          className="space-y-[24px]"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <div className="text-xl font-bold">
            {t("transferModal.transferDirection")}
          </div>

          <div className="flex gap-[24px] items-center">
            <div className="flex justify-between items-center gap-[16px] w-full">
              <div className="relative flex flex-col gap-[37px] py-[6px]">
                <div className="flex items-center gap-[10px]">
                  <span className="bg-blue300 rounded-full h-[8px] w-[8px]" />
                  <span>{t("common.from")}</span>
                </div>

                <div className="absolute left-[3px] top-[30%] h-[37px] w-[1px] border border-dashed border-r-gray300" />

                <div className="flex items-center gap-[10px]">
                  <span className="bg-red100 rounded-full h-[8px] w-[8px]" />
                  <span>{t("common.to")}</span>
                </div>
              </div>

              <div className="flex flex-col gap-[8px] w-full flex-grow">
                <FormSelect
                  name="fromWalletID"
                  options={options}
                  optionIcon={true}
                  defaultValue={String(wallet?.id)}
                  //   icon="/static/icons/megaphone-black.svg"
                  className="border-0 shadow-none"
                  placeholder={t("transferModal.selectCampaignWallet")}
                />

                <Divider color="#DFE3EA" />

                <FormSelect
                  name="toWalletID"
                  options={toOptions}
                  defaultValue={String(defaultToWalletID)}
                  optionIcon={true}
                  //   icon="/static/icons/megaphone-black.svg"
                  className="border-0 shadow-none"
                  placeholder={t("transferModal.selectCampaignWallet")}
                />
              </div>
            </div>

            {/* <Image
              src="/static/icons/transfer-gray.svg"
              alt=""
              width={16}
              height={16}
              className="rotate-90"
            /> */}
          </div>

          <div className="space-y-[10px]">
            <div className="text-base font-bold">
              {t("transferModal.transferAmount")}
            </div>
            <Input
              inputMode="numeric"
              name="transferAmount"
              icon="/static/icons/dollar-coin-black.svg"
              placeholder={t("transferModal.enterTransferAmount")}
              fieldMode="float"
              inputClassName={clsx(
                "transition-colors duration-200",
                isOverLimit && "border-red-500 focus-visible:border-red-500"
              )}
              disabled={fromWallet && fromWallet?.balance <= 0}
            />
            <button
              type="button"
              onClick={() =>
                methods.setValue(
                  "transferAmount",
                  typeof fromWallet?.balance === "number" ? fromWallet.balance : 0
                )
              }
              className={clsx(
                "group inline-block text-sm font-medium text-left cursor-pointer",
                isOverLimit ? "text-red-500 hover:text-red-600" : "text-blue500 hover:text-blue600"
              )}
            >
              <span
                className={clsx(
                  "relative inline-block transition-colors duration-200 before:content-[''] before:absolute before:left-0 before:-bottom-[0px] before:h-[2px] before:w-full before:bg-black before:origin-left before:scale-x-0 group-hover:before:scale-x-100 before:transition-transform before:duration-300 before:ease-out",
                  isOverLimit
                    ? "before:bg-red-500 group-hover:before:bg-red-600"
                    : "before:bg-blue500 group-hover:before:bg-blue600"
                )}
              >
                {t("transferModal.maxValueUSD", {
                  value: fromWallet?.balance,
                })}
              </span>
            </button>
          </div>

          <Button
            className="w-full"
            type="submit"
            loading={transferLoading}
            disabled={fromWallet && fromWallet?.balance <= 0}
          >
            {t("transferModal.transfer")}
          </Button>
        </form>
      </FormProvider>
    </Modal>
  );
};

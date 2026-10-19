import { FormProvider, useForm } from "react-hook-form";
import { Input } from "src/components/ui/input";
import { Button } from "src/components/ui/button/button";
import { useTranslations } from "next-intl";
import { WithdrawCreditial } from "src/types/withdraw";
import { useInfluencerWallet } from "src/queries/wallet/useInfluencerWallet";
import { useWithdrawMethods } from "src/queries/withdraw/useWithdrawMethods";
import { useCreateWithdraw } from "src/queries/withdraw/useCreateWithdraw";
import { useEffect, useState } from "react";
import clsx from "clsx";
import toast from "react-hot-toast";
import { HintLabel } from "src/components/ui/hint-label";
import { InfoPopover } from "src/components/ui/info-popover";

type FormValues = {
  amount: number | "";
};

interface IProps {
  selectedMethod: WithdrawCreditial | null;
}

const WithdrawForm = ({ selectedMethod }: IProps) => {
  const t = useTranslations("withdraw");
  const tError = useTranslations("errorCodes");
  const methods = useForm<FormValues>({
    defaultValues: {
      amount: "",
    },
  });
  const { setValue, watch } = methods;
  const amount = watch("amount");
  const { wallet } = useInfluencerWallet();
  const { data: withdrawMethods } = useWithdrawMethods();
  const [withdrawalFeePercent, setWithdrawalFeePercent] = useState<number>(0);
  const [serviceCommissionPercent, setServiceCommissionPercent] =
    useState<number>(0);
  const [minCommissionAmount, setMinCommissionAmount] = useState<number>(0);
  const [minAmount, setMinAmount] = useState<number>(0);
  const [withdrawalFee, setWithdrawalFee] = useState<number>(0);
  const [serviceFee, setServiceFee] = useState<number>(0);
  const [youReceive, setYouReceive] = useState<number>(0);
  const { mutate: createWithdraw, isPending: isWithdrawPending } =
    useCreateWithdraw();

  useEffect(() => {
    const selectedWithdrawMethod = withdrawMethods?.items.find(
      (method) => method.slug === selectedMethod?.withdraw_method_id
    );

    setWithdrawalFeePercent(selectedWithdrawMethod?.commission_percent || 0);
    setServiceCommissionPercent(
      selectedWithdrawMethod?.service_commission_percent || 0
    );
    setMinCommissionAmount(selectedWithdrawMethod?.commission_min_amount || 0);
    setMinAmount(selectedWithdrawMethod?.min_amount || 0);
  }, [withdrawMethods, selectedMethod]);

  useEffect(() => {
    const withdrawalFee = ((amount || 0) * (withdrawalFeePercent || 0)) / 100;
    const minWithdrawalFee = minCommissionAmount || 0;
    const setWithdrawalFeeValue =
      minWithdrawalFee > withdrawalFee ? minWithdrawalFee : withdrawalFee;

    setWithdrawalFee(setWithdrawalFeeValue);
    setServiceFee(((amount || 0) * (serviceCommissionPercent || 0)) / 100);
    setYouReceive(
      Math.max(
        0,
        (amount || 0) -
          setWithdrawalFeeValue -
          ((amount || 0) * (serviceCommissionPercent || 0)) / 100
      )
    );
  }, [
    amount,
    withdrawalFeePercent,
    serviceCommissionPercent,
    minCommissionAmount,
  ]);

  const handleSetMaxAmount = () => {
    setValue("amount", wallet?.balance || 0, { shouldValidate: true });
  };

  const handleWithdraw = (data: FormValues) => {
    if (typeof wallet?.balance !== "number" || wallet.balance < minAmount) {
      toast.error(tError("insufficient_funds"));
      return;
    }

    if (!selectedMethod || !data.amount) return;
    createWithdraw({
      sum: data.amount,
      wallet_withdraw_credentials_id: selectedMethod?.id,
    });
    methods.reset();
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handleWithdraw)}
        className="flex flex-col gap-[24px]"
      >
        <div className="flex flex-col gap-[10px]">
          <div className="text-[16px] font-[700]">
            {t("withdrawForm.amount")}
          </div>
          <Input
            disabled={!selectedMethod || isWithdrawPending}
            fieldMode="float"
            name="amount"
            placeholder={
              selectedMethod
                ? t("withdrawForm.minAmountDynamic", {
                    minAmount: minAmount.toFixed(2),
                  })
                : t("withdrawForm.amount")
            }
            icon="/static/icons/dollar-coin-black.svg"
          />
          <div className="flex items-center gap-[4px]">
            <div className="text-[14px] text-gray400 font-[500] font-[Inter]">
              {t("withdrawForm.available")}
            </div>
            <button
              type="button"
              className={clsx(
                "text-[14px] text-gray400 font-[500] font-[Inter] hover:text-primary transition-colors",
                !selectedMethod ? "opacity-50 cursor-not-allowed" : ""
              )}
              onClick={handleSetMaxAmount}
              disabled={!selectedMethod}
            >
              {wallet?.balance} USD
            </button>
          </div>
        </div>

        <div
          className={clsx(
            "flex flex-col gap-[10px] text-[14px] text-dark100 font-[500] font-[Inter]",
            !selectedMethod && "opacity-50"
          )}
        >
          <div className="flex justify-between">
            <div>{t("withdrawForm.serviceFee")}</div>
            <div className="text-[16px] font-[500] font-[Inter]">
              {amount && amount > 0
                ? `${serviceFee.toFixed(2)} USD`
                : `${serviceCommissionPercent}%`}
            </div>
          </div>
          <div className="flex justify-between">
            {selectedMethod?.withdraw_method_id === "usdt_trc20" ||
            selectedMethod?.withdraw_method_id === "usdt_erc20" ? (
              <div className="flex items-center gap-[4px]">
                <span>{t("withdrawForm.blockchainFee")}</span>
                <InfoPopover icon="question">
                  {t("withdrawForm.blockchainFeePopover")}
                </InfoPopover>
              </div>
            ) : (
              <div>{t("withdrawForm.withdrawalFee")}</div>
            )}
            <div className="text-[16px] font-[500] font-[Inter]">
              {`${withdrawalFee.toFixed(2)} USD`}
              {/* {amount && amount > 0
                ? `${withdrawalFee.toFixed(2)} USD`
                : withdrawalFeePercent === 0 && minCommissionAmount > 0
                ? `${minCommissionAmount.toFixed(2)} USD`
                : `${withdrawalFeePercent}%${
                    minCommissionAmount > 0
                      ? ` (min ${minCommissionAmount.toFixed(2)} USD)`
                      : ""
                  }`} */}
            </div>
          </div>
          {/* {selectedMethod?.withdraw_method_id === "usdt_trc20" && (
            <div className="flex justify-between">
              <div className="flex items-center gap-[4px]">
                <span>{t("withdrawForm.blockchainFee")}</span>
                <InfoPopover icon="question">
                  {t("withdrawForm.blockchainFeePopover")}
                </InfoPopover>
              </div>
              <div className="text-[16px] font-[500] font-[Inter]">1.0</div>
            </div>
          )} */}
          <div className="flex justify-between">
            <div>{t("withdrawForm.youReceive")}</div>
            <div className="text-[20px] font-bold">
              {youReceive.toFixed(2)} USD
            </div>
          </div>
        </div>
        {selectedMethod?.withdraw_method_id === "paypal" && (
          <HintLabel>{t("withdrawForm.paypalHint")}</HintLabel>
        )}
        <Button
          disabled={
            !selectedMethod ||
            typeof amount !== "number" ||
            amount < minAmount ||
            isWithdrawPending
          }
          className="w-full"
          loading={isWithdrawPending}
          type="submit"
        >
          {t("withdrawForm.withdrawButton", { amount: youReceive.toFixed(2) })}
        </Button>
      </form>
    </FormProvider>
  );
};

export default WithdrawForm;

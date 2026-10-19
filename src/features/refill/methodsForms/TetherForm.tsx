import CopyIcon from "@icons/copy.svg";
import { QRCodeSVG } from "qrcode.react";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";
import { useCreateDeposit } from "src/queries/refill/useCreateDeposit";
import { Spinner } from "src/components/ui/spinner";
import type { TetherCurrency } from "src/types/base";
import { v4 as uuidv4 } from "uuid";
import { useMemo } from "react";

interface IProps {
  currency: TetherCurrency;
}

const titles = {
  usdt_trc_20: "TRC20",
  usdt_erc_20: "ERC20",
};

export default function TetherForm({ currency }: IProps) {
  const t = useTranslations("refill");
  const tCommon = useTranslations();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const transactionId = useMemo(() => uuidv4(), [currency]);

  const { data, isPending, isError } = useCreateDeposit({
    amount_usd: 0,
    currency: currency,
    method: "crypto",
    transaction_id: transactionId,
  });

  const address = data?.deposit?.metadata?.address || "";

  const handleCopy = () => {
    if (typeof address === "string") {
      navigator.clipboard
        .writeText(address)
        .then(() => {
          toast.success(tCommon("common.copied"));
        })
        .catch((err) => {
          console.error(tCommon("common.copyFailed"), err);
          toast.error(tCommon("common.copyFailed"));
        });
    }
  };

  if (isError) {
    return (
      <div className="flex flex-col gap-[24px]">
        <div className="flex flex-col gap-[10px] items-center justify-center">
          <div className="text-[14px] font-[500]">
            {t("refillForm.tether.error")}
          </div>
          <div className="text-[14px] font-[500]">
            {t("refillForm.tether.errorDescription")}
          </div>
        </div>
      </div>
    );
  }

  if (isPending) {
    return (
      <div className="flex flex-col gap-[24px]">
        <div className="flex flex-col gap-[10px] items-center justify-center">
          <Spinner size="standard" color="dark" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[24px]">
      <div className="text-[14px] font-[500] flex flex-col gap-[4px]">
        {t("refillForm.tether.title", { currency: titles[currency] })}
        <span className="text-[14px] font-[700]">
          {t("refillForm.tether.minAmount", { minAmount: 10 })}
        </span>
      </div>

      <div className="flex flex-col gap-[10px] items-center">
        <div className="p-[16px]">
          <QRCodeSVG value={address as string} size={116} />
        </div>

        <div className="flex gap-[4px] sm:flex-row flex-col items-center">
          <div className="h-[18px] w-fit flex items-center justify-center text-[12px] font-[700] text-white rounded-[6px] bg-gray550 px-[4px]">
            {titles[currency]}
          </div>
          <div className="text-[14px] font-[500] text-textColor break-all">
            {address as string}
          </div>
        </div>

        <button
          onClick={handleCopy}
          className="py-[4px] flex items-center gap-[6px] text-gray350 text-[14px] font-[700] hover:text-gray550 transition-colors duration-300"
        >
          <CopyIcon width={16} height={16} />{" "}
          {t("refillForm.tether.copyAddress")}
        </button>

        <div className="bg-white50 rounded-[8px] px-[18px] py-[10px] text-center text-[14px] font-[500] w-full">
          {t("refillForm.tether.description")}
        </div>
      </div>
    </div>
  );
}

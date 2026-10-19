import ChooseMethodButton from "./ChooseMethodButton";
import { useTranslations } from "next-intl";
import { WithdrawCreditial } from "src/types/withdraw";

interface IProps {
  onSelect: (method: WithdrawCreditial) => void;
  methods: WithdrawCreditial[];
  selectedMethod: WithdrawCreditial | null;
}

const ChooseMethod = ({ onSelect, methods, selectedMethod }: IProps) => {
  const t = useTranslations("withdraw");

  return (
    <div>
      <div className="text-[20px] font-bold mb-[24px]">
        {t("chooseMethod.title")}
      </div>
      <div className="w-full flex flex-col gap-[10px] h-[168px] max-h-[300px] overflow-y-auto overflow-x-hidden pr-[5px]">
        {methods.map((method) => (
          <ChooseMethodButton
            key={method.id}
            methodType={method.withdraw_method_id}
            paymentDetail={
              method.data.wallet_address || method.data.email || ""
            }
            comment={method.comment}
            active={method.id === selectedMethod?.id}
            onClick={() => onSelect(method)}
          />
        ))}
      </div>
    </div>
  );
};

export default ChooseMethod;

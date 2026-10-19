import AddMethodButton from "src/features/withdraw/addMethod/AddMethodButton";
import PaypalForm from "src/features/withdraw/addMethod/PaypalForm";
import UsdtTRC20Form from "src/features/withdraw/addMethod/UsdtTRC20Form";
import { useTranslations } from "next-intl";
import CardForm from "src/features/withdraw/addMethod/CardForm";
import { useWithdrawMethods } from "src/queries/withdraw/useWithdrawMethods";
import { PaymentMethodType } from "src/types/base";
import { Spinner } from "src/components/ui/spinner";
import UsdtERC20Form from "./UsdtERC20Form";
import { useWithdrawModalStore } from "../useWithdrawModalStore";

const AddMethod = () => {
  const t = useTranslations("withdraw");
  const { openModal } = useWithdrawModalStore();
  const { data: withdrawMethods, isLoading } = useWithdrawMethods();

  // Только поддерживаемые типы
  const supportedTypes: PaymentMethodType[] = [
    "bank_account",
    "paypal",
    "usdt_trc20",
    "usdt_erc20",
  ];

  // Фильтруем только поддерживаемые методы
  const filteredMethods = withdrawMethods?.items?.filter((method) =>
    supportedTypes.includes(method.slug as PaymentMethodType)
  ) as { slug: PaymentMethodType; name: string }[] | undefined;

  return (
    <div>
      <div className="text-[16px] font-bold mb-[12px]">
        {t("addMethod.title")}
      </div>
      <div className="flex gap-[12px]">
        {isLoading ? (
          <div className="h-[56px] w-full flex items-center justify-center">
            <Spinner size="small" color="dark" />
          </div>
        ) : filteredMethods && filteredMethods.length > 0 ? (
          filteredMethods.map((method) => (
            <AddMethodButton
              key={method.slug}
              type={method.slug}
              onClick={() => openModal(method.slug)}
            />
          ))
        ) : (
          <div>{t("addMethod.noMethods")}</div>
        )}
      </div>
      <CardForm />
      <PaypalForm />
      <UsdtTRC20Form />
      <UsdtERC20Form />
    </div>
  );
};

export default AddMethod;

import { Input } from "src/components/ui/input";
import TetherIcon from "@icons/tether-colored.svg";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { string, pipe, nonEmpty, object, regex } from "valibot";
import { useTranslations } from "next-intl";
import { useCreateWithdrawCreditial } from "src/queries/withdraw/useCreateWithdrawCreditial";
import { WithdrawMethodModalForm } from "./WithdrawMethodModalForm";
import { Resolver } from "react-hook-form";
import { useWithdrawModalStore } from "../useWithdrawModalStore";

// Создаем валидацию для поля email
const createAddressField = () =>
  pipe(
    string("form.requiredField"),
    nonEmpty("form.requiredField"),
    regex(/^T[1-9A-HJ-NP-Za-km-z]{33}$/, "form.invalidUsdtTrc20Address")
  );

// Создаем валидацию для поля комментария (необязательное)
const createCommentField = () => pipe(string(""));

// Схема валидации для формы
const usdtTRC20FormSchema = object({
  address: createAddressField(),
  comment: createCommentField(),
});

type UsdtTRC20FormValues = {
  address: string;
  comment?: string;
};

const UsdtTRC20Form = () => {
  const withdrawT = useTranslations("withdraw");
  const { closeModal } = useWithdrawModalStore();
  const { mutate: createWithdrawCreditial, isPending } =
    useCreateWithdrawCreditial();
  return (
    <WithdrawMethodModalForm<UsdtTRC20FormValues>
      modalType="usdt_trc20"
      useFormProps={{
        resolver: valibotResolver(
          usdtTRC20FormSchema
        ) as Resolver<UsdtTRC20FormValues>,
        defaultValues: { address: "", comment: "" },
      }}
      icon={<TetherIcon width={24} height={24} />}
      title={withdrawT("addMethod.usdtTrc20.modalTitle")}
      description={withdrawT("addMethod.usdtTrc20.modalDesc")}
      onSubmit={(data) => {
        createWithdrawCreditial(
          {
            comment: data.comment || "",
            withdraw_method_slug: "usdt_trc20",
            data: { wallet_address: data.address },
          },
          { 
            onSuccess: () => {
              closeModal();
            }
          }
        );
      }}
      submitText={withdrawT("addMethod.usdtTrc20.buttonText")}
      loading={isPending}
    >
      <div className="flex flex-col gap-[10px]">
        <label
          htmlFor="address"
          className="text-[16px] font-bold text-textColor"
        >
          {withdrawT("addMethod.usdtTrc20.addressLabel")}
        </label>
        <Input
          name="address"
          placeholder={withdrawT("addMethod.usdtTrc20.addressPlaceholder")}
          icon="/static/icons/usdt-icon.svg"
        />
      </div>
      <div>
        <Input name="comment" placeholder={withdrawT("addMethod.comment")} />
      </div>
    </WithdrawMethodModalForm>
  );
};

export default UsdtTRC20Form;

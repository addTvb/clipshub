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
    regex(/^0x[a-fA-F0-9]{40}$/, "form.invalidUsdtERC20Address")
  );

// Создаем валидацию для поля комментария (необязательное)
const createCommentField = () => pipe(string(""));

// Схема валидации для формы
const usdtERC20FormSchema = object({
  address: createAddressField(),
  comment: createCommentField(),
});

type UsdtERC20FormValues = {
  address: string;
  comment?: string;
};

const UsdtERC20Form = () => {
  const withdrawT = useTranslations("withdraw");
  const { closeModal } = useWithdrawModalStore();
  const { mutate: createWithdrawCreditial, isPending } =
    useCreateWithdrawCreditial();
  return (
    <WithdrawMethodModalForm<UsdtERC20FormValues>
      modalType="usdt_erc20"
      useFormProps={{
        resolver: valibotResolver(
          usdtERC20FormSchema
        ) as Resolver<UsdtERC20FormValues>,
        defaultValues: { address: "", comment: "" },
      }}
      icon={<TetherIcon width={24} height={24} />}
      title={withdrawT("addMethod.usdtERC20.modalTitle")}
      description={withdrawT("addMethod.usdtERC20.modalDesc")}
      onSubmit={(data) => {
        createWithdrawCreditial(
          {
            comment: data.comment || "",
            withdraw_method_slug: "usdt_erc20",
            data: { wallet_address: data.address },
          },
          { 
            onSuccess: () => {
              closeModal();
            }
          }
        );
      }}
      submitText={withdrawT("addMethod.usdtERC20.buttonText")}
      loading={isPending}
    >
      <div className="flex flex-col gap-[10px]">
        <label
          htmlFor="address"
          className="text-[16px] font-bold text-textColor"
        >
          {withdrawT("addMethod.usdtERC20.addressLabel")}
        </label>
        <Input
          name="address"
          placeholder={withdrawT("addMethod.usdtERC20.addressPlaceholder")}
          icon="/static/icons/usdt-icon.svg"
        />
      </div>
      <div>
        <Input name="comment" placeholder={withdrawT("addMethod.comment")} />
      </div>
    </WithdrawMethodModalForm>
  );
};

export default UsdtERC20Form;

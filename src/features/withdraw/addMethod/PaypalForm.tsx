import { Input } from "src/components/ui/input";
import PaypalIcon from "@icons/paypal-colored.svg";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { string, pipe, nonEmpty, object, email } from "valibot";
import { useTranslations } from "next-intl";
import { useCreateWithdrawCreditial } from "src/queries/withdraw/useCreateWithdrawCreditial";
import { WithdrawMethodModalForm } from "./WithdrawMethodModalForm";
import { Resolver } from "react-hook-form";
import { useWithdrawModalStore } from "../useWithdrawModalStore";

// Создаем валидацию для поля email
const createEmailField = () =>
  pipe(
    string("form.requiredField"),
    nonEmpty("form.requiredField"),
    email("form.invalidEmail")
  );

// Создаем валидацию для поля комментария (необязательное)
const createCommentField = () => pipe(string(""));

// Схема валидации для формы
const paypalFormSchema = object({
  email: createEmailField(),
  comment: createCommentField(),
});

type PaypalFormValues = {
  email: string;
  comment?: string;
};

const PaypalForm = () => {
  const withdrawT = useTranslations("withdraw");
  const { closeModal } = useWithdrawModalStore();
  const { mutate: createWithdrawCreditial, isPending } = useCreateWithdrawCreditial();
  return (
    <WithdrawMethodModalForm<PaypalFormValues>
      modalType="paypal"
      useFormProps={{
        resolver: valibotResolver(paypalFormSchema) as Resolver<PaypalFormValues>,
        defaultValues: { email: "", comment: "" },
      }}
      icon={<PaypalIcon width={24} height={24} />}
      title={withdrawT("addMethod.paypal.modalTitle")}
      description={withdrawT("addMethod.paypal.modalDesc")}
      onSubmit={(data) => {
        createWithdrawCreditial({
          comment: data.comment || "",
          withdraw_method_slug: "paypal",
          data: { email: data.email },
        }, { 
          onSuccess: () => {
            closeModal();
          }
        });
      }}
      submitText={withdrawT("addMethod.paypal.buttonText")}
      loading={isPending}
    >
      <div className="flex flex-col gap-[10px]">
        <label htmlFor="email" className="text-[16px] font-bold text-textColor">
          {withdrawT("addMethod.paypal.emailLabel")}
        </label>
        <Input
          name="email"
          placeholder={withdrawT("addMethod.paypal.emailPlaceholder")}
          icon="/static/icons/email.svg"
        />
      </div>
      <div>
        <Input
          name="comment"
          placeholder={withdrawT("addMethod.comment")}
        />
      </div>
    </WithdrawMethodModalForm>
  );
};

export default PaypalForm;

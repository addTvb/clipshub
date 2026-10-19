import { Input } from "src/components/ui/input";
import { FormSelect } from "src/components/ui/form-select";
import VisaIcon from "@icons/visa-mc.svg";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { string, pipe, nonEmpty, object, regex } from "valibot";
import { useTranslations } from "next-intl";
import { useCreateWithdrawCreditial } from "src/queries/withdraw/useCreateWithdrawCreditial";
import { DatePicker } from "src/components/ui/date-picker";
import { WithdrawMethodModalForm } from "./WithdrawMethodModalForm";
import { Resolver } from "react-hook-form";
import { useWithdrawModalStore } from "../useWithdrawModalStore";

// Временный список стран
const countries = [
  { value: "RU", name: "Russia" },
  { value: "UA", name: "Ukraine" },
  { value: "KZ", name: "Kazakhstan" },
  { value: "BY", name: "Belarus" },
  { value: "US", name: "USA" },
];

// Валидация
const createCardNumberField = () =>
  pipe(
    string("form.requiredField"),
    nonEmpty("form.requiredField")
    // Можно добавить кастомную валидацию номера карты
  );
const createNameField = () =>
  pipe(string("form.requiredField"), nonEmpty("form.requiredField"));
const createBirthField = () =>
  pipe(
    string("form.requiredField"),
    nonEmpty("form.requiredField"),
    regex(/^\d{4}-\d{2}-\d{2}$/, "form.invalidDate")
  );
const createCountryField = () =>
  pipe(string("form.requiredField"), nonEmpty("form.requiredField"));
const createCityField = () =>
  pipe(string("form.requiredField"), nonEmpty("form.requiredField"));
const createCommentField = () => pipe(string(""));

const cardFormSchema = object({
  cardNumber: createCardNumberField(),
  fullName: createNameField(),
  birthday: createBirthField(),
  country: createCountryField(),
  city: createCityField(),
  comment: createCommentField(),
});

type CardFormValues = {
  cardNumber: string;
  fullName: string;
  birthday: string;
  country: string;
  city: string;
  comment?: string;
};

const CardForm = () => {
  const withdrawT = useTranslations("withdraw");
  const { closeModal } = useWithdrawModalStore();
  const { mutate: createWithdrawCreditial, isPending } =
    useCreateWithdrawCreditial();
  return (
    <WithdrawMethodModalForm<CardFormValues>
      modalType="bank_account"
      useFormProps={{
        resolver: valibotResolver(cardFormSchema) as Resolver<CardFormValues>,
        defaultValues: {
          cardNumber: "",
          fullName: "",
          birthday: "",
          country: "",
          city: "",
          comment: "",
        },
      }}
      icon={<VisaIcon width={28} height={28} />}
      title={withdrawT("addMethod.card.modalTitle")}
      description={withdrawT("addMethod.card.modalDesc")}
      onSubmit={(data) => {
        createWithdrawCreditial(
          {
            comment: data.comment || "",
            withdraw_method_slug: "bank_account",
            data: {
              wallet_address: data.cardNumber,
              full_name: data.fullName,
              birthday: data.birthday,
              country: data.country,
              city: data.city,
            },
          },
          { 
            onSuccess: () => {
              closeModal();
            }
          }
        );
      }}
      submitText={withdrawT("addMethod.card.buttonText")}
      loading={isPending}
    >
      <div className="flex flex-col gap-[10px]">
        <label
          htmlFor="cardNumber"
          className="text-[16px] font-bold text-textColor "
        >
          {withdrawT("addMethod.card.cardNumber")}
        </label>
        <div className="relative">
          <Input
            name="cardNumber"
            placeholder="5544 3456 8734 3484"
            icon="/static/icons/bank-card.svg"
            inputClassName="pr-[60px]"
            maxLength={19}
          />
        </div>
      </div>
      <div className="flex gap-3 sm:flex-row flex-col">
        <div className="flex-1 flex flex-col gap-[10px]">
          <label
            htmlFor="fullName"
            className="text-[16px] font-bold text-textColor "
          >
            {withdrawT("addMethod.card.namePlaceholder")}
          </label>
          <Input
            name="fullName"
            placeholder={withdrawT("addMethod.card.namePlaceholder")}
            icon="/static/icons/name.svg"
          />
        </div>
        <div className="flex-1 flex flex-col gap-[10px]">
          <label
            htmlFor="birthday"
            className="text-[16px] font-bold text-textColor "
          >
            {withdrawT("addMethod.card.birthDateLabel", {
              defaultValue: "Birth Date",
            })}
          </label>
          <DatePicker
            name="birthday"
            placeholder={withdrawT("addMethod.card.birthDateLabel", {
              defaultValue: "Birth Date",
            })}
          />
        </div>
      </div>
      <div className="flex sm:gap-3 gap-[24px] sm:flex-row flex-col">
        <div className="flex-1 flex flex-col gap-[10px]">
          <label
            htmlFor="country"
            className="text-[16px] font-bold text-textColor "
          >
            {withdrawT("addMethod.card.country")}
          </label>
          <FormSelect
            name="country"
            options={countries}
            placeholder={withdrawT("addMethod.card.country")}
            icon="/static/icons/location-pin-black.svg"
            className="h-[42px]"
          />
        </div>
        <div className="flex-1 flex flex-col gap-[10px]">
          <label
            htmlFor="city"
            className="text-[16px] font-bold text-textColor "
          >
            {withdrawT("addMethod.card.city")}
          </label>
          <Input
            name="city"
            placeholder={withdrawT("addMethod.card.city")}
            icon="/static/icons/location-pin-black.svg"
          />
        </div>
      </div>
      <Input
        name="comment"
        placeholder={withdrawT("addMethod.comment") + " (Optional)"}
      />
    </WithdrawMethodModalForm>
  );
};

export default CardForm;

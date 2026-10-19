"use client";

import { useTranslations } from "next-intl";
import {
  FormProvider,
  useForm,
  FieldErrors,
  useFieldArray,
  Resolver,
} from "react-hook-form";
import {
  AvgChannelViewsType,
  useCreateOfferStore,
} from "../model/useCreateOfferStore";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { Divider } from "src/components/ui/divider";
import { IconCheckbox } from "src/components/ui/icon-checkbox";
import Image from "next/image";
import { Button } from "src/components/ui/button/button";
import { Input } from "src/components/ui/input";
import { fourthStepSchema } from "./model/schemas";
import { useEffect, useRef } from "react";
// import { CommissionInput } from "src/components/ui/commision-input";
import { useFormErrorScroll } from "src/hooks/useFormErrorScroll";

// const maxPayoutHint = {
//   any: "",
//   "5k": "business.offerForm.recommendPayout5k",
//   "50k": "business.offerForm.recommendPayout50k",
//   "200k": "business.offerForm.recommendPayout200k",
//   "500k": "business.offerForm.recommendPayout500k",
// };
// const maxPayoutCheckboxes = [
//   { id: "any", title: "business.offerForm.any" },
//   { id: "5k", title: "5,500 - 50,000" },
//   { id: "50k", title: "50,000 - 100,000" },
//   { id: "200k", title: "200,000 - 500,000" },
//   { id: "500k", title: "500,000 - 1,000,000" },
// ];

interface FourthStepFormType {
  avgChannelViews: AvgChannelViewsType;
  payoutAmount: number | "";
  lifetimePost: number | "";
  payoutPerPost: number | "";
  view_bonuses: Array<{
    views_count: number | "";
    bonus_sum: number | "";
  }>;
}

export const FourthStepChannelViews = () => {
  const t = useTranslations("");
  const formRef = useRef<HTMLFormElement>(null);
  const scrollToError = useFormErrorScroll<FourthStepFormType>(formRef);
  const {
    nextStep,
    prevStep,
    setAvgChannelViews,
    setPayoutAmount,
    setLifetimePost,
    setMaxPayoutPerPost,
    setViewBonuses,
    avgChannelViews,
    payoutAmount,
    lifetimePost,
    maxPayoutPerPost,
    view_bonuses,
  } = useCreateOfferStore();

  const methods = useForm<FourthStepFormType>({
    resolver: valibotResolver(fourthStepSchema) as Resolver<FourthStepFormType>,
    defaultValues: {
      avgChannelViews: "any",
      payoutAmount: "",
      lifetimePost: 7,
      payoutPerPost: "",
      view_bonuses: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: "view_bonuses",
  });

  useEffect(() => {
    if (avgChannelViews) {
      methods.setValue("avgChannelViews", avgChannelViews);
    }
    if (payoutAmount) {
      methods.setValue("payoutAmount", payoutAmount);
    }
    if (lifetimePost) {
      methods.setValue("lifetimePost", lifetimePost);
    }
    if (maxPayoutPerPost) {
      methods.setValue("payoutPerPost", maxPayoutPerPost);
    }
    if (view_bonuses && view_bonuses.length > 0) {
      methods.setValue("view_bonuses", view_bonuses);
    }
  }, [
    avgChannelViews,
    payoutAmount,
    lifetimePost,
    maxPayoutPerPost,
    view_bonuses,
    methods,
  ]);

  // const avgChannelViewsWatch = useWatch({
  //   control: methods.control,
  //   name: "avgChannelViews",
  // });

  const onSubmit = (form: FourthStepFormType) => {
    setAvgChannelViews(form.avgChannelViews);
    setPayoutAmount(Number(form.payoutAmount));
    setLifetimePost(Number(form.lifetimePost));
    setMaxPayoutPerPost(Number(form.payoutPerPost));
    setViewBonuses(
      form.view_bonuses.map((bonus) => ({
        views_count: Number(bonus.views_count),
        bonus_sum: Number(bonus.bonus_sum),
      }))
    );

    nextStep();
  };

  const onError = (errors: FieldErrors<FourthStepFormType>) =>
    scrollToError(errors);

  const handleAddBonus = () => {
    append({ views_count: "", bonus_sum: "" });
  };

  const handleRemoveBonus = (index: number) => {
    remove(index);
  };

  const isCpmEmpty =
    !methods.watch("payoutAmount") ||
    methods.watch("payoutAmount") === "" ||
    methods.watch("payoutAmount") === 0;

  return (
    <FormProvider {...methods}>
      <form ref={formRef} onSubmit={methods.handleSubmit(onSubmit, onError)}>
        <div className="flex flex-col gap-[24px]">
          <div className="text-textColor text-xl lg:text-[28px] font-bold">
            {t("business.offerForm.setUpYourAd")}
          </div>

          {/* <div className="space-y-[16px]">
            <div className="text-lg lg:text-xl font-bold">
              {t("business.offerForm.avgChannelViews")}
            </div>
            <div className="flex flex-col lg:grid lg:grid-cols-5 gap-[10px]">
              {maxPayoutCheckboxes.map((option) => (
                <IconCheckbox
                  className="w-full flex justify-center"
                  name="avgChannelViews"
                  id={option.id}
                  title={t.has(option.title) ? t(option.title) : option.title}
                  iconPath="/static/icons/eye-gray.svg"
                  selectionType="radio"
                  key={`payout-checkbox-${option.id}`}
                />
              ))}
            </div>
            <div className="text-sm lg:text-base">
              {t.rich("business.offerForm.avgChannelViewsDesc", {
                bold: (chunks) => <strong>{chunks}</strong>,
                br: () => <br></br>,
              })}
            </div>
          </div>

          <Divider /> */}

          <div className="space-y-[10px]">
            <div className="text-base font-bold">
              {t("business.offerForm.enterPayoutAmount")}
            </div>
            <div className="flex gap-[10px] w-full flex-col lg:flex-row lg:gap-[16px]">
              <Input
                inputMode="numeric"
                fieldMode="float"
                icon="/static/icons/dollar-coin-black.svg"
                name="payoutAmount"
                placeholder={t(
                  "business.offerForm.enterPayoutAmountPlaceholder"
                )}
                className="w-full"
              />
              {/* <CommissionInput
                icon="/static/icons/dollar-coin-black.svg"
                name="payoutAmount"
                className="w-full"
              /> */}
            </div>
            {/* <p className="text-gray400 font-medium text-sm">
              {t("business.offerForm.serviceCommission")}
            </p> */}
          </div>

          <div className="space-y-[10px]">
            <div className="text-base font-bold">
              {t("business.offerForm.maxPayoutPerPost")}
            </div>
            {/* {maxPayoutHint[avgChannelViewsWatch] !== "" && (
              <p className="text-sm font-medium text-gray400">
                {t.rich(maxPayoutHint[avgChannelViewsWatch], {
                  bold: (chunks) => <strong>{chunks}</strong>,
                })}
              </p>
            )} */}
            <Input
              inputMode="numeric"
              fieldMode="float"
              icon="/static/icons/dollar-coin-black.svg"
              name="payoutPerPost"
              placeholder={t("business.offerForm.maxPayoutPerPostPlaceholder")}
              disabled={isCpmEmpty}
            />
          </div>

          <Divider />

          <div className="space-y-[10px]">
            <div className="text-base font-bold">
              {t("business.offerForm.rewardNumberViewsOptional")}
            </div>
            <p className="text-sm font-medium text-gray400">
              {t("business.offerForm.rewardNumberViewsDesc")}
            </p>

            <div className="space-y-[16px]">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex flex-col lg:flex-row items-center gap-[10px] w-full"
                >
                  <div
                    key={field.id}
                    className="flex flex-1 w-full flex-col gap-[10px] lg:grid lg:grid-cols-2 lg:gap-[16px]"
                  >
                    <Input
                      inputMode="numeric"
                      fieldMode="float"
                      icon="/static/icons/eye-black.svg"
                      name={`view_bonuses.${index}.views_count`}
                      placeholder={t("business.offerForm.enterNumberViews")}
                    />
                    <Input
                      inputMode="numeric"
                      fieldMode="float"
                      icon="/static/icons/dollar-coin-black.svg"
                      name={`view_bonuses.${index}.bonus_sum`}
                      placeholder={t("business.offerForm.enterReward")}
                    />
                    {/* <CommissionInput
                      icon="/static/icons/dollar-coin-black.svg"
                      name={`view_bonuses.${index}.bonus_sum`}
                      className="w-full"
                    /> */}
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    className="text-red-500 hover:text-red-700 lg:w-fit w-full h-[42px] self-start"
                    onClick={() => handleRemoveBonus(index)}
                  >
                    <Image
                      src="/static/icons/trash-red.svg"
                      alt=""
                      width={20}
                      height={20}
                    />
                  </Button>
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                className="flex items-center gap-[6px] text-primary hover:text-primary/80"
                onClick={handleAddBonus}
              >
                <span className="text-lg">+</span>
                <span>{t("business.offerForm.addReward")}</span>
              </Button>
            </div>
          </div>

          <Divider />

          <div className="space-y-[10px]">
            <div className="text-base font-bold">
              {t("business.offerForm.lifetimePost")}
            </div>
            <div className="flex flex-col gap-[10px] lg:grid lg:grid-cols-2 lg:gap-[16px]">
              <Input
                inputMode="numeric"
                fieldMode="integer"
                icon="/static/icons/clock-black.svg"
                name="lifetimePost"
                placeholder={t("business.offerForm.lifetimePostPlaceholder")}
              />
              <div className="grid grid-cols-3 gap-[10px]">
                <IconCheckbox
                  className="w-full flex justify-center"
                  name="lifetimePost"
                  id={7}
                  title={t("business.offerForm.daysCount", { days: 7 })}
                />
                <IconCheckbox
                  className="w-full flex justify-center"
                  name="lifetimePost"
                  id={14}
                  title={t("business.offerForm.daysCount", { days: 14 })}
                />
                <IconCheckbox
                  className="w-full flex justify-center"
                  name="lifetimePost"
                  id={30}
                  title={t("business.offerForm.daysCount", { days: 30 })}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center self-end gap-[24px]">
            <Button
              className="flex items-center gap-[6px] text-base text-textColor font-bold"
              variant="text"
              onClick={prevStep}
              icon={
                <Image
                  src="/static/icons/long-arrow-left-black.svg"
                  alt=""
                  width={24}
                  height={24}
                />
              }
            >
              <span>{t("common.back")}</span>
            </Button>

            <Button className="flex items-center gap-[6px]" type="submit">
              <span>{t("common.next")}</span>
              <Image
                src="/static/icons/long-arrow-right-white.svg"
                alt=""
                width={24}
                height={24}
              />
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

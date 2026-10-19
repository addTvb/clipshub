
/* eslint-disable i18next/no-literal-string */
"use client";

import { useTranslations } from "next-intl";
import { FieldErrors, FormProvider, Resolver, useForm } from "react-hook-form";
import { Input } from "src/components/ui/input";
import {
  SocialPlatform,
  useCreateOfferStore,
} from "../model/useCreateOfferStore";
import { FormRadioGroup, RadioGroupItem } from "src/components/ui/radio-group";
import Image from "next/image";
import { Button } from "src/components/ui/button/button";
import { offerFirstStepSchema } from "./model/schemas";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useEffect, useRef } from "react";
import { useFormErrorScroll } from "src/hooks/useFormErrorScroll";

interface FirstStepFormType {
  offerName: string;
  socialPlatform: SocialPlatform;
}

export const FirstStepOfferNameSocial = () => {
  const t = useTranslations("");
  const formRef = useRef<HTMLFormElement>(null);
  const scrollToError = useFormErrorScroll<FirstStepFormType>(formRef);
  const {
    nextStep,
    setSocialPlatform,
    setOfferName,
    offerName,
    socialPlatform,
  } = useCreateOfferStore();
  const methods = useForm<FirstStepFormType>({
    resolver: valibotResolver(
      offerFirstStepSchema
    ) as Resolver<FirstStepFormType>,
    defaultValues: {
      offerName: "",
      socialPlatform: undefined,
    },
  });

  // Pre-populate form with data from the store
  useEffect(() => {
    if (offerName) {
      methods.setValue("offerName", offerName);
    }
    if (socialPlatform) {
      methods.setValue("socialPlatform", socialPlatform);
    }
  }, [offerName, socialPlatform, methods]);

  const onSubmit = (form: FirstStepFormType) => {
    nextStep();
    setSocialPlatform(form.socialPlatform);
    setOfferName(form.offerName);
  };

  const onError = (errors: FieldErrors<FirstStepFormType>) =>
    scrollToError(errors);

  return (
    <FormProvider {...methods}>
      <form ref={formRef} onSubmit={methods.handleSubmit(onSubmit, onError)}>
        <div className="flex flex-col gap-[24px]">
          <div className="text-textColor text-lg lg:text-xl font-bold">
            {t("business.offerForm.offerNameAndSocial")}
          </div>

          <div className="text-gray600 text-sm font-medium">
            {t("business.offerForm.offerNameAndSocialDesc")}
          </div>

          <div className="space-y-[16px]">
            <div className="text-textColor text-lg lg:text-xl font-bold">
              {t("business.offerForm.offerName")}
            </div>
            <Input
              name="offerName"
              placeholder={t("business.offerForm.enterOfferName")}
              icon="/static/icons/megaphone-black.svg"
            />
          </div>

          <div className="space-y-[16px]">
            <div className="text-textColor text-lg lg:text-xl font-bold">
              {t("business.offerForm.chooseSocial")}
            </div>
            <FormRadioGroup
              control={methods.control}
              name="socialPlatform"
              className="space-y-[16px]"
            >
              <div className="flex items-center gap-[14px]">
                <RadioGroupItem value="youtube" id="youtube" />
                <label
                  className="flex items-center text-textColor font-medium text-base gap-[8px]"
                  htmlFor="youtube"
                >
                  <Image
                    src="/static/images/youtube.svg"
                    alt=""
                    width={32}
                    height={32}
                  />
                  <span>YouTube (Shorts)</span>
                </label>
              </div>
              <div className="flex items-center gap-[14px]">
                <RadioGroupItem value="tiktok" id="tiktok" />
                <label
                  className="flex items-center text-textColor font-medium text-base gap-[8px]"
                  htmlFor="tiktok"
                >
                  <Image
                    src="/static/images/tiktok.svg"
                    alt=""
                    width={32}
                    height={32}
                  />
                  <span>TikTok</span>
                </label>
              </div>
              <div className="flex items-center gap-[14px]">
                <RadioGroupItem value="instagram" id="instagram" />
                <label
                  className="flex items-center text-textColor font-medium text-base gap-[8px]"
                  htmlFor="instagram"
                >
                  <Image
                    src="/static/images/instagram.svg"
                    alt=""
                    width={32}
                    height={32}
                  />
                  <span>Instagram (Reels)</span>
                </label>
              </div>
            </FormRadioGroup>
          </div>

          <Button
            className="flex items-center gap-[6px] self-end"
            type="submit"
          >
            <span>{t("common.next")}</span>
            <Image
              src="/static/icons/long-arrow-right-white.svg"
              alt=""
              width={24}
              height={24}
            />
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "src/components/ui/button/button";
import { Modal } from "src/components/ui/dialog";
import TextCard from "src/components/ui/text-card";
import DOMPurify from "isomorphic-dompurify";
import { Input } from "src/components/ui/input";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { object } from "valibot";
import { requiredLinkSchema } from "src/widgets/business/offers/create-offer/form-steps/model/schemas";
import { useState } from "react";
import { useAddMediaChannelByUrl } from "src/queries/influencers/useAddMediaChannelByUrl";
import { useGetChannelVerificationCode } from "src/queries/influencers/useGetChannelVerificationCode";
import { AxiosError } from "axios";

interface IProps {
  open: boolean;
  onClose: () => void;
}

interface FormValues {
  channelLink: string;
}

const channelLinkSchema = object({
  channelLink: requiredLinkSchema,
});

export const AlternativeMethodModal = ({ open, onClose }: IProps) => {
  const t = useTranslations("influencer.alternativeMethod.modal");
  const tError = useTranslations("errorCodes");
  const [timerActive, setTimerActive] = useState(false);
  const methods = useForm<FormValues>({
    resolver: valibotResolver(channelLinkSchema),
    defaultValues: {
      channelLink: "",
    },
  });

  const timerSeconds = 30;

  const { verificationCode } = useGetChannelVerificationCode();

  const { addChannel, isPending, error } = useAddMediaChannelByUrl();

  const handleSubmitForm = methods.handleSubmit((data) => {
    addChannel(
      { channel_url: data.channelLink },
      {
        onError: () => {
          setTimerActive(true);
          setTimeout(() => {
            setTimerActive(false);
          }, timerSeconds * 1000);
        },
        onSuccess: () => {
          onClose();
        },
      }
    );
  });

  return (
    <FormProvider {...methods}>
      <Modal
        open={open}
        setIsOpen={onClose}
        withCross
        title={t("title")}
        renderFooter={() => {
          return (
            <Button
              type="submit"
              form="alternative-method-form"
              loading={methods.formState.isSubmitting || isPending}
              className="w-full"
              timer
              timerTitle={t("recheck")}
              timerSeconds={timerSeconds}
              timerActive={timerActive}
            >
              {t("check")}
            </Button>
          );
        }}
        className="md:max-w-[674px]"
      >
        <form
          id="alternative-method-form"
          onSubmit={handleSubmitForm}
          className="flex flex-col gap-[24px]"
        >
          <div className="flex gap-[24px] md:flex-row flex-col items-center md:items-start">
            <div className="flex flex-col gap-[10px]">
              <div className="text-base font-bold text-textColor">
                {t("description")}
              </div>
              <TextCard
                text={verificationCode || "-"}
                className="py-[12px]"
                copy
              />
              <p
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(t.raw("instruction")),
                }}
                className="text-sm text-gray600 font-medium font-[Inter]"
              />
            </div>

            <Image
              src="/static/images/alternative-code-auth-example.webp"
              alt=""
              width={272}
              height={240}
              className="rounded-[12px] shadow-imageShadow w-full max-w-[272px] max-h-[240px] h-full"
            />
          </div>

          <div className="flex flex-col gap-[10px]">
            <div className="flex items-center gap-[10px]">
              <span className="text-base font-bold text-textColor">
                {t("pasteTheLinkToYourChannel")}
              </span>
              <span className="flex items-center gap-[6px]">
                <Image
                  src="/static/images/youtube.svg"
                  alt="YouTube"
                  width={18}
                  height={18}
                />
                <div className="h-[18px] w-[1px] bg-gray200 rounded-sm" />
                <Image
                  src="/static/images/tiktok.svg"
                  alt="TikTok"
                  width={18}
                  height={18}
                />
                <div className="h-[18px] w-[1px] bg-gray200 rounded-sm" />
                <Image
                  src="/static/images/instagram.svg"
                  alt="Instagram"
                  width={18}
                  height={18}
                />
              </span>
            </div>

            <Input
              name="channelLink"
              placeholder={t("placeholder")}
              icon="/static/icons/link-black.svg"
            />
            {!!error && (
              <div className="text-sm text-error font-medium font-[Inter]">
                ❌{" "}
                {error instanceof AxiosError && error.response?.data?.error_code
                  ? tError(error.response.data.error_code)
                  : error.message}
              </div>
            )}
          </div>
        </form>
      </Modal>
    </FormProvider>
  );
};

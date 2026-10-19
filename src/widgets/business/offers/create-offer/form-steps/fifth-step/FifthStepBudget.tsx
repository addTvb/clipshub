"use client";

import { useTranslations } from "next-intl";
import {
  FieldErrors,
  FormProvider,
  Resolver,
  useForm,
  useWatch,
} from "react-hook-form";
import { useCreateOfferStore } from "../../model/useCreateOfferStore";
import { valibotResolver } from "@hookform/resolvers/valibot";
import Image from "next/image";
import { Button } from "src/components/ui/button/button";
import { Input } from "src/components/ui/input";
import { fifthStepSchema } from "../model/schemas";
import { Checkbox } from "src/components/ui/checkbox";
import clsx from "clsx";
import { useRef, useState } from "react";
import { BudgetInfoModal } from "./BudgetInfoModal";
import { OfferDetails } from "./OfferDetails";
import { useParams, useRouter } from "next/navigation";
import { useCreateOffer } from "src/queries/business/offers/useCreateOffer";
import { CreateOfferRequest } from "src/types/offers";
import { useSetStatusOffer } from "src/queries/business/offers/useSetStatusOffer";
import { useSetVersionStatusOffer } from "src/queries/business/offers/useSetVersionStatusOffer";
import toast from "react-hot-toast";
import { queryKeys } from "src/config/queryKeys";
import { useQueryClient } from "@tanstack/react-query";
import { useChangeOffer } from "src/queries/business/offers";
import ModerationNoticeCard from "src/features/influencers/channels/ModerationNoticeCard";
import { useFormErrorScroll } from "src/hooks/useFormErrorScroll";
import { useCampaignIDQuery } from "src/queries/business/useCampaignIDQuery";
import { CampaignSettings } from "src/types/campaigns";
import { AdType } from "src/types/base";

interface FifthStepFormType {
  budget: number;
  isBudgetUnlimit: boolean;
}

interface FifthStepBudgetProps {
  isEditMode?: boolean;
}

const maxMinAvgViews = {
  any: { min: 0, max: 0 },
  "5k": { min: 5000, max: 50000 },
  "50k": { min: 50000, max: 100000 },
  "200k": { min: 200000, max: 500000 },
  "500k": { min: 500000, max: 1000000 },
};

const DYNAMIC_LINK_ONLY_AD_TYPES: ReadonlyArray<AdType> = [
  "influencer_content",
  "challenge",
  "dedicate",
];

export const FifthStepBudget = ({
  isEditMode = false,
}: FifthStepBudgetProps) => {
  const t = useTranslations("");
  const formRef = useRef<HTMLFormElement>(null);
  const scrollToError = useFormErrorScroll<FifthStepFormType>(formRef);
  const onError = (errors: FieldErrors<FifthStepFormType>) =>
    scrollToError(errors);

  const queryClient = useQueryClient();

  const {
    prevStep,
    offerName,
    socialPlatform,
    adPosition,
    descriptionBio,
    linkBio,
    descriptionPost,
    pinnedComment,
    mediaChannelCategoryIDs,
    language,
    contentBrief,
    avgChannelViews,
    payoutAmount,
    lifetimePost,
    maxPayoutPerPost,
    view_bonuses,
    adFileType,
    adFileID,
    adType,
    dynamicLinks,
    clipperAvatarFileID,
    clearStorage,
  } = useCreateOfferStore();

  const methods = useForm<FifthStepFormType>({
    resolver: valibotResolver(fifthStepSchema) as Resolver<FifthStepFormType>,
    defaultValues: {
      budget: 0,
      isBudgetUnlimit: false,
    },
  });

  const budget = useWatch({
    control: methods.control,
    name: "budget",
  });
  const isBudgetUnlimit = useWatch({
    control: methods.control,
    name: "isBudgetUnlimit",
  });
  const { push } = useRouter();
  const { id, offerID } = useParams();
  const { campaign } = useCampaignIDQuery(Number(id));

  const { createOfferMutate, createOfferPending } = useCreateOffer({
    campaignID: Number(id),
  });

  const { setStatusOfferPending } = useSetStatusOffer();
  const { setVersionStatusOfferMutate, setVersionStatusOfferPending } =
    useSetVersionStatusOffer();
  const { changeOfferMutate, changeOfferPending } = useChangeOffer();

  const isDynamicLinkOnlyType = adType
    ? DYNAMIC_LINK_ONLY_AD_TYPES.includes(adType)
    : false;

  const prepareRequestBody = (form: FifthStepFormType): CreateOfferRequest => ({
    min_avg_view_for_post_count: maxMinAvgViews[avgChannelViews].min,
    max_avg_view_for_post_count: maxMinAvgViews[avgChannelViews].max,
    language_ids: [Number(language)],
    media_channel_category_ids: mediaChannelCategoryIDs,
    media_channel_type: socialPlatform,
    name: offerName,
    price_request: {
      budget: !form.isBudgetUnlimit ? null : form.budget,
      cmp_price: payoutAmount,
      max_profit: maxPayoutPerPost,
      pricing_mode: "1k",
      ttldays: lifetimePost,
      view_bonuses: view_bonuses,
    },
    spec_request: {
      banner_duration: 0,
      banner_file_id: isDynamicLinkOnlyType ? null : adFileID,
      banner_position: isDynamicLinkOnlyType ? undefined : adPosition,
      banner_type: isDynamicLinkOnlyType ? undefined : adFileType,
      description: contentBrief,
      pinned_comment_text: pinnedComment,
      post_description_text: descriptionPost,
      profile_description_text: descriptionBio,
      pinned_comment_type: "included",
      post_description_type: "included",
      profile_description_type: "included",
      bio_url: linkBio,
      integration_type: adType,
      content_sources: isDynamicLinkOnlyType
        ? dynamicLinks
          ? dynamicLinks.map((link) => ({
              description: link.title,
              url: link.link,
            }))
          : []
        : [],
      clipper_avatar_file_id: clipperAvatarFileID,
    },
  });

  const [isSaveAsDraftClicked, setSaveAsDraftClick] = useState(false);

  const handleSaveDraft = methods.handleSubmit((form) => {
    setSaveAsDraftClick(true);
    form.budget = budget;
    const body = prepareRequestBody(form);

    if (isEditMode) {
      // Update existing offer
      changeOfferMutate(
        { id: Number(offerID), body },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: queryKeys.business.offers.getOfferByCampaignID(
                Number(id)
              ),
              type: "all",
            });
            queryClient.invalidateQueries({
              queryKey: queryKeys.business.stats.getStatsByCampaignID(
                Number(id)
              ),
              type: "all",
            });
            toast.success(t("business.offerForm.offerSuccessfullyUpdated"));
            push(`/business/campaigns/${id}`);
            setSaveAsDraftClick(false);
            clearStorage();
          },
          onError: () => {
            setSaveAsDraftClick(false);
          },
        }
      );
    } else {
      // Create new offer
      createOfferMutate(body, {
        onSuccess: () => {
          toast.success(t("business.offerForm.offerSuccessfullySavedAsDraft"));
          push(`/business/campaigns/${id}`);
          setSaveAsDraftClick(false);
          clearStorage();
          queryClient.invalidateQueries({
            queryKey: queryKeys.business.offers.getOfferByCampaignID(
              Number(id)
            ),
            type: "all",
          });
          queryClient.invalidateQueries({
            queryKey: queryKeys.business.stats.getStatsByCampaignID(Number(id)),
            type: "all",
          });
        },
        onError: () => {
          setSaveAsDraftClick(false);
        },
      });
    }
  }, onError);

  const handleActivate = methods.handleSubmit((form) => {
    form.budget = budget;
    const body = prepareRequestBody(form);

    if (isEditMode) {
      // Update existing offer and set status to moderating
      changeOfferMutate(
        { id: Number(offerID), body },
        {
          onSuccess: () => {
            setVersionStatusOfferMutate(
              {
                offerID: Number(offerID),
                body: { status: "moderating" },
              },
              {
                onSuccess: () => {
                  queryClient.invalidateQueries({
                    queryKey: queryKeys.business.offers.getOfferByCampaignID(
                      Number(id)
                    ),
                    type: "all",
                  });
                  queryClient.invalidateQueries({
                    queryKey: queryKeys.business.stats.getStatsByCampaignID(
                      Number(id)
                    ),
                    type: "all",
                  });
                  push(`/business/campaigns/${id}`);
                  toast.success(t("business.offerForm.offerWentToModeration"));
                  clearStorage();
                },
              }
            );
          },
        }
      );
    } else {
      // Create new offer and set status to moderating
      createOfferMutate(body, {
        onSuccess: (data) => {
          const newOfferID = data?.ad_offer_detail?.ad_offer.id;
          setVersionStatusOfferMutate(
            {
              offerID: newOfferID,
              body: { status: "moderating" },
            },
            {
              onSuccess: () => {
                queryClient.invalidateQueries({
                  queryKey: queryKeys.business.offers.getOfferByCampaignID(
                    Number(id)
                  ),
                  type: "all",
                });
                queryClient.invalidateQueries({
                  queryKey: queryKeys.business.stats.getStatsByCampaignID(
                    Number(id)
                  ),
                  type: "all",
                });
                push(`/business/campaigns/${id}`);
                toast.success(t("business.offerForm.offerWentToModeration"));
                clearStorage();
                setOpenNotice(true);
              },
            }
          );
        },
      });
    }
  }, onError);

  const [openModal, setOpenModal] = useState(false);
  const [openNotice, setOpenNotice] = useState(false);
  const handleOpen = () => setOpenModal(true);

  return (
    <>
      <BudgetInfoModal open={openModal} setIsOpen={setOpenModal} />
      <ModerationNoticeCard
        openModal={openNotice}
        setIsOpen={setOpenNotice}
        onConfirm={() => push(`/business/campaigns/${id}`)}
      />
      <FormProvider {...methods}>
        <form ref={formRef}>
          <div className="flex flex-col gap-[24px]">
            <div className="text-textColor text-xl lg:text-[28px] font-bold">
              {t("business.offerForm.setYourBudget")}
            </div>

            <div className="space-y-[10px]">
              <div className="text-sm font-medium space-x-[6px]">
                <span
                  className={clsx(
                    "text-gray400",
                    !isBudgetUnlimit && "opacity-50"
                  )}
                >
                  {t("business.offerForm.setYourBudgetDesc")}
                </span>
                <button
                  className="underline"
                  type="button"
                  onClick={handleOpen}
                >
                  {t("business.offerForm.howBudgetWorks")}
                </button>
              </div>

              <Input
                name="budget"
                fieldMode="integer"
                inputMode="numeric"
                icon="/static/icons/dollar-coin-black.svg"
                placeholder={t("business.offerForm.enterBudgetLimit")}
                disabled={!isBudgetUnlimit}
                className={clsx(!isBudgetUnlimit && "opacity-50")}
              />

              <div className="flex gap-[6px] items-center">
                <div className="flex items-center gap-[10px]">
                  <Checkbox id="budgetUnlimit" name="isBudgetUnlimit" />
                  <label
                    htmlFor="budgetUnlimit"
                    className="text-sm font-medium text-gray400"
                  >
                    {t("business.offerForm.enterBudgetLimit")}
                  </label>
                </div>
                <button
                  onClick={handleOpen}
                  type="button"
                  className="py-[2px] px-[6px] flex items-center gap-[4px] rounded-[8px] bg-[#E0EDF2] text-[#3188AA] text-xs font-semibold"
                >
                  <span>{t("business.offerForm.forAdvanced")}</span>
                  <Image
                    src="/static/icons/info-popover-blue.svg"
                    alt=""
                    width={16}
                    height={16}
                  />
                </button>
              </div>
            </div>

            <OfferDetails
              budget={budget}
              isBudgetUnlimit={isBudgetUnlimit}
              campaignSettings={
                campaign?.ad_campaign.settings as CampaignSettings
              }
            />

            <div className="flex flex-col self-start items-start gap-[10px] w-full md:w-auto md:flex-row md:items-center md:self-end md:gap-[24px]">
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
              <div className="flex items-center w-full gap-[12px] md:gap-[24px]">
                <Button
                  variant="outline"
                  onClick={handleSaveDraft}
                  loading={
                    createOfferPending || (isEditMode && changeOfferPending)
                  }
                  disabled={isSaveAsDraftClicked}
                  className="w-full md:w-auto"
                >
                  {isEditMode
                    ? t("business.offerForm.saveChanges")
                    : t("business.offerForm.saveAsDraft")}
                </Button>

                <Button
                  onClick={handleActivate}
                  loading={
                    setVersionStatusOfferPending || setStatusOfferPending
                  }
                  className="w-full md:w-auto"
                >
                  {t("business.offerForm.saveAndActivate")}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

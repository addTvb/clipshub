"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Button } from "src/components/ui/button/button";
import { Modal } from "src/components/ui/dialog";
import { Divider } from "src/components/ui/divider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "src/components/ui/select";
import { MediaChannelResponseInformation } from "src/types/offers";
import { socialPlatformIcons } from "src/widgets/business/offers/create-offer/form-steps/fifth-step/OfferDetails";
import { useTakeOfferPopup } from "./model/useTakeOfferPopup";
import AddChannelCard from "../../channels/add-channel/AddChannelCard";

interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  mediaChannelResponseInformations?: MediaChannelResponseInformation[];
  offerId: number;
}

export const AttentionPopup = ({
  open,
  setOpen,
  mediaChannelResponseInformations,
  offerId,
}: IProps) => {
  const t = useTranslations();

  const formatBoldText = (key: string) => {
    return t.rich(key, {
      bold: (chunks) => <strong>{chunks}</strong>,
    });
  };

  const {
    mediaChannels,
    channel,
    isPending,
    selectedChannelInfo,
    isNotEligible,
    handleCancel,
    handleChangeSelect,
    handleTakeOffer,
  } = useTakeOfferPopup({
    setOpen,
    mediaChannelResponseInformations,
    offerId,
  });

  return (
    <Modal
      open={open}
      setIsOpen={setOpen}
      withCross
      className="md:max-w-[674px] w-full p-[16px] md:p-[24px] flex flex-col gap-[24px]"
      mobileClassName="flex flex-col gap-[24px] p-0"
      mobileBreakpoint={700}
      title={t("influencer.attention")}
      renderFooter={() => {
        return (
          <div className="w-full flex items-center gap-[12px]">
            <Button
              className="w-full"
              variant="outline"
              onClick={handleCancel}
              disabled={isPending}
            >
              {t("common.cancel")}
            </Button>
            <Button
              className="w-full"
              disabled={isNotEligible() || isPending}
              onClick={handleTakeOffer}
              loading={isPending}
            >
              {t("influencer.takeOffer")}
            </Button>
          </div>
        );
      }}
    >
      <div className="space-y-[10px]">
        <div className="text-sm">
          {formatBoldText("influencer.youWillHave2HoursToPublish")}
        </div>

        <div className="text-sm font-bold">
          {t("influencer.guaranteedBudgetReserve")}
        </div>
        <div className="text-sm">
          {formatBoldText("influencer.youWillReceiveAdContentForDownload")}
        </div>
        <div className="text-sm">
          {formatBoldText("influencer.briefAndTextDesc")}
        </div>
        <div className="text-sm">
          {formatBoldText("influencer.youCanTrackThisOffer")}
        </div>
      </div>

      <Divider color="#E6EBF2" />

      <div className="text-sm">{t("influencer.makeSureYouReady")}</div>

      <Divider color="#E6EBF2" />
      {mediaChannels && mediaChannels.length > 0 ? (
        <div className="space-y-[10px]">
          <div className="text-dark900 font-bold">
            {t("influencer.takeOfferForChannel")}
          </div>
          <Select
            onValueChange={handleChangeSelect}
            value={channel ? String(channel) : String(mediaChannels[0].id)}
            defaultValue={
              channel ? String(channel) : String(mediaChannels[0].id)
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {mediaChannels?.map((option) => (
                <SelectItem key={option.id} value={String(option.id)}>
                  <span className="flex items-center gap-[4px] text-xs font-medium px-[4px] py-0">
                    <Image
                      src={socialPlatformIcons[option.media_channel_type]}
                      alt={option.media_channel_type}
                      width={14}
                      height={14}
                    />
                    <span>{option.title}</span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {selectedChannelInfo &&
            selectedChannelInfo.take_check_errors.length > 0 && (
              <>
                <div className="text-sm font-bold text-gray400">
                  {t("influencer.offerUnavailableMismatchedCriteria")}
                </div>

                <div className="text-sm text-gray400 font-medium space-y-[5px]">
                  {selectedChannelInfo.take_check_errors.map((item) => (
                    <div key={item}>
                      {t(`influencer.takeOfferError.${item}`)}
                    </div>
                  ))}
                </div>
              </>
            )}
        </div>
      ) : (
        <AddChannelCard
          wrapperClassName="shadow-none p-[0px!important] h-auto gap-[12px!important]"
          subtitle={t("influencer.addChannelBeforeTakeOffer")}
        />
      )}
    </Modal>
  );
};

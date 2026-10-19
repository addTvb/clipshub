"use client";

import { Modal } from "src/components/ui/dialog";
import { DialogTitle, DialogDescription } from "@radix-ui/react-dialog";
import { useTranslations } from "next-intl";
import { MediaChannel, MediaChannelDetails } from "src/types/influencers";
import { MobileModal } from "src/components/ui/mobile-modal";
import { useWindowSize } from "usehooks-ts";
import { ChannelSettingsForm } from "./ChannelSettingsForm";
import { useFilterStore } from "src/widgets/influencers/filter-offers/model/useFilterStore";
import { cleanRequestParams, flattenFilters } from "src/queries/useOffersQuery";
import { queryKeys } from "src/config/queryKeys";
import { useQueryClient } from "@tanstack/react-query";

interface IProps {
  isNewChannel?: boolean;
  openModal: boolean;
  setIsOpen: (open: boolean) => void;
  mediaChannel: MediaChannel;
  mediaChannelDetails?: MediaChannelDetails;
}

const ChannelSettingsCard = ({
  isNewChannel,
  openModal,
  setIsOpen,
  mediaChannel,
  mediaChannelDetails,
}: IProps) => {
  const t = useTranslations();
  const { width } = useWindowSize();
  const queryClient = useQueryClient();
  const filters = useFilterStore();
  const queryParams = cleanRequestParams({ ...filters });
  const filtersArray = flattenFilters(queryParams);

  const handleSuccess = () => {
    setIsOpen(false);
    queryClient.invalidateQueries({
      queryKey: queryKeys.offers.getOffers(filtersArray),
    });
  };

  if (width <= 700) {
    return (
      <MobileModal
        title={t("influencer.channelSettings.loggedAs")}
        open={openModal}
        setOpen={setIsOpen}
        className="flex flex-col gap-[24px] max-w-[674px]"
      >
        <ChannelSettingsForm
          isNewChannel={isNewChannel}
          mediaChannel={mediaChannel}
          mediaChannelDetails={mediaChannelDetails}
          onSuccess={handleSuccess}
          showChannelInfo={true}
          showProvideInfo={true}
        />
      </MobileModal>
    );
  }

  return (
    <Modal
      open={openModal}
      setIsOpen={setIsOpen}
      className="max-w-[710px]"
      withCross
    >
      <DialogTitle className="sr-only">
        {t("influencer.channelSettings.title")}
      </DialogTitle>
      <DialogDescription className="sr-only">
        {t("influencer.channelSettings.provideInfo")}
      </DialogDescription>
      <ChannelSettingsForm
        isNewChannel={isNewChannel}
        mediaChannel={mediaChannel}
        mediaChannelDetails={mediaChannelDetails}
        onSuccess={handleSuccess}
        showChannelInfo={true}
        showProvideInfo={true}
        customHeader={
          <div className="text-[20px] font-bold text-center">
            {t("influencer.channelSettings.loggedAs")}
          </div>
        }
      />
    </Modal>
  );
};

export default ChannelSettingsCard;

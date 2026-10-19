"use client";

import { useTranslations } from "next-intl";
import { ConfirmationModal } from "src/components/ui/confirmation-modal";
import { useUpdateChannelSettings } from "src/queries/influencers/useUpdateChannelSettings";
import { ChannelSettingsFormData } from "./ChannelSettingsForm";

interface ChannelUpdateWarningModalProps {
  open: boolean;
  onClose: () => void;
  mediaChannelId: number;
  formData: ChannelSettingsFormData | null;
  onSuccess?: () => void;
}

export const ChannelUpdateWarningModal = ({
  open,
  onClose,
  mediaChannelId,
  formData,
  onSuccess,
}: ChannelUpdateWarningModalProps) => {
  const t = useTranslations();

  const { updateChannelSettings, isPending } = useUpdateChannelSettings({
    mediaChannelId,
    onSuccess: () => {
      onClose();
      if (onSuccess) {
        onSuccess();
      }
    },
  });

  const handleConfirm = () => {
    if (formData) {
      updateChannelSettings(formData);
    }
  };

  return (
    <ConfirmationModal
      open={open}
      onClose={onClose}
      onConfirm={handleConfirm}
      title={t("influencer.channelSettings.updateWarningTitle")}
      confirmText={t("common.confirm")}
      cancelText={t("common.cancel")}
      confirmVariant="danger"
      loading={isPending}
      dontCloseOnConfirm={true}
    >
      <div className="text-dark100 text-[16px] font-[Inter]">
        <p>{t("influencer.channelSettings.updateWarningMessage")}</p>
      </div>
    </ConfirmationModal>
  );
};

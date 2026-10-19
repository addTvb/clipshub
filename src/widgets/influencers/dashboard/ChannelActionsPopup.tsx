import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "src/components/ui/button/button";
import { ConfirmationModal } from "src/components/ui/confirmation-modal";
import ThreeDotsIcon from "@icons/three-dots-black.svg";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "src/components/ui/popover";
import { useArchiveMediaChannel } from "src/queries/influencers/useArchiveMediaChannel";
import TrashIcon from "@icons/trash-red.svg";
import EditIcon from "@icons/edit.svg";
import { useQueryClient } from "@tanstack/react-query";

interface IProps {
  mediaChannelId: number;
  mediaChannelName?: string;
  onOpenChannelSettings?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const ChannelActionsPopup = ({
  mediaChannelId,
  mediaChannelName,
  onOpenChannelSettings,
}: IProps) => {
  const t = useTranslations("influencer");
  const tCommon = useTranslations("common");
  const { push } = useRouter();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const queryClient = useQueryClient();

  const { archiveChannel, isPending } = useArchiveMediaChannel({
    channelName: mediaChannelName,
    onSuccess: () => {
      push("/influencers");
      setShowConfirmModal(false);
      queryClient.invalidateQueries({ type: "active" });
    },
  });

  const handleArchiveChannel = () => archiveChannel(mediaChannelId);

  const handleOpenConfirmModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setShowConfirmModal(true);
  };
  const handleCloseConfirmModal = () => setShowConfirmModal(false);

  const handleWithPrevent = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
  };

  const handleComponentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div onClick={handleComponentClick}>
      <Popover>
        <PopoverTrigger
          onClick={handleWithPrevent}
          className="p-[9px] rounded-[6px] border border-gray300 active:scale-95 transition-[background-color, transform] duration-300"
        >
          <ThreeDotsIcon />
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="flex flex-col gap-[6px] p-[10px] text-gray400 font-medium text-sm w-fit min-w-[140px]"
        >
          <Button
            variant="text"
            className="text-sm font-medium justify-start p-[6px]"
            onClick={onOpenChannelSettings}
          >
            <EditIcon />
            {tCommon("change")}
          </Button>
          <Button
            variant="text"
            className="text-red-500 text-sm font-medium justify-start p-[6px]"
            onClick={handleOpenConfirmModal}
          >
            <TrashIcon />
            {tCommon("delete")}
          </Button>
        </PopoverContent>
      </Popover>

      <ConfirmationModal
        open={showConfirmModal}
        onClose={handleCloseConfirmModal}
        onConfirm={handleArchiveChannel}
        title={t("removeChannel")}
        confirmText={t("removeChannel")}
        confirmVariant="danger"
        loading={isPending}
      >
        <div className="text-dark100 text-[16px] font-[Inter]">
          <p className="mb-[22px]">{t("removeChannelConfirmation")}</p>
          <p>{t("canAddLater")}</p>
        </div>
      </ConfirmationModal>
    </div>
  );
};

import { Modal } from "src/components/ui/dialog";
import { DialogTitle, DialogDescription } from "@radix-ui/react-dialog";
import { Button } from "src/components/ui/button/button";
import { useTranslations } from "next-intl";
import { useWindowSize } from "usehooks-ts";
import { MobileModal } from "src/components/ui/mobile-modal";

interface IProps {
  openModal: boolean;
  setIsOpen: (open: boolean) => void;
  onConfirm?: () => void;
}

const ModerationNoticeCard = ({ openModal, setIsOpen, onConfirm }: IProps) => {
  const t = useTranslations();

  const { width } = useWindowSize();

  if (width <= 700) {
    return (
      <MobileModal
        open={openModal}
        setOpen={setIsOpen}
        title={t("influencer.moderationNoticeCard.title")}
        className="h-auto"
        drawerClassName="h-auto pb-[10px]"
        renderFooter={() => {
          return (
            <Button
              onClick={() => {
                setIsOpen(false);
                if (onConfirm) onConfirm();
              }}
            >
              {t("common.confirm")}
            </Button>
          );
        }}
      >
        <div className="flex flex-col gap-[30px] font-['Inter'] text-[16px]">
          <p>{t("influencer.moderationNoticeCard.message")}</p>
          <p>{t("influencer.moderationNoticeCard.support")}</p>
        </div>
      </MobileModal>
    );
  }

  return (
    <Modal
      open={openModal}
      setIsOpen={setIsOpen}
      className="max-w-[516px]"
      withCross
    >
      <DialogTitle className="sr-only">
        {t("influencer.moderationNoticeCard.title")}
      </DialogTitle>
      <DialogDescription className="sr-only">
        {t("influencer.moderationNoticeCard.description")}
      </DialogDescription>
      <div className="text-[20px] font-bold">
        {t("influencer.moderationNoticeCard.title")}
      </div>
      <div className="flex flex-col gap-[30px] font-['Inter'] text-[16px]">
        <p>{t("influencer.moderationNoticeCard.message")}</p>
        <p>{t("influencer.moderationNoticeCard.support")}</p>
      </div>
      <Button
        onClick={() => {
          setIsOpen(false);
          if (onConfirm) onConfirm();
        }}
      >
        {t("common.confirm")}
      </Button>
    </Modal>
  );
};

export default ModerationNoticeCard;

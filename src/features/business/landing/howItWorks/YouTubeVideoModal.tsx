"use client";

import { Modal } from "src/components/ui/dialog";
import { useTranslations } from "next-intl";

interface IProps {
  open: boolean;
  setIsOpen: (open: boolean) => void;
  videoId: string;
  title?: string;
}

export default function YouTubeVideoModal({
  open,
  setIsOpen,
  videoId,
  title
}: IProps) {
  const t = useTranslations("business.landing.tutorial");

  return (
    <Modal
      open={open}
      setIsOpen={setIsOpen}
      className="max-w-4xl p-0"
      mobileClassName="p-0 h-[90vh]"
      withCross
      title={title || t("modalTitle")}
    >
      <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
        {open && (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&showinfo=0`}
            title={title || t("modalTitle")}
            className="absolute inset-0 w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        )}
      </div>
    </Modal>
  );
}

import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";
import { Button } from "src/components/ui/button/button";
import { useCancelOffer } from "./model/useCancelOffer";

interface IProps {
  postId: number;
  channelId: number;
}

export const CancelOfferButton = ({ postId, channelId }: IProps) => {
  const t = useTranslations("influencer.offers");

  const { cancelOfferMutate, isPending } = useCancelOffer(postId, channelId);

  const handleCancelOffer = () => cancelOfferMutate();

  return (
    <Button
      onClick={handleCancelOffer}
      loading={isPending}
      className="gap-[6px] text-gray400 font-medium text-sm p-[6px]"
      variant="text"
    >
      <Image
        src="/static/icons/cancel-hand.svg"
        alt="cancel"
        width={20}
        height={20}
      />
      <span>{t("cancelOffer")}</span>
    </Button>
  );
};

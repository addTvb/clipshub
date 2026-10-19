"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import {  OfferSetStatusType } from "src/types/offers";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "src/components/ui/popover";
import { Button } from "src/components/ui/button/button";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { queryKeys } from "src/config/queryKeys";
import { useSetVersionStatusOffer } from "src/queries/business/offers";

interface StatusItem {
  id: number;
  name: string;
  mediaChannelType: string;
  status: OfferSetStatusType;
  createdAt: string;
}

interface IProps {
  item: StatusItem;
}

export const OfferStatusActions = ({ item }: IProps) => {
  const t = useTranslations();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { setVersionStatusOfferMutate, setVersionStatusOfferPending } =
    useSetVersionStatusOffer();
console.log(setVersionStatusOfferPending);

  const handleChangeStatus = () => {
    if (!item.id) {
      toast.error(t("business.offer.errorActivatingOffer"));
      return;
    }

    setVersionStatusOfferMutate(
      { offerID: item.id, body: { status: "moderating" } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: queryKeys.business.offers.getOfferByCampaignID(
              Number(id)
            ),
          });
          queryClient.invalidateQueries({
            queryKey: queryKeys.business.stats.getStatsByCampaignID(Number(id)),
          });
          toast.success(
            t("business.offer.offerStatusChangedToModeration", {
              name: item.name,
            })
          );
        },
      }
    );
  };

  // Если статус draft, показываем кнопки Edit и Activate
  if (item.status === "draft") {
    return (
      <div className="flex items-center gap-[12px]">
        <Button
          href={`/business/campaigns/${id}/offer/${item.id}/edit?type=draft`}
          variant="outline"
          className="p-[12px]"
        >
          <Image
            src="/static/icons/pencil-black.svg"
            alt="Edit"
            width={20}
            height={20}
          />
        </Button>

        <Button
          className="min-w-[120px]"
          loading={setVersionStatusOfferPending}
          onClick={handleChangeStatus}
          disabled={setVersionStatusOfferPending}
        >
          {t("business.offerForm.activateOffer")}
        </Button>
      </div>
    );
  }

  // Для других статусов показываем Popover
  return (
    <Popover>
      <PopoverTrigger>
        <Image
          src="/static/icons/three-dots.svg"
          alt="More"
          width={24}
          height={24}
          className="cursor-pointer"
        />
      </PopoverTrigger>
      <PopoverContent className="p-[6px] w-fit">
        <Button
          variant="text"
          className="w-full justify-start p-[6px]"
          href={`/business/campaigns/${id}/offer/${item.id}/edit?type=draft`}
        >
          <Image
            src="/static/icons/pencil-black.svg"
            alt="Edit"
            width={20}
            height={20}
            className="mr-2"
          />
          <span>{t("common.change")}</span>
        </Button>
      </PopoverContent>
    </Popover>
  );
};

"use client";

import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "src/components/ui/popover";
import { Button } from "src/components/ui/button/button";
import { ConfirmationModal } from "src/components/ui/confirmation-modal";
import { useSetStatusOffer } from "src/queries/business/offers/useSetStatusOffer";
import { queryKeys } from "src/config/queryKeys";
import { OfferSetStatusType } from "src/types/offers";

interface IProps {
  offerId: number;
  offerName: string;
  status: Exclude<OfferSetStatusType, "draft">;
}

export const OfferActionsMenu = ({
  offerId,
  offerName,
  status,
}: IProps) => {
  const t = useTranslations();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isClosingPending, setIsClosingPending] = useState(false);
  const [isActionPending, setIsActionPending] = useState(false);

  const { setStatusOfferMutate } = useSetStatusOffer();

  const handleCloseOffer = () => {
    if (!offerId) {
      toast.error(t("business.offer.errorClosingOffer"));
      return;
    }

    setIsClosingPending(true);
    setStatusOfferMutate(
      {
        offerID: offerId,
        body: { status: "closed" },
      },
      {
        onSuccess: () => {
          toast.success(
            t("business.offer.offerStatusChangedToClosed", {
              name: offerName,
            })
          );

          queryClient.invalidateQueries({
            queryKey: queryKeys.business.offers.getOfferByCampaignID(
              Number(id)
            ),
          });
          queryClient.invalidateQueries({
            queryKey: queryKeys.business.stats.getStatsByCampaignID(Number(id)),
          });

          setShowConfirmModal(false);
          setIsClosingPending(false);
        },
        onError: () => {
          setIsClosingPending(false);
        },
      }
    );
  };

  const handleToggleOfferStatus = () => {
    if (!offerId) {
      toast.error(
        status === "moderated"
          ? t("business.offer.errorPausingOffer")
          : t("business.offer.errorActivatingOffer")
      );
      return;
    }

    setIsActionPending(true);
    const newStatus = status === "moderated" ? "paused" : "moderated";
    
    setStatusOfferMutate(
      {
        offerID: offerId,
        body: { status: newStatus },
      },
      {
        onSuccess: () => {
          toast.success(
            newStatus === "paused"
              ? t("business.offer.offerStatusChangedToPaused", {
                  name: offerName,
                })
              : t("business.offer.offerStatusChangedToModerated", {
                  name: offerName,
                })
          );

          queryClient.invalidateQueries({
            queryKey: queryKeys.business.offers.getOfferByCampaignID(
              Number(id)
            ),
          });
          queryClient.invalidateQueries({
            queryKey: queryKeys.business.stats.getStatsByCampaignID(Number(id)),
          });
          setIsActionPending(false);
        },
        onError: () => {
          setIsActionPending(false);
        },
      }
    );
  };

  const handleOpenConfirmModal = () => setShowConfirmModal(true);
  const handleCloseConfirmModal = () => setShowConfirmModal(false);

  const isDisabled = isClosingPending || isActionPending;

  return (
    <>
      <Popover>
        <PopoverTrigger>
          <Image
            src="/static/icons/three-dots.svg"
            alt="More"
            width={24}
            height={24}
          />
        </PopoverTrigger>
        <PopoverContent className="p-[6px] w-fit">
          {(status === "moderated" || status === "paused") && (
            <Button
              variant="text"
              className="w-full justify-start p-[6px]"
              href={`/business/campaigns/${id}/offer/${offerId}/edit?type=active`}
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
          )}
          <Button
            variant="text"
            className="w-full justify-start p-[6px]"
            onClick={handleOpenConfirmModal}
            disabled={isDisabled}
            loading={isClosingPending}
          >
            <Image
              src="/static/icons/trash.svg"
              alt="Close"
              width={20}
              height={20}
              className="mr-2"
            />
            <span>{t("business.offer.closeOffer")}</span>
          </Button>
          <Button
            variant="text"
            className="w-full justify-start p-[6px]"
            onClick={handleToggleOfferStatus}
            disabled={isDisabled}
            loading={isActionPending}
          >
            <Image
              src={
                status === "moderated"
                  ? "/static/icons/pause-icon.svg"
                  : "/static/icons/play-icon.svg"
              }
              alt={status === "moderated" ? "Pause" : "Activate"}
              width={20}
              height={20}
              className="mr-2"
            />
            <span>
              {status === "moderated"
                ? t("business.offer.pauseOffer")
                : t("business.offer.activateOffer")}
            </span>
          </Button>
        </PopoverContent>
      </Popover>

      <ConfirmationModal
        open={showConfirmModal}
        onClose={handleCloseConfirmModal}
        onConfirm={handleCloseOffer}
        title={t("business.offer.closeOffer")}
        confirmText={t("business.offer.closeOffer")}
        confirmVariant="danger"
        loading={isClosingPending}
      >
        <div className="text-dark100 text-[16px] font-[Inter]">
          <p className="mb-[22px]">
            {t("business.offer.closeOfferConfirmation", {
              name: offerName,
            })}
          </p>
          <p>{t("business.offer.closeOfferWarning")}</p>
        </div>
      </ConfirmationModal>
    </>
  );
};


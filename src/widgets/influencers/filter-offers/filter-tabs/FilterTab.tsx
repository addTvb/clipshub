import Image from "next/image";
import React from "react";
import { OfferLevelBadge } from "./OfferLevelBadge";
import { useTranslations } from "next-intl";
import { useFilterStore } from "../model/useFilterStore";
import { useMediaQuery } from "usehooks-ts";
import { useState } from "react";
import clsx from "clsx";
import { AdOfferType } from "src/types/offers";
import { AD_TYPES_OBJ } from "src/features/business/offers/model/adTypes";
import { OfferLevel } from "src/types/base";
import { Divider } from "src/components/ui/divider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "src/components/ui/popover";
import { Modal } from "src/components/ui/dialog";
import HowItWorksIcon from "@public/static/icons/how-it-works-icon.svg";
import { AdTypeTooltip } from "src/features/ad-types";
import { formatCurrency } from "src/lib/numbers/formatCurrency";

interface IProps {
  tab: AdOfferType;
}

export const FilterTab = ({ tab }: IProps) => {
  const t = useTranslations();
  const { integration_types, setFilters } = useFilterStore();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isActive = integration_types?.includes(tab.type) || false;

  const currentTypes = integration_types || [];
  const isLastType =
    currentTypes.length === 1 && currentTypes.includes(tab.type);

  const handleClick = () => {
    if (currentTypes.includes(tab.type)) {
      if (isLastType) {
        return;
      }
      const newTypes = currentTypes.filter((type) => type !== tab.type);
      setFilters({ integration_types: newTypes });
    } else {
      setFilters({ integration_types: [tab.type] });
    }
  };

  return (
    <button
      onClick={handleClick}
      className={clsx(
        "flex flex-col gap-[6px]  min-w-max rounded-[8px] text-xs font-semibold border border-transparent transition-all",
        isLastType && isActive
          ? "cursor-default bg-[#010D22] text-white"
          : isActive
          ? "cursor-pointer bg-[#010D22] text-white hover:border-blue100 hover:shadow-inputShadow"
          : "cursor-pointer bg-white text-textColor hover:border-blue100 hover:shadow-inputShadow"
      )}
    >
      <div className="flex items-center justify-between gap-[4px] px-[6px] pt-[6px] w-full">
        <span className="flex items-center gap-[4px]">
          {"icon" in
            (AD_TYPES_OBJ[tab.type as keyof typeof AD_TYPES_OBJ] || {}) &&
            (
              AD_TYPES_OBJ[tab.type as keyof typeof AD_TYPES_OBJ] as {
                icon: string;
              }
            ).icon && (
              <Image
                src={
                  (
                    AD_TYPES_OBJ[tab.type as keyof typeof AD_TYPES_OBJ] as {
                      icon: string;
                    }
                  ).icon
                }
                alt={tab.type}
                width={20}
                height={20}
              />
            )}
          <span className="min-w-max">
            {AD_TYPES_OBJ[tab.type as keyof typeof AD_TYPES_OBJ]?.title
              ? t(AD_TYPES_OBJ[tab.type as keyof typeof AD_TYPES_OBJ]?.title)
              : tab.type}
          </span>

          <span
            className={clsx(
              "text-xs text-center font-bold rounded-[8px] px-[4px] transition-colors",
              isActive ? "bg-black400 text-white" : "bg-gray300 text-black400"
            )}
          >
            {tab.active_offers_count || 0}
          </span>
        </span>

        {isMobile ? (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsModalOpen(true);
              }}
            >
              <HowItWorksIcon
                className={clsx(
                  isActive
                    ? "text-white hover:text-white400"
                    : "text-white400 hover:text-black400",
                  "w-4 h-4 hover:text-white400 transition-colors duration-300"
                )}
              />
            </button>
            <Modal
              open={isModalOpen}
              setIsOpen={setIsModalOpen}
              withCross={true}
              className="h-auto pb-[20px]"
            >
              <AdTypeTooltip adType={tab.type} showLink={true} />
            </Modal>
          </>
        ) : (
          <Popover>
            <PopoverTrigger asChild>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <HowItWorksIcon
                  className={clsx(
                    isActive
                      ? "text-white hover:text-white400"
                      : "text-white400 hover:text-black400",
                    "w-4 h-4 hover:text-white400 transition-colors duration-300"
                  )}
                />
              </button>
            </PopoverTrigger>
            <PopoverContent
              sideOffset={6}
              className="w-min p-3 bg-white border border-[#DFE3EA] rounded-lg shadow-[0px_-6px_22px_0px_rgba(13,41,74,0.1)] font-[Inter]"
            >
              <AdTypeTooltip adType={tab.type} showLink={true} />
            </PopoverContent>
          </Popover>
        )}
      </div>

      <Divider
        className={clsx(
          "transition-colors",
          isActive ? "border-black400" : "border-[#E6EBF2]"
        )}
      />

      <span className="flex items-center justify-between gap-[10px] pb-[6px] px-[6px]">
        {tab.total_max_profit && (
          <span className="flex items-center gap-[2px]">
            <span
              className={clsx(
                "text-gray350 text-xs font-semibold",
                isActive ? "text-gray550" : "text-gray350"
              )}
            >
              {t("common.maxPayout")}
            </span>
            <span
              className={clsx(
                "text-gray400 text-xs font-bold transition-colors",
                isActive ? "text-white" : "text-gray400"
              )}
            >
              ${formatCurrency(tab.total_max_profit)}
            </span>
          </span>
        )}

        <OfferLevelBadge
          level={
            AD_TYPES_OBJ[tab.type as keyof typeof AD_TYPES_OBJ]
              ?.level as OfferLevel
          }
        />
      </span>
    </button>
  );
};

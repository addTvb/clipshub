"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useMediaQuery } from "usehooks-ts";
import clsx from "clsx";
import { Modal } from "./dialog";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import InfoIcon from "@public/static/images/business/landing/info.svg";

export interface TabItem {
  id: string;
  icon: React.ComponentType;
  label: string;
  tooltipConfig?: {
    titleKey: string;
    descriptionKey: string;
    exampleKey: string;
    mockupComponent: React.ComponentType;
    translationNamespace?: string;
  };
  tooltipComponent?: React.ComponentType; 
}

interface TabsWithProgressItemProps {
  item: TabItem;
  isActive: boolean;
  progress?: number;
  onClick: () => void;
  className?: string;
  showProgress?: boolean;
}

function TabsWithProgressItem({
  item,
  isActive,
  progress = 0,
  onClick,
  className,
  showProgress = true,
}: TabsWithProgressItemProps) {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const Icon = item.icon;

  return (
    <div
      className={clsx(
        "min-w-[160px] flex items-center justify-between gap-2 px-3 py-2 relative overflow-hidden cursor-pointer transition-all duration-300",
        // Боковые границы только на десктопе
        "max-sm:[&:not(:last-child)]:border-b max-sm:[&:not(:last-child)]:border-b-gray550",
        "sm:[&:not(:last-child)]:border-r sm:[&:not(:last-child)]:border-r-gray550",
        isActive && "bg-black400",
        className
      )}
      onClick={onClick}
    >
      {/* Прогресс-бар фон */}
      {isActive && showProgress && progress > 0 && (
        <div
          className="absolute inset-0 bg-[#222936] transition-all duration-75 ease-linear"
          style={{
            width: `${Math.max(0, Math.min(100, progress))}%`,
          }}
        />
      )}

      {/* Контент поверх фона */}
      <div
        className={clsx(
          "flex items-center gap-1 text-gray400 font-bold text-[16px] relative z-10",
          isActive && "text-white"
        )}
      >
        <Icon />
        {item.label}
      </div>

      {/* Тултип - либо компонент, либо конфигурация */}
      {item.tooltipComponent ? (
        <>
          {isMobile ? (
            <>
              <button
                className="relative z-10 transition-colors duration-300 hover:text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsModalOpen(true);
                }}
              >
                <InfoIcon />
              </button>
              <Modal
                open={isModalOpen}
                setIsOpen={setIsModalOpen}
                withCross={true}
                className="h-auto pb-[20px]"
              >
                <item.tooltipComponent />
              </Modal>
            </>
          ) : (
            <Popover>
              <PopoverTrigger className="relative z-10 transition-colors duration-300 hover:text-white">
                <InfoIcon />
              </PopoverTrigger>
              <PopoverContent
                sideOffset={6}
                className="w-[259px] p-3 bg-white border border-[#DFE3EA] rounded-lg shadow-[0px_-6px_22px_0px_rgba(13,41,74,0.1)] font-[Inter]"
              >
                <item.tooltipComponent />
              </PopoverContent>
            </Popover>
          )}
        </>
      ) : null}
    </div>
  );
}

export interface TabsWithProgressProps {
  items: TabItem[];
  currentTab: number;
  progress?: number;
  onTabSelect: (index: number) => void;
  title?: string;
  titleKey?: string;
  className?: string;
  translationNamespace?: string;
  showProgress?: boolean;
  rowClassName?: string;
}

export default function TabsWithProgress({
  items,
  currentTab,
  progress = 0,
  onTabSelect,
  title,
  titleKey,
  className,
  translationNamespace = "business",
  showProgress = true,
  rowClassName,
}: TabsWithProgressProps) {
  const t = useTranslations(translationNamespace);

  const displayTitle = title || (titleKey ? t(titleKey) : undefined);

  return (
    <div className={className}>
      {displayTitle && (
        <h3 className="text-gray550 text-[12px] font-[600] font-[Inter] tracking-[0.96px] uppercase mb-[12px]">
          {displayTitle}
        </h3>
      )}
      <div
        className={clsx(
          "flex gap-0 border border-1 border-gray550 border-solid rounded-[12px] w-fit overflow-hidden",
          rowClassName
        )}
      >
        {items.map((item, index) => (
          <TabsWithProgressItem
            key={item.id}
            item={item}
            isActive={currentTab === index}
            progress={currentTab === index ? progress : 0}
            onClick={() => onTabSelect(index)}
            showProgress={showProgress}
          />
        ))}
      </div>
    </div>
  );
}

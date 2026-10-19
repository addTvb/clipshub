"use client";

import { Checkbox } from "@radix-ui/react-checkbox";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { StyledInput } from "src/components/ui/form/uncontrolled/styled-input";
import { FilterItem } from "../model/types";
import CheckIcon from "@icons/check-icon.svg";

interface IProps {
  title: string;
  iconPath: string;
  allItems: FilterItem[];
  selected: FilterItem[];
  placeholder: string;
  defaultOpen?: boolean;
  setSelected: (selectedItem: FilterItem) => void;
}

export const CheckboxFilter = ({
  title,
  iconPath,
  allItems,
  selected,
  placeholder,
  defaultOpen = false,
  setSelected,
}: IProps) => {
  const t = useTranslations();
  const [open, setOpen] = useState(() => defaultOpen);
  const [inputValue, setInputValue] = useState("");
  const [showingItems, setShowingItems] = useState<FilterItem[]>(allItems);

  const toggleOpen = () => setOpen((prev) => !prev);

  useEffect(() => {
    if (allItems && allItems.length !== 0 && showingItems.length === 0)
      setShowingItems(allItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allItems]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);

    if (event.target.value === "") {
      setShowingItems(allItems);
    } else {
      const filtered = allItems.filter((item: FilterItem) => {
        if (item.title)
          return item.title.toLocaleLowerCase().includes(event.target.value);
      });
      setShowingItems(filtered);
    }
  };

  const selectedItemsName = useMemo(() => {
    if (selected) {
      const titleArr = selected?.map((item: FilterItem) => item?.title);
      return titleArr.join(", ");
    }
  }, [selected]);

  const handleCheckboxChange = (item: FilterItem) => {
    setSelected(item);
    setInputValue("");
    setShowingItems(allItems);
  };

  const isSelected = (selectedArr: FilterItem[], item: FilterItem) => {
    return selectedArr.some((arrItem) => arrItem.value === item.value);
  };

  return (
    <div
      className={clsx(
        "space-y-[14px] pt-[14px] lg:pt-0",
        open ? "space-y-[14px]" : "lg:space-y-0"
      )}
    >
      <button
        onClick={toggleOpen}
        className="flex items-center justify-between w-full gap-[12px] p-[6px] pr-[8px] text-left"
      >
        <span className="flex items-start gap-[14px]">
          <Image src={iconPath} alt="" width={20} height={20} />

          <span className="flex flex-col gap-[2px]">
            <span className="text-black400 font-bold text-sm">{t(title)}</span>
            <span className="text-gray350 text-xs font-medium truncate max-w-[200px] capitalize font-[Inter]">
              {selectedItemsName}
            </span>
          </span>
        </span>

        <Image
          src="/static/icons/arrow-down-black.svg"
          alt=""
          width={14}
          height={14}
          className={clsx("transition-transform", open && "rotate-180")}
        />
      </button>

      <div
        className={clsx(
          "grid transition-all duration-300 ease-in-out",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
        aria-hidden={!open}
      >
        <div className="min-h-0 overflow-hidden flex flex-col gap-[6px] font-[Inter]">
          {allItems.length >= 10 && (
            <StyledInput
              icon="/static/icons/search-black.svg"
              value={inputValue}
              onChange={handleInputChange}
              placeholder={t(placeholder)}
            />
          )}
          {showingItems.map((item) => (
            <label
              className="flex items-center gap-[12px] text-black400 font-medium text-xs p-[6px]"
              key={`${item.value}-${title}-${iconPath}`}
            >
              <Checkbox
                onClick={() => handleCheckboxChange(item)}
                checked={isSelected(selected, item)}
                className="flex items-center justify-center peer h-[16px] w-[16px] shrink-0 rounded-md border-2 text-transparent border-gray500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary data-[state=checked]:border-[#a8cad7] data-[state=checked]:text-white"
              >
                <CheckIcon className="text-[16px] text-inherit" />
              </Checkbox>
              <span className="capitalize font-[Inter]">{item.title}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

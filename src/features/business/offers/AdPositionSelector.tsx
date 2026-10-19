"use client";

import { useTranslations } from "next-intl";
import { useAdPositionSelectorState } from "./model/useAdPositionSelectorState";
import { useState, useEffect, useCallback } from "react";
import clsx from "clsx";
import { Controller, useFormContext } from "react-hook-form";
import { InfoPopover } from "src/components/ui/info-popover";

const getPostfix = (position: string) => position.split("-")[1];

interface IProps {
  name: string;
}

export const AdPositionSelector = ({ name }: IProps) => {
  const t = useTranslations();
  const { changePosition, position } = useAdPositionSelectorState();
  const { control, setValue } = useFormContext();

  const [adPositions, setAdPositions] = useState(() => {
    return [
      {
        position: "left-top",
        isSelected: position === "left-top" || position === "top",
      },
      {
        position: "right-top",
        isSelected: position === "right-top" || position === "top",
      },
      {
        position: "left-center",
        isSelected: position === "left-center" || position === "center",
      },
      {
        position: "right-center",
        isSelected: position === "right-center" || position === "center",
      },
      {
        position: "left-bottom",
        isSelected: position === "left-bottom" || position === "bottom",
      },
      {
        position: "right-bottom",
        isSelected: position === "right-bottom" || position === "bottom",
      },
    ];
  });

  const [internalUpdate, setInternalUpdate] = useState(false);

  useEffect(() => {
    if (internalUpdate) {
      setInternalUpdate(false);
      return;
    }

    const selected = adPositions.filter((pos) => pos.isSelected);

    if (selected.length === 2) {
      const firstPostfix = getPostfix(selected[0].position);
      const secondPostfix = getPostfix(selected[1].position);

      if (firstPostfix === secondPostfix) {
        changePosition(firstPostfix as Parameters<typeof changePosition>[0]);
        setValue(name, firstPostfix as Parameters<typeof changePosition>[0]);
      }
    } else if (selected.length === 1) {
      changePosition(
        selected[0].position as Parameters<typeof changePosition>[0]
      );
      setValue(
        name,
        selected[0].position as Parameters<typeof changePosition>[0]
      );
    } else if (selected.length === 0) {
      changePosition("left-top");
      setValue(name, "left-top");
    }
  }, [adPositions, changePosition, internalUpdate, name, setValue]);

  useEffect(() => {
    if (!position) return;

    setInternalUpdate(true);

    setAdPositions((prevPositions) => {
      const isGeneralPosition = ["top", "center", "bottom"].includes(position);

      return prevPositions.map((pos) => {
        if (isGeneralPosition) {
          return { ...pos, isSelected: getPostfix(pos.position) === position };
        } else {
          return { ...pos, isSelected: pos.position === position };
        }
      });
    });
  }, [position]);

  const handleChangePos = useCallback((clickedPos: { position: string }) => {
    setAdPositions((prev) => {
      const newState = prev.map((pos) => ({ ...pos }));
      const clickedIndex = newState.findIndex(
        (p) => p.position === clickedPos.position
      );
      const clickedItem = newState[clickedIndex];
      const currentPostfix = getPostfix(clickedItem.position);

      if (clickedItem.isSelected) {
        clickedItem.isSelected = false;
      } else {
        const selected = newState.filter((p) => p.isSelected);

        if (selected.length === 0) {
          clickedItem.isSelected = true;
        } else if (selected.length === 1) {
          const selectedPostfix = getPostfix(selected[0].position);

          if (selectedPostfix === currentPostfix) {
            clickedItem.isSelected = true;
          } else {
            newState.forEach((p) => (p.isSelected = false));
            clickedItem.isSelected = true;
          }
        } else if (selected.length >= 2) {
          newState.forEach((p) => (p.isSelected = false));
          clickedItem.isSelected = true;
        }
      }

      return newState;
    });
  }, []);

  return (
    <div className="space-y-[16px]">
      <div className="flex gap-[6px] items-center">
        <span className="text-textColor text-base font-bold">
          {t("business.offerForm.choosePositionAd")}
        </span>
        <InfoPopover>{t("business.offerForm.adPositionPopover")}</InfoPopover>
      </div>
      <div className="flex items-center flex-col gap-[12px] sm:gap-[32px] sm:flex-row">
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <>
              <input
                type="hidden"
                id={field.name}
                {...field}
                value={position}
              />
              <div
                className={clsx(
                  "relative grid grid-cols-2 grid-rows-3 w-fit gap-[6px] border border-[#DFE3EA] bg-white50 rounded-[8px] py-[12px] px-[6px]"
                  // formState.errors?.adPosition?.message && "border-red-500"
                )}
              >
                <div className="absolute bg-gray300 w-[14px] h-[4px] top-[3px] left-[50%] -translate-x-[50%] rounded-full" />
                {adPositions.map((buttonState) => (
                  <button
                    className={clsx(
                      "h-[30px] w-[30px] rounded-[8px] lg:h-[20px] lg:w-[20px] lg:rounded-[6px] transition-shadow hover:shadow-borderShadow",
                      buttonState.isSelected ? "bg-[#3188AA]" : "bg-[#DFE3EA]"
                    )}
                    key={`ad-position-${buttonState.position}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleChangePos(buttonState);
                    }}
                  />
                ))}
                <div className="absolute bg-gray300 w-[22px] h-[2px] bottom-[3px] left-[50%] -translate-x-[50%] rounded-full" />
              </div>
            </>
          )}
        />

        <div className="capitalize text-base text-gray400 font-bold">
          {position?.split("-").join(" ")}
        </div>
      </div>
      {/* {formState.errors?.adPosition?.message && (
        <p className="text-red-500 text-sm mt-1 pl-1">
          {t(formState.errors?.adPosition?.message) as string}
        </p>
      )} */}
    </div>
  );
};

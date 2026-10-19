"use client";

import clsx from "clsx";
import Image from "next/image";
import { Controller, useFormContext } from "react-hook-form";

interface IProps {
  name: string;
  iconPath?: string;
  title: string;
  id: number | string;
  selectionType?: "checkbox" | "multiple" | "radio";
  onHover?: () => void;
  onHoverLeave?: () => void;
  className?: string;
  onChange?: (
    values: (number | string)[],
    selectedId?: number | string
  ) => void;
}

export const IconCheckbox = ({
  name,
  iconPath,
  title,
  id,
  className,
  selectionType = "checkbox",
  onHover,
  onHoverLeave,
  onChange,
}: IProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const isSelected =
          selectionType === "multiple"
            ? Array.isArray(field.value) && field.value.includes(id)
            : field.value === id;

        const handleClick = () => {
          if (selectionType === "multiple") {
            const currentValues = Array.isArray(field.value)
              ? [...field.value]
              : [];

            let newValues;
            if (isSelected) {
              newValues = currentValues.filter((item) => item !== id);
            } else {
              newValues = [...currentValues, id];
            }

            field.onChange(newValues);

            // Call the onChange callback if provided
            if (onChange) {
              onChange(newValues, id);
            }
          } else {
            const newValue =
              isSelected && selectionType === "checkbox" ? null : id;
            field.onChange(newValue);

            // Call the onChange callback if provided
            if (onChange && Array.isArray(newValue)) {
              onChange(newValue, id);
            }
          }
        };

        return (
          <button
            type="button"
            className={clsx(
              "rounded-[6px] bg-[#F3F6FA] w-fit px-[10px] py-[8px] flex gap-[8px] transition-all items-center text-xs sm:text-sm font-semibold hover:shadow-inputShadow",
              className,
              isSelected && "bg-black text-white"
            )}
            onClick={handleClick}
            onMouseEnter={onHover}
            onMouseLeave={onHoverLeave}
          >
            {iconPath && <Image src={iconPath} alt="" width={20} height={20} />}
            <span className="capitalize">{title}</span>
          </button>
        );
      }}
    />
  );
};

"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import * as React from "react";
import { useController, useFormContext } from "react-hook-form";
import { cn } from "src/lib/utils";

interface Props {
  icon?: string;
  name: string;
  inputClassName?: string;
}

const CommissionInput = React.forwardRef<
  HTMLInputElement,
  Props & React.ComponentProps<"input">
>(({ className, type, name, icon, inputClassName, ...props }, ref) => {
  const t = useTranslations("business.offerForm");
  const { control } = useFormContext();
  const {
    field: { value, onChange },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });

  const [displayValue, setDisplayValue] = React.useState("0");
  const [textWidth, setTextWidth] = React.useState(0);
  const measureRef = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    const num = Number(value);
    setDisplayValue(`~ ${Number((num * 1.1).toFixed(2))}`);
  }, [value]);

  React.useEffect(() => {
    if (measureRef.current) setTextWidth(measureRef.current.offsetWidth);
  }, [displayValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = e.target.value.replace(/[^0-9]/g, "");
    if (numericValue) {
      const num = Number(numericValue);
      onChange(num);
    } else {
      onChange("");
    }
  };

  return (
    <div className={cn("relative", className)}>
      {icon && (
        <Image
          src={icon}
          alt=""
          width={24}
          height={24}
          className="absolute top-[8px] left-[10px]"
        />
      )}
      <input
        value={displayValue.toString()}
        onChange={handleChange}
        type={type}
        className={cn(
          "flex w-full rounded-md border border-input bg-transparent p-[10px] text-textColor text-sm font-medium leading-tight placeholder:text-[#838d9b] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:outline-none focus-visible:shadow-inputShadowActive focus-visible:border-blue100 hover:shadow-inputShadow",
          "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
          invalid && error && "border-red-500",
          icon && "pl-[42px]",
          inputClassName
        )}
        ref={ref}
        disabled
        inputMode="numeric"
        {...props}
      />
      <div
        style={{ left: `${textWidth + 4}px` }}
        className="absolute top-[9px] text-sm text-gray400 font-bold px-[6px] py-[2px] rounded-[8px] bg-white200"
      >
        {t("youWillPay")}
      </div>
      <span
        ref={measureRef}
        className={cn(
          "absolute top-0 left-0 text-sm font-medium whitespace-nowrap invisible",
          icon ? "pl-[42px]" : "pl-[10px]",
          "pr-[10px]"
        )}
      >
        {displayValue || ""}
      </span>
    </div>
  );
});
CommissionInput.displayName = "CommissionInput";

export { CommissionInput };

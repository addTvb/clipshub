"use client";

import Image from "next/image";
import * as React from "react";

import { cn } from "src/lib/utils";

interface Props {
  icon?: string;
  inputClassName?: string;
}

const StyledInput = React.forwardRef<
  HTMLInputElement,
  Props & React.ComponentProps<"input">
>(({ className, type, icon, inputClassName, ...props }, ref) => {
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
        // value={value}
        // onChange={onChange}
        type={type}
        className={cn(
          "flex w-full rounded-md border border-input bg-transparent p-[10px] pl-[42px] text-textColor text-sm font-medium leading-tight placeholder:text-[#838d9b] focus-visible:outline-none focus-visible:shadow-inputShadow focus-visible:border-[#a8cad7] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          inputClassName
        )}
        ref={ref}
        {...props}
      />
    </div>
  );
});
StyledInput.displayName = "StyledInput";

export { StyledInput };

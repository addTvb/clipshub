"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import CheckIcon from '@icons/check-icon.svg'
import { cn } from "src/lib/utils";
import { Controller, useFormContext } from "react-hook-form";

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & {
    name: string;
  }
>(({ className, name, ...props }, ref) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <CheckboxPrimitive.Root
          ref={ref}
          className={cn(
            "flex items-center justify-center peer h-[20px] w-[20px] shrink-0 rounded-md border-2 transition-colors text-transparent hover:text-gray500 border-gray500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-blue300 data-[state=checked]:text-primary data-[state=checked]:border-blue300 data-[state=checked]:text-white",
            className
          )}
          checked={field.value}
          onCheckedChange={field.onChange}
          {...props}
        >
          <CheckIcon className="mt-[1px] text-[16px] text-inherit" />
        </CheckboxPrimitive.Root>
      )}
    />
  );
});
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };

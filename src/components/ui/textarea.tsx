"use client";

import { useTranslations } from "next-intl";
import * as React from "react";
import { useController, useFormContext } from "react-hook-form";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "src/lib/utils";

const textareaVariants = cva(
  "flex min-h-[60px] w-full rounded-md bg-transparent px-3 py-2 font-medium leading-tight transition-all focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
  {
    variants: {
      variant: {
        default: "border border-input text-base shadow-sm placeholder:text-muted-foreground placeholder:text-sm sm:placeholder:text-sm hover:shadow-inputShadow focus-visible:shadow-inputShadowActive focus-visible:border-blue100",
        dark: "border border-[#222936] text-white text-[14px] placeholder:text-[#586781] focus:text-white outline-none focus:outline-none disabled:bg-[rgba(42,45,50,0.5)] hover:border-[#586781] hover:shadow-[0_0_0_3px_rgba(88,103,129,0.10)] focus:border-[#7083A6] focus:shadow-[0_0_0_3px_rgba(88,103,129,0.10)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface TextareaProps extends React.ComponentProps<"textarea">, VariantProps<typeof textareaVariants> {
  name: string;
  textareaClassName?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, name, textareaClassName, variant, ...props }, ref) => {
    const t = useTranslations();
    const { control } = useFormContext();
    const {
      field: { value, onChange },
      fieldState: { invalid, error },
    } = useController({
      name,
      control,
    });

    return (
      <div className={cn("", className)} data-field-name={name}>
        <div className="relative">
          <textarea
            value={value}
            onChange={onChange}
            className={cn(
              textareaVariants({ variant }),
              invalid && error && (variant === "dark" ? "!border-[#F07676]" : "border-red-500"),
              textareaClassName
            )}
            ref={ref}
            {...props}
          />
        </div>
        {invalid && error && (
          <p className="text-red-500 text-sm mt-1 font-[Inter]">{t(error.message)}</p>
        )}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };

"use client";

import Image from "next/image";
import * as React from "react";
import { useController, useFormContext } from "react-hook-form";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "src/lib/utils";
import { FormFieldError } from "./form-field-error";

const inputVariants = cva(
  "flex w-full rounded-md bg-transparent p-[10px] font-medium leading-tight transition-all focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
  {
    variants: {
      variant: {
        default: "border border-input text-textColor text-[16px] placeholder:text-[#838d9b] hover:shadow-inputShadow focus-visible:shadow-inputShadowActive focus-visible:border-[#A8CAD8]",
        dark: "border border-[#222936] text-white text-[14px] placeholder:text-[#586781] focus:text-white outline-none focus:outline-none disabled:bg-[rgba(42,45,50,0.5)] hover:border-[#586781] hover:shadow-[0_0_0_3px_rgba(88,103,129,0.10)] focus:border-[#7083A6] focus:shadow-[0_0_0_3px_rgba(88,103,129,0.10)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface Props extends VariantProps<typeof inputVariants> {
  icon?: string;
  name: string;
  inputClassName?: string;
  fieldMode?: "float" | "integer";
}

const Input = React.memo(
  React.forwardRef<HTMLInputElement, Props & React.ComponentProps<"input">>(
    (
      {
        className,
        type,
        name,
        icon,
        inputClassName,
        fieldMode,
        variant,
        inputMode = "text",
        ...props
      },
      ref
    ) => {
      const { control } = useFormContext();
      const [showPassword, setShowPassword] = React.useState(false);
      const {
        field: { value, onChange },
        fieldState: { invalid, error },
      } = useController({
        name,
        control,
      });

      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (fieldMode === "float" || fieldMode === "integer") {
          const value = e.target.value;
          const pattern =
            fieldMode === "float"
              ? /^-?\d*[\.,]?\d*$/ // Allow decimal point (dot or comma) for float
              : /^-?\d*$/; // Only integers for integer mode

          if (value === "" || pattern.test(value)) {
            if (fieldMode === "float") {
              if (value.endsWith(".") || value.endsWith(",")) {
                onChange(value);
              } else if (
                value.endsWith(".0") ||
                value.endsWith(",0") ||
                value.endsWith(".00")
              ) {
                onChange(value);
              } else {
                const normalized = value.replace(",", ".");
                onChange(value === "" ? "" : Number(normalized));
              }
            } else {
              onChange(value === "" ? "" : Number(value));
            }
          }
        } else {
          onChange(e.target.value);
        }
      };

      const togglePasswordVisibility = () => setShowPassword(!showPassword);

      const keyboardMode =
        fieldMode === "float"
          ? "decimal"
          : fieldMode === "integer"
          ? "numeric"
          : inputMode;

      return (
        <div className={cn("", className)} data-field-name={name}>
          <div className="relative">
            {icon && (
              <Image
                src={icon}
                alt=""
                width={24}
                height={24}
                className="absolute top-1/2 left-[10px] -translate-y-1/2 z-10"
              />
            )}
            <input
              value={value}
              onChange={handleChange}
              type={
                type === "password" ? (showPassword ? "text" : "password") : type
              }
              className={cn(
                inputVariants({ variant }),
                invalid && error && (variant === "dark" ? "!border-[#F07676]" : "border-red-500"),
                fieldMode === "float" &&
                  "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
                fieldMode === "integer" &&
                  "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
                icon && "pl-[42px]",
                type === "password" && "pr-[42px]",
                inputClassName,
                "ch-input"
              )}
              ref={ref}
              {...props}
              inputMode={keyboardMode}
            />
            {type === "password" && (
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute top-[5px] right-[10px] p-1 hover:bg-gray50 rounded-md transition-colors z-10"
              >
                <Image
                  src={
                    showPassword
                      ? "/static/icons/eye-close.svg"
                      : "/static/icons/eye-open.svg"
                  }
                  alt={showPassword ? "Hide password" : "Show password"}
                  width={24}
                  height={24}
                />
              </button>
            )}
          </div>
          <FormFieldError
            visible={Boolean(invalid && error)}
            messageKey={error?.message}
          />
        </div>
      );
    }
  )
);
Input.displayName = "Input";

export { Input };

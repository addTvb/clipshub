"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Control, ControllerProps, FieldValues, Path } from "react-hook-form";
import { cn } from "src/lib/utils";
import { Controller } from "react-hook-form";
import { FormFieldError } from "./form-field-error";

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-2", className)}
      {...props}
      ref={ref}
    />
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "h-[16px] w-[16px] rounded-full border-2 border-gray500 focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-[#3188AA]",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <div className="h-[8px] w-[8px] bg-blue300 rounded-full" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

type FormRadioGroupProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  rules?: ControllerProps<T>["rules"];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultValue?: any;
  children: React.ReactNode;
} & Omit<
  React.ComponentPropsWithoutRef<typeof RadioGroup>,
  "defaultValue" | "onValueChange" | "value"
>;

const FormRadioGroup = <T extends FieldValues>({
  control,
  name,
  rules,
  defaultValue,
  children,
  ...rest
}: FormRadioGroupProps<T>) => {
  return (
    <Controller<T>
      control={control}
      name={name}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field, fieldState }) => (
        <RadioGroup
          onValueChange={field.onChange}
          defaultValue={field.value}
          value={field.value}
          data-field-name={name}
          {...rest}
        >
          {children}

          <FormFieldError
            visible={Boolean(fieldState.error && fieldState.invalid)}
            messageKey={fieldState.error?.message}
          />
        </RadioGroup>
      )}
    />
  );
};
export { RadioGroup, RadioGroupItem, FormRadioGroup };

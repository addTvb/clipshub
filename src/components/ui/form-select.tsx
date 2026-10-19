"use client";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "src/components/ui/select";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import Image from "next/image";
import { type ReactNode, useEffect, useState } from "react";
import clsx from "clsx";
import { FormFieldError } from "./form-field-error";

export interface SelectOption {
  description?: string;
  id?: number;
  value?: string | number;
  slug?: string;
  name: string | ReactNode;
  icon?: string;
}

interface FormSelectProps<T = string | number> {
  name: string;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
  icon?: string;
  optionIcon?: boolean;
  defaultValue?: T;
  valueType?: "string" | "number";
}

export const FormSelect = <T extends string | number>({
  name,
  options,
  placeholder,
  className,
  icon,
  optionIcon,
  defaultValue,
  valueType = "string",
}: FormSelectProps<T>) => {
  const { control, getValues } = useFormContext();
  const initialValue = getValues(name) ?? defaultValue ?? "";
  const [localValue, setLocalValue] = useState(initialValue);
  const fieldValue = useWatch({
    control,
    name,
    defaultValue: initialValue,
  });
  useEffect(() => {
    if (fieldValue !== undefined) {
      setLocalValue(fieldValue);
    }
  }, [fieldValue]);

  const convertValue = (value: string | number | undefined): T => {
    if (value === undefined) return "" as T;
    if (valueType === "number") {
      return (typeof value === "string" ? Number(value) : value) as T;
    }
    return String(value) as T;
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={initialValue}
      render={({ field, fieldState }) => {
        // При изменении значения обновляем локальное состояние
        const handleValueChange = (newValue: string) => {
          const convertedValue = convertValue(newValue);
          setLocalValue(convertedValue);
          field.onChange(convertedValue);
        };
        return (
          <div className="space-y-[5px]" data-field-name={name}>
            <Select
              onValueChange={handleValueChange}
              value={localValue ? String(localValue) : ""}
              defaultValue={initialValue ? String(initialValue) : ""}
            >
              <SelectTrigger
                className={clsx(
                  className,
                  fieldState.error && "border-red-500"
                )}
              >
                <div className="flex items-center gap-[8px]">
                  {icon && <Image src={icon} alt="" width={24} height={24} />}
                  <SelectValue placeholder={placeholder} />
                </div>
              </SelectTrigger>
              <SelectContent className="z-[60]">
                {options?.map((option) => {
                  const optionValue = option?.value ?? option?.id;
                  if (optionValue === undefined) return null;
                  return (
                    <SelectItem
                      key={`${optionValue}-${String(option.name)}`}
                      value={String(optionValue)}
                    >
                      <div className="flex items-center gap-2">
                        {optionIcon && option?.icon && (
                          <Image
                            src={option?.icon}
                            alt=""
                            width={24}
                            height={24}
                          />
                        )}
                        {option?.name}
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>

            <FormFieldError
              visible={Boolean(fieldState.error && fieldState.invalid)}
              messageKey={fieldState.error?.message}
            />
          </div>
        );
      }}
    />
  );
};

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "src/components/ui/select";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import Image from "next/image";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { FormFieldError } from "src/components/ui/form-field-error";
import { useTranslations } from "next-intl";
import { useAllBrands } from "src/queries/business/brands/useAllBrands";
import { CHImage } from "src/components/ui/image";

interface IProps {
  name: string;
  placeholder?: string;
  className?: string;
  icon?: string;
  defaultValue?: number;
  valueType?: "string" | "number";
}

export const BrandSelect = ({
  name,
  placeholder,
  className,
  icon,
  defaultValue,
  valueType = "string",
}: IProps) => {
  const t = useTranslations("business");
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

  const convertValue = (value: string | number | undefined) => {
    if (value === undefined) return "";
    if (valueType === "number") {
      return typeof value === "string" ? Number(value) : value;
    }
    return String(value);
  };

  const { brands } = useAllBrands();

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
          <div className="flex flex-col gap-[10px]">
            <div className="text-base text-textColor font-bold leading-[22px]">
              {t("chooseBrand")}
            </div>
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
                  <SelectItem
                    value="new-brand"
                    className="border-b border-b-gray300 rounded-none hover:rounded-[8px]"
                  >
                    <div className="flex items-center gap-2">
                      <Image
                        src="/static/icons/plus-gray.svg"
                        alt=""
                        width={16}
                        height={16}
                      />
                      <span>{t("createNewBrand")}</span>
                    </div>
                  </SelectItem>
                  {brands?.map((option) => {
                    if (option?.id === undefined) return null;
                    return (
                      <SelectItem
                        key={`${option?.id}-${String(option.title)}`}
                        value={String(option?.id)}
                      >
                        <div className="flex items-center gap-2">
                          <CHImage
                            src={option?.logo_file?.link}
                            alt=""
                            width={24}
                            height={24}
                            className="rounded-full w-[24px] h-[24px] border border-gray700"
                            imagePlaceholder
                          />
                          <span>{option?.title}</span>
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
          </div>
        );
      }}
    />
  );
};

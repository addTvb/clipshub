"use client";

import { useTranslations } from "next-intl";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "src/components/ui/button/button";
import { Input } from "src/components/ui/input";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { useCreateOfferStore } from "src/widgets/business/offers/create-offer/model/useCreateOfferStore";

interface DynamicLinksInputProps {
  name?: string;
}

export const DynamicLinksInput = ({
  name = "dynamicLinks",
}: DynamicLinksInputProps) => {
  const t = useTranslations();
  const { control, setValue, watch } = useFormContext();
  const { dynamicLinks: storeDynamicLinks, setDynamicLinks } = useCreateOfferStore();

  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  const initializedRef = useRef(false);

  // Одноразовая инициализация значением из стора или одним пустым элементом
  useEffect(() => {
    if (initializedRef.current) return;
    const initial = Array.isArray(storeDynamicLinks) && storeDynamicLinks.length > 0
      ? storeDynamicLinks
      : [{ title: "", link: "" }];
    setValue(name, initial, { shouldDirty: false, shouldTouch: false, shouldValidate: false });
    initializedRef.current = true;
  }, [name, setValue, storeDynamicLinks]);

  const watchedDynamicLinks = watch(name);

  // Стабильное сравнение массивов ссылок
  const isEqualLinks = (a: unknown, b: unknown) => {
    try {
      return JSON.stringify(a) === JSON.stringify(b);
    } catch {
      return false;
    }
  };

  // Дебаунс обновления стора, чтобы не вызывать лишние ререндеры
  const debounceRef = useRef<number | null>(null);
  useEffect(() => {
    if (!initializedRef.current) return;
    if (!Array.isArray(watchedDynamicLinks)) return;
    if (isEqualLinks(watchedDynamicLinks, storeDynamicLinks)) return;

    if (debounceRef.current !== null) {
      window.clearTimeout(debounceRef.current);
    }
    debounceRef.current = window.setTimeout(() => {
      setDynamicLinks(watchedDynamicLinks);
      debounceRef.current = null;
    }, 200);
    return () => {
      if (debounceRef.current !== null) {
        window.clearTimeout(debounceRef.current);
      }
    };
  }, [watchedDynamicLinks, storeDynamicLinks, setDynamicLinks]);

  const addNewLink = () => {
    if (fields.length < 10) {
      append({ title: "", link: "" });
    }
  };

  const removeLink = (index: number) => {
    remove(index);
  };

  return (
    <div className="space-y-[16px] w-full" data-field-name={name}>
      <div className="text-textColor font-bold text-lg lg:text-xl">
        {t("business.offerForm.addLinksToYourContent")}
      </div>

      <div className="space-y-[16px]">
        {fields.map((field, index) => (
          <div key={field.id} className="space-y-[10px]">
            <div className="grid grid-cols-[1fr_1fr_36px] gap-[12px] items-center">
              <div
                className="flex-1 space-y-[8px]"
                data-field-name={`${name}.${index}.title`}
              >
                <Input
                  name={`${name}.${index}.title`}
                  placeholder={t("business.offerForm.linkTitle")}
                  className="w-full"
                />
              </div>

              <div
                className="flex-1 space-y-[8px]"
                data-field-name={`${name}.${index}.link`}
              >
                <Input
                  name={`${name}.${index}.link`}
                  placeholder={t("business.offerForm.linkUrl")}
                  className="w-full"
                  icon="/static/icons/link-black.svg"
                />
              </div>

              {index > 0 && (
                <Button
                  type="button"
                  variant="text"
                  onClick={() => removeLink(index)}
                  className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <Image
                    src="/static/icons/trash.svg"
                    alt={t("common.delete")}
                    width={20}
                    height={20}
                  />
                </Button>
              )}
            </div>
          </div>
        ))}

        {fields.length < 10 && (
          <Button
            type="button"
            variant="outline"
            onClick={addNewLink}
            className="flex items-center justify-center gap-[8px] py-[12px]"
          >
            <span className="text-lg">+</span>
            <span>{t("business.offerForm.addLink")}</span>
          </Button>
        )}

        {fields.length >= 10 && (
          <p className="text-sm text-gray500 text-center">
            {t("business.offerForm.maxLinksReached")}
          </p>
        )}
      </div>
    </div>
  );
};

"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useMemo, useState, useEffect } from "react";
import { useController, useFormContext } from "react-hook-form";
import { MobileModal } from "src/components/ui/mobile-modal";
import { useLanguagesDictionary } from "src/queries/business/dictionaries/useLanguagesDictionary";

interface IProps {
  name: string;
}

export const MobileLangSelect = ({ name }: IProps) => {
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const { control, getValues } = useFormContext();
  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
  });

  const handleChange = (value: string) => {
    onChange(value);
    setOpen(false);
  };

  const { languages } = useLanguagesDictionary();

  const langOptions = useMemo(() => {
    return (
      languages?.map((lang) => ({
        id: lang.id,
        name: lang.name,
        value: String(lang.id),
        icon: lang.icon,
        slug: lang.slug,
      })) || []
    );
  }, [languages]);

  const selectedLang = useMemo(() => {
    const currentValue = value?.toString();
    const langArr = langOptions.filter((lang) => lang.value === currentValue);
    return langArr[0];
  }, [value, langOptions]);

  // Устанавливаем начальное значение при монтировании
  useEffect(() => {
    const initialValue = getValues(name);
    if (initialValue && !value) {
      onChange(initialValue.toString());
    }
  }, [name, getValues, onChange, value]);

  return (
    <>
      <button
        type="button"
        className="border border-gray300 rounded-[4px] py-[10px] pl-[8px] pr-[12px] flex items-center justify-between"
        onClick={handleOpen}
      >
        {selectedLang?.name ? (
          <span className="text-sm font-medium">{selectedLang.name}</span>
        ) : (
          <span className="text-sm text-gray400">{t("common.language")}</span>
        )}
        <Image
          src="/static/icons/arrow-down-black.svg"
          alt=""
          width={14}
          height={14}
        />
      </button>
      <MobileModal
        open={open}
        setOpen={setOpen}
        title={t("influencer.channelSettings.enterChannelLanguage")}
        drawerClassName="h-auto"
        className="h-auto pb-[10px]"
      >
        {langOptions?.map((option) => (
          <button
            type="button"
            className="p-[10px] w-full font-medium text-sm flex items-center justify-between gap-[12px] rounded-[4px] transition-colors active:bg-white50"
            onClick={() => handleChange(option.value)}
            key={`mobile-lang-select-${option.value}`}
          >
            <span className="flex items-center gap-[6px]">
              <Image src={option.icon} alt="" width={21} height={15} />
              <span>{option.name}</span>
            </span>
            {value?.toString() === option.value && (
              <Image
                src="/static/icons/marker-green.svg"
                alt=""
                width={20}
                height={20}
              />
            )}
          </button>
        ))}
      </MobileModal>
    </>
  );
};

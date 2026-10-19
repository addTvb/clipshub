"use client";

import { useTranslations } from "next-intl";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "src/components/ui/select";
import { useAvailableLocales } from "src/features/lang/model/useAvailableLocales";
import { useLanguages } from "./model/useLanguages";
import Image from "next/image";
import ArrowDownBoldIcon from "@icons/arrow-down-bold-icon.svg";

export const FooterLangSelect = () => {
  const t = useTranslations("languages");
  const { locale, handleChangeLang } = useLanguages();
  const locales = useAvailableLocales();

  return (
    <div>
      <Select onValueChange={handleChangeLang} value={locale}>
        <SelectTrigger
          className="border-none focus:outline-none focus:ring-0 flex gap-[5px] bg-black400"
          arrowClassName="text-white w-[10px] h-[10px]"
          customArrow={<ArrowDownBoldIcon className="text-white" />}
        >
          <SelectValue placeholder={t("long.en")} />
        </SelectTrigger>

        <SelectContent
          className="bg-black400 border-none text-white min-w-auto"
          side="top"
        >
          {locales.map((localeOption) => (
            <SelectItem
              key={`footer-lang-${localeOption}`}
              value={localeOption}
              className="cursor-pointer hover:!bg-transparent focus:!bg-transparent data-[highlighted]:!bg-transparent data-[state=checked]:!bg-transparent transition-colors duration-300 text-[#97A8C6] hover:text-white focus:text-white data-[highlighted]:text-white data-[state=checked]:text-white"
            >
              <div className="flex items-center gap-2 pr-[10px]">
                <Image
                  src={`/static/icons/lang/circle/${localeOption}.svg`}
                  alt={localeOption}
                  width={20}
                  height={20}
                />
                {t(`long.${localeOption}`)}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

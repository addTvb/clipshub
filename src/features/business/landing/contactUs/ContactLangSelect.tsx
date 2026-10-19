"use client";

import { useTranslations } from "next-intl";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "src/components/ui/select";
import Image from "next/image";

const CONTACT_LOCALES = [
  "en",
  "es",
  "pt-br",
  "ru",
  "tr",
  "pl",
  "de",
  "cn",
  "jp",
] as const;

interface ContactLangSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export const ContactLangSelect = ({ value, onChange }: ContactLangSelectProps) => {
  const t = useTranslations("languages");

  return (
    <div>
      <Select onValueChange={onChange} value={value}>
        <SelectTrigger
          className="border-none focus:outline-none focus:ring-0 flex gap-[5px] bg-[#222936] text-white h-[44px] w-[150px]"
          arrowClassName="text-white w-[10px] h-[10px]"
        >
          <div className="flex flex-col pb-[5px] pr-[10px] gap-[2px]">
            <div className="text-gray550 text-[10px] font-semibold uppercase">
              {t("talkToMeIn")}
            </div>
            <SelectValue placeholder={t("long.en")} />
          </div>
        </SelectTrigger>

        <SelectContent
          className="bg-black400 border-none text-white min-w-auto"
          side="top"
        >
          {CONTACT_LOCALES.map((localeOption) => (
            <SelectItem
              key={`contact-lang-${localeOption}`}
              value={localeOption}
              className="cursor-pointer hover:!bg-transparent focus:!bg-transparent data-[highlighted]:!bg-transparent data-[state=checked]:!bg-transparent transition-colors duration-300 text-[#97A8C6] hover:text-white focus:text-white data-[highlighted]:text-white data-[state=checked]:text-white"
            >
              <div className="flex items-center gap-2">
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

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "src/i18n/routing";
import { NEXT_LOCALE, RU_AVAILABLE_COOKIE } from "src/config/cookies";
import { cookieSetter } from "src/lib/cookieSetter";

export const useLanguages = () => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const handleChangeLang = (value: string) => {
    cookieSetter(NEXT_LOCALE, value);
    // Если пользователь намеренно выбрал RU, считаем RU доступным и пишем куку
    if (value === "ru") {
      cookieSetter(RU_AVAILABLE_COOKIE, "1");
    }
    router.replace(pathname, { locale: value });
  };

  return { locale, handleChangeLang };
};

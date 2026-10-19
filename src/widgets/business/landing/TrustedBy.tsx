import { useTranslations } from "next-intl";
import Image from "next/image";

export const TrustedBy = () => {
  const t = useTranslations("business");

  // Все доступные иконки компаний
  const allCompanies = [
    "cybershoke",
    "ggpick",
    /* "roblox", */
    "qwertycom",
    /* "figma", */
    "ggpay",
    "csfail",
    "ggdrop",
    "clicprofit",
    "alanbase",
    "gghub",
    "moogold",
    "admitad",
  ];

  // Разделяем иконки для мобильных каруселей
  const topRowCompanies = allCompanies.slice(0, 5); // первые 5
  const bottomRowCompanies = allCompanies.slice(5); // остальные 4

  // Функция для создания достаточного количества повторений для широких экранов
  const createRepeatedArray = (companies: string[], minRepeats = 6) => {
    const result = [];
    for (let i = 0; i < minRepeats; i++) {
      result.push(...companies);
    }
    return result;
  };

  return (
    <div className="py-[19px] md:py-[56px] flex flex-col gap-[15px] md:gap-[40px] items-center bg-textColor px-[10px] overflow-hidden border-b border-black400">
      <h2 className="text-black400 text-[28px] md:text-[40px] font-bold text-center">
        {t("landing.trustedBy.title")}
      </h2>

      {/* Десктопная версия - одна карусель */}
      <div className="hidden md:block w-full">
        <div className="flex animate-scroll-left">
          {/* Создаем достаточное количество повторений для широких экранов */}
          {createRepeatedArray(allCompanies).map((company, index) => (
            <div
              key={`${company}-${index}`}
              className="flex-shrink-0 mx-8 flex items-center justify-center"
            >
              <Image
                src={`/static/icons/companies/${company}.svg`}
                alt={company}
                width={138}
                height={64}
                className="h-16 w-auto opacity-80 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Мобильная версия - две карусели */}
      <div className="md:hidden w-full space-y-[15px]">
        {/* Верхняя карусель - движется слева направо */}
        <div className="flex animate-scroll-right">
          {createRepeatedArray(topRowCompanies, 4).map((company, index) => (
            <div
              key={`top-${company}-${index}`}
              className="flex-shrink-0 mx-[14px] flex items-center justify-center"
            >
              <Image
                src={`/static/icons/companies/${company}.svg`}
                alt={company}
                width={138}
                height={64}
                className="h-12 w-auto opacity-80"
              />
            </div>
          ))}
        </div>

        {/* Нижняя карусель - движется справа налево */}
        <div className="flex animate-scroll-left">
          {createRepeatedArray(bottomRowCompanies, 4).map((company, index) => (
            <div
              key={`bottom-${company}-${index}`}
              className="flex-shrink-0 mx-[14px] flex items-center justify-center"
            >
              <Image
                src={`/static/icons/companies/${company}.svg`}
                alt={company}
                width={138}
                height={64}
                className="h-12 w-auto opacity-80"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

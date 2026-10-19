import { useQuery } from "@tanstack/react-query";
import { getLanguagesDictionary } from "src/api/business/dictionaries/languages";
import { queryKeys } from "src/config/queryKeys";
// import Cookies from "js-cookie";
// import { RU_AVAILABLE_COOKIE } from "src/config/cookies";

export const useLanguagesDictionary = () => {
  const { data: languages, isLoading: loadingCategories } = useQuery({
    queryKey: queryKeys.business.dictionaries.languages,
    queryFn: getLanguagesDictionary,
  });

  return {
    languages: languages?.list,
    // languages: (() => {
    //   const ruAvailable = Cookies.get(RU_AVAILABLE_COOKIE) === "1" || Cookies.get(RU_AVAILABLE_COOKIE) === "true";
    //   const list = languages?.list;
    //   if (!list) return list;
    //   if (ruAvailable) return list;
    //   return list.filter((l) => l.slug !== "ru");
    // })(),
    loadingCategories,
  };
};

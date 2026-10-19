import { useQuery} from "@tanstack/react-query";
import { getSocialAuthentications } from "src/api/auth";
import { queryKeys } from "src/config/queryKeys";

export const useAuthSocials = () => {
 const {data, isLoading} = useQuery({
  queryKey: queryKeys.user.socials,
  queryFn: getSocialAuthentications,
 })

 return {data, isLoading}
};

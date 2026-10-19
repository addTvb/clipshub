import { useQuery } from "@tanstack/react-query";
import { getChannelVerificationCode } from "src/api/influencers/media-channels";
import { queryKeys } from "src/config/queryKeys";

export const useGetChannelVerificationCode = () => {
  const { data } = useQuery({
    queryKey: queryKeys.influencers.channels.getChannelVerificationCode,
    queryFn: getChannelVerificationCode,
  });

  return { verificationCode: data?.description_code };
};

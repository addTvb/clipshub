import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useChannelSettingStore } from "src/features/influencers/channels/model/useChannelSettingStore";
import { useAddMediaChannel } from "src/queries/influencers/useAddMediaChannel";

export const useAutoChannelAuth = () => {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const channelType = searchParams.get("channelType");
  const router = useRouter();
  const pathname = usePathname();
  const { setChannel, setOpen } = useChannelSettingStore();

  const { addChannel, isPending } = useAddMediaChannel({
    onSuccess: (channel) => {
      setChannel(channel);
      setOpen(true);
    },
  });

  useEffect(() => {
    if (code && channelType) {
      const redirectUrl =
        channelType === "instagram"
          ? `${process.env.NEXT_PUBLIC_FRONT_BASE_URL}/api/channels/callback/instagram`
          : `${process.env.NEXT_PUBLIC_FRONT_BASE_URL}/api/channels/callback/tiktok`;

      addChannel({ code, front_url: redirectUrl, type: channelType });
      router.replace(pathname);
    }
  }, [code, channelType, addChannel, router, pathname]);

  return { isPending, addChannel };
};

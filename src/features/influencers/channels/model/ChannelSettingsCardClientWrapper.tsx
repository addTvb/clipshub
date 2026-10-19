"use client";

import ChannelSettingsCard from "../ChannelSettingsCard";
import { useChannelSettingStore } from "./useChannelSettingStore";

export const ChannelSettingsCardClientWrapper = () => {
  const { channel, open, setOpen } = useChannelSettingStore();

  if (channel)
    return (
      <ChannelSettingsCard
        isNewChannel={channel?.status === "created"}
        openModal={open}
        setIsOpen={setOpen}
        mediaChannel={channel}
      />
    );
};

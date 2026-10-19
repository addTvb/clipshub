"use client";

import AddChannelCard from "src/widgets/influencers/channels/add-channel/AddChannelCard";
import ChannelSkeletonCard from "src/widgets/influencers/channels/ChannelSkeletonCard";
import ChannelCard from "src/widgets/influencers/channels/ChannelCard";
import { MediaChannel, MediaChannelDetails } from "src/types/influencers";
import { useState } from "react";
import { AlternativeMethodModal } from "./add-channel/AlternativeMethodModal";

interface Props {
  mediaChannels: MediaChannel[];
  channelDetails?: MediaChannelDetails[];
  isLoading: boolean;
}

const ChannelGrid = ({
  mediaChannels,
  channelDetails = [],
  isLoading,
}: Props) => {
  const [openAlternativeMethod, setOpenAlternativeMethod] = useState(false);

  const handleOpenAlternativeMethod = () => setOpenAlternativeMethod(true);
  const handleCloseAlternativeMethod = () => setOpenAlternativeMethod(false);

  return (
    <>
      <AlternativeMethodModal
        open={openAlternativeMethod}
        onClose={handleCloseAlternativeMethod}
      />

      <div
        className="grid gap-[21px] w-full auto-rows-[minmax(200px, 1fr)]"
        style={{
          gridTemplateColumns:
            "repeat(auto-fill, minmax(min(100%, 366px), 1fr))",
        }}
      >
        {isLoading ? (
          <>
            <ChannelSkeletonCard />
            <ChannelSkeletonCard />
          </>
        ) : (
          mediaChannels.map((channel) => (
            <ChannelCard
              key={channel.id}
              mediaChannel={channel}
              mediaChannelDetails={channelDetails.find(
                (d) => d?.media_channel?.id === channel.id
              )}
            />
          ))
        )}
        <AddChannelCard onOpenModal={handleOpenAlternativeMethod} />
      </div>
    </>
  );
};

export default ChannelGrid;

"use client";

import { useCreateOfferStore } from "../../model/useCreateOfferStore";
import { InstagramDetailsForm } from "./InstagramDetailsForm";
import { TiktokDetailsForm } from "./TiktokDetailsForm";
import { YouTubeDetailsForm } from "./YouTubeDetailsForm";
// TODO change to switch case and set default fallback case with go to step 1
export const SecondStepAdContent = () => {
  const { socialPlatform } = useCreateOfferStore();

  if (socialPlatform === "instagram") return <InstagramDetailsForm />;
  if (socialPlatform === "tiktok") return <TiktokDetailsForm />;

  return <YouTubeDetailsForm />;
};

"use client";

import { redirect } from "next/navigation";
import { useGetUser } from "src/queries/useGetUser";
import { useAuthStore } from "src/store/auth";
import BusinessLanding from "src/widgets/business/landing/Landing";

export function MainPageClient() {
  const { user } = useGetUser();
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    if (user?.type === "influencer") {
      return redirect("/influencers");
    }
    if (user?.type === "business") {
      return redirect("/business/campaigns");
    }
  }

  if (!isAuthenticated) return <BusinessLanding />;
}

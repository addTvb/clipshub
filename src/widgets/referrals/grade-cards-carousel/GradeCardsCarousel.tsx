import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "src/components/ui/carousel/carousel";
import { ReferralGradeCard } from "../ref-grade-card/ReferralGradeCard";
import { useWindowSize } from "usehooks-ts";
import { ReferralInfoResponse } from "src/types/referrals";

interface IProps {
  referrals?: ReferralInfoResponse;
}

export const GradeCardsCarousel = ({ referrals }: IProps) => {
  const { width } = useWindowSize();

  return (
    <Carousel
      opts={{ align: "center" }}
      className="w-full"
      peek={width <= 500 ? 15 : 40}
    >
      <CarouselContent>
        {referrals?.items.map((referral) => (
          <CarouselItem key={`${referral.slug}-ref-card-mobile`}>
            <ReferralGradeCard referral={referral} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

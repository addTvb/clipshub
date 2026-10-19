"use client";

import { useTranslations } from "next-intl";
import { RejectReason } from "src/types/base";

interface IProps {
  moderationRejectReasons?: RejectReason[];
}

export const RejectedOfferReasons = ({
  moderationRejectReasons,
}: IProps) => {
  const t = useTranslations();

  return (
    <div className="flex flex-col gap-[4px]">
      <div className="text-[14px] font-bold text-[#586781]">
        {t("business.offer.rejected.title")}
      </div>
      {moderationRejectReasons && moderationRejectReasons.length > 0 && (
        <>
          <div className="text-[14px] font-bold text-[#586781]">
            {t("business.offer.rejected.reasonPrefix")}
          </div>
          <ul className="flex flex-col gap-[4px] text-[14px] font-medium text-[#586781]">
            {moderationRejectReasons.map((reason) => (
              <li key={reason.id}>– {reason.description}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};


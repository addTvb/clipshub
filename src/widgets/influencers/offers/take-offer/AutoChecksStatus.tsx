import clsx from "clsx";
import { useTranslations } from "next-intl";

const AUTO_CHECKS_CONFIG = {
  post_age: {
    translationKey: "influencer.takeOfferForm.postTooOldStatus",
  },
  post_belongs_to_user: {
    translationKey: "influencer.takeOfferForm.belongToUserStatus",
  },
  post_description: {
    translationKey: "influencer.takeOfferForm.descInShortsStatus",
  },
  profile_description: {
    translationKey: "influencer.takeOfferForm.descInBioStatus",
  },
  profile_bio_url: {
    translationKey: "influencer.takeOfferForm.linkInBioStatus",
  },
  post_pinned_comment: {
    translationKey: "influencer.takeOfferForm.pinnedCommentStatus",
  },
  post_title: {
    translationKey: "influencer.takeOfferForm.postTitleStatus",
  },
  clipper_avatar: {
    translationKey: "influencer.takeOfferForm.clipperAvatarStatus",
  },
} as const;

interface CheckStatusItemProps {
  isPassed: boolean;
  translationKey: string;
}

const CheckStatusItem = ({
  isPassed,
  translationKey,
}: CheckStatusItemProps) => {
  const t = useTranslations();
  return (
    <div className={clsx(isPassed ? "" : "text-red-500")}>
      {isPassed ? "✅" : "❌"} {t(translationKey)}
    </div>
  );
};

interface AutoChecksStatusProps {
  autoChecks: Record<string, boolean>;
  isTimerActive: boolean;
  timerSeconds: number;
}

export const AutoChecksStatus = ({
  autoChecks,
  isTimerActive,
  timerSeconds,
}: AutoChecksStatusProps) => {
  const t = useTranslations();

  const hasErrors = Object.values(autoChecks).some((check) => !check);
  if (!hasErrors) return null;

  const renderCheckItem = (apiKey: string, isPassed: boolean) => {
    const config =
      AUTO_CHECKS_CONFIG[apiKey as keyof typeof AUTO_CHECKS_CONFIG];

    return (
      <CheckStatusItem
        key={apiKey}
        isPassed={isPassed}
        translationKey={config ? config.translationKey : apiKey}
      />
    );
  };

  return (
    <>
      <div className="text-gray400 text-[14px] font-[500]">
        {Object.entries(autoChecks).map(([apiKey, isPassed]) =>
          renderCheckItem(apiKey, isPassed)
        )}
      </div>

      <div className="bg-gray100 p-[12px] text-[14px] font-[500] rounded-[8px]">
        {t.rich("influencer.takeOfferForm.profileErrorMessage", {
          recheck: (chunks) => (
            <button
              type="submit"
              className={clsx(
                "underline",
                isTimerActive
                  ? "text-gray400 cursor-not-allowed"
                  : "text-blue300"
              )}
              disabled={isTimerActive}
            >
              {isTimerActive ? `${chunks} (${timerSeconds}s)` : chunks}
            </button>
          ),
        })}
        <div className="text-gray400 text-[12px] font-[400]">
          {t("influencer.takeOfferForm.profileErrorMessageDesc")}
        </div>
      </div>
    </>
  );
};

import { useTranslations } from "next-intl";

interface ErrorStateProps {
  error: Error | unknown;
}

export const ErrorState = ({ error }: ErrorStateProps) => {
  const errorT = useTranslations("error");

  return (
    <div className="w-full flex flex-col gap-[24px] bg-white rounded-[8px] shadow-cardShadow items-center justify-center h-[304px]">
      <div className="text-red-500 text-center">
        <h2 className="text-xl font-bold mb-2">{errorT("loadingFailed")}</h2>
        <p>
          {error instanceof Error
            ? error.message
            : errorT("tryAgainLater")}
        </p>
      </div>
    </div>
  );
};


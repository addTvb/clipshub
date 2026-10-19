import { Spinner } from "src/components/ui/spinner";

export const LoadingState = () => {
  return (
    <div className="w-full flex flex-col gap-[24px] bg-white rounded-[8px] shadow-cardShadow items-center justify-center h-[304px]">
      <Spinner color="dark" />
    </div>
  );
};


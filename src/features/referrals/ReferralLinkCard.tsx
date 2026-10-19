import { Button } from "src/components/ui/button/button";
import XIcon from "@icons/x.svg";
import TelegramIcon from "@icons/telegram.svg";
import TextCard from "src/components/ui/text-card";
import { useTranslations } from "next-intl";
import { frontendBaseUrl } from "src/config/app";

interface IProps {
  link: string;
  code: string | number;
}

export const ReferralLinkCard = ({ link, code }: IProps) => {
  const tReferralProgram = useTranslations("influencer.referralProgram");
  const referralLink = `${frontendBaseUrl}/?ref=${code}`;
  const shareText = tReferralProgram("shareText");
  const tweet = encodeURIComponent(`${shareText} ${referralLink}`);
  const tgText = encodeURIComponent(`${shareText}`);
  const tgUrl = encodeURIComponent(referralLink);

  return (
    <div className="shadow-cardShadow h-fit p-[24px] flex gap-[16px] items-end rounded-[8px] bg-white md:col-span-2 flex-col md:flex-row">
      <div className="flex flex-col gap-[10px] flex-1 w-full">
        <div className="text-[16px] font-[700]">
          {tReferralProgram("yourReferralLink")}
        </div>
        <TextCard className="w-full" text={link} url={link} copy />
      </div>
      {/* <div className="flex flex-col gap-[10px] flex-1 w-full">
        <div className="text-[16px] font-[700]">
          {tReferralProgram("referralCode")}
        </div>

        <TextCard className="w-full" copy text={String(code)} />
      </div> */}
      <div className="flex  gap-[10px] md:w-auto w-full">
        <Button
          target="_blank"
          href={`https://twitter.com/intent/tweet?text=${tweet}`}
          variant="outline"
          className="h-[60px] w-full min-w-[60px]"
        >
          <XIcon />
        </Button>
        <Button
          target="_blank"
          href={`https://t.me/share/url?url=${tgUrl}&text=${tgText}`}
          variant="outline"
          className="h-[60px] w-full min-w-[60px]"
        >
          <TelegramIcon />
        </Button>
      </div>
    </div>
  );
};

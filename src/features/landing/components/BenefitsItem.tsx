import Image from "next/image";
import { useTranslations } from "next-intl";

interface IProps {
  title: string;
  text: string;
  icon: string;
  bgColor?: string;
}

const LandingBenefitsItem = ({ title, text, icon, bgColor }: IProps) => {
  const t = useTranslations();

  return (
    <div className="flex flex-col md:p-[24px] p-[12px]">
      {icon === "social" ? (
        <Image
          src="/static/images/landing/social.svg"
          width={98}
          height={36}
          alt=""
          className="md:mb-[32px] mb-[16px] drop-shadow-md"
        />
      ) : (
        <div
          className="p-[10px] rounded-[10px] bg-primary size-[42px] md:mb-[32px] mb-[16px]"
          style={{ background: bgColor }}
        >
          <Image src={icon} width={22} height={22} alt="" />
        </div>
      )}

      <div className="font-bold md:text-[20px] text-[16px] md:mb-[16px] mb-[12px]">
        {t(title)}
      </div>
      <div className="font-[Inter] md:text-[16px] text-[14px]">{t(text)}</div>
    </div>
  );
};

export default LandingBenefitsItem;

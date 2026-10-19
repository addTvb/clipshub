import { useTranslations } from "next-intl";
import { Modal } from "src/components/ui/dialog";
import DOMPurify from "isomorphic-dompurify";
import Image from "next/image";
import { Link } from "src/i18n/routing";

interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const PremiumPopup = ({ open, setOpen }: IProps) => {
  const t = useTranslations("influencer.premiumPopup");
  return (
    <Modal
      open={open}
      setIsOpen={setOpen}
      withCross
      className="md:max-w-[600px] w-full p-[16px] md:p-[24px] flex flex-col gap-[24px]"
      mobileClassName="flex flex-col gap-[24px] p-0"
      mobileBreakpoint={700}
      title={t("title")}
    >
      <div
        className="text-dark100 text-[16px] font-[Inter] text-center"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(t.raw("description")),
        }}
      />
      <Link
        className="w-fit self-center transition-colors duration-300 hover:text-blue300 nav-underline nav-underline--blue nav-underline--active"
        href="https://viralista.com/ofertapremium"
        target="_blank"
      >
        <span>{t("upgrade")}</span>
        <span className="bg-white50 p-[4px] rounded-[8px] inline-block align-baseline ml-1 mb-[-4px]">
          <Image
            src="/static/icons/viralista-icon.svg"
            alt=""
            width={54}
            height={10}
          />
        </span>
      </Link>
    </Modal>
  );
};

import Image from "next/image";
import { Link } from "src/i18n/routing";

interface IProps {
  iconPath: string;
  text: string;
  href?: string;
  onClick?: () => void;
  onEveryClick?: () => void;
}

export const ProfileMenuItem = ({
  iconPath,
  text,
  href,
  onClick,
  onEveryClick,
}: IProps) => {
  const renderContent = () => (
    <div className="p-[10px] text-gray400 text-sm font-medium flex items-center gap-[8px] text-[14px] md:font-[500] font-[Inter] md:gap-[10px] w-full md:p-[6px] justify-start rounded-[4px] hover:bg-[#F3F6FA] transition-bg duration-300">
      <Image src={iconPath} alt="" width={20} height={20} />
      {text}
    </div>
  );

  if (href) {
    return (
      <Link href={href} onClick={onEveryClick}>
        {renderContent()}
      </Link>
    );
  }
  return (
    <button
      className="focus-visible:outline-none w-full cursor-pointer"
      onClick={() => {
        if (onClick) onClick();
        if (onEveryClick) onEveryClick();
      }}
    >
      {renderContent()}
    </button>
  );
};

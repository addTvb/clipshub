import Image from "next/image";
import { ReactNode } from "react";

interface IProps {
  text: ReactNode;
}

const ShowcaseListItem = ({ text }: IProps) => {
  return (
    <li className="w-full rounded-[12px] bg-white md:px-[24px] px-[16px] py-[16px] flex items-center gap-[16px] lg:text-[20px] text-[16px]">
      <Image
        src="/static/images/landing/lightning.webp"
        alt=""
        width={26}
        height={41}
      />
      <div>{text}</div>
    </li>
  );
};

export default ShowcaseListItem;

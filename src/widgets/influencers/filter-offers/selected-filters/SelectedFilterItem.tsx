"use client";

import Image from "next/image";

interface IProps {
  title: string;
  onRemove: () => void;
}

export const SelectedFilterItem = ({ title, onRemove }: IProps) => {
  return (
    <button 
      onClick={onRemove}
      className="p-[6px] pl-[12px] pr-[10px] rounded-[8px] bg-white200 flex items-center gap-[6px] text-textColor text-sm font-semibold transition-colors hover:bg-textColor hover:text-white200 capitalize"
    >
      <span>{title}</span>
      <Image src="/static/icons/cross.svg" alt="" width={8} height={8} />
    </button>
  );
};
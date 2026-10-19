import { ReactNode } from "react";

interface IProps {
  title: string | ReactNode;
  value: string;
  icon: ReactNode;
}

export const GradeCardInfoItem = ({ title, value, icon }: IProps) => {
  return (
    <div className="flex items-center justify-between gap-[20px]">
      <div className="flex items-center gap-[8px]">
        {icon}

        <span className="text-textColor font-[Inter] text-[13px] font-medium">
          {title}
        </span>
      </div>

      <div className="text-gray400 font-[Inter] text-[13px] font-medium">
        {value}
      </div>
    </div>
  );
};

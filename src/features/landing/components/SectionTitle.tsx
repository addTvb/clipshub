import { cn } from "src/lib/utils";

interface IProps {
  title: string;
  subtitle: string;
  className?: string;
}

const LandingSectionTitle = ({ title, subtitle, className }: IProps) => {
  return (
    <h2
      className={cn(
        "[&>span]:text-gray550 [&>span]:lg:text-[20px] [&>span]:text-[16px] lg:text-[40px] text-[28px] font-bold flex flex-col lg:mb-[64px] mb-[48px]",
        className
      )}
    >
      <span>{title}</span>
      {subtitle}
    </h2>
  );
};

export default LandingSectionTitle;

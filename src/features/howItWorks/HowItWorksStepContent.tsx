import { ReactNode } from "react";
import clsx from "clsx";

export interface HowItWorksStepContentProps {
  /** Дополнительные CSS классы */
  className?: string;
  /** Контент для отображения */
  children: ReactNode;
}

export default function HowItWorksStepContent({
  className,
  children,
}: HowItWorksStepContentProps) {
  return (
    <div className={clsx(
      "rounded-[12px] overflow-hidden",
      className
    )}>
      {/* Индикаторы загрузки (декоративные точки) */}
      <div className="flex items-center gap-1 bg-[#DFE3EA] p-2">
        <div className="w-[10px] h-[10px] rounded-full bg-white"></div>
        <div className="w-[10px] h-[10px] rounded-full bg-white"></div>
        <div className="w-[10px] h-[10px] rounded-full bg-white"></div>
      </div>

      {/* Контент */}
      <div className="bg-[#E6EBF2] p-[14px]">
        {children}
      </div>
    </div>
  );
}

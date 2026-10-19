import { ReactNode } from "react";
import clsx from "clsx";

export interface HowItWorksSectionProps {
  /** Дополнительные CSS классы */
  className?: string;
  /** Блоки шагов */
  children: ReactNode;
}

export default function HowItWorksSection({
  className,
  children,
}: HowItWorksSectionProps) {
  return (
    <div className={clsx(
      "md:rounded-[24px] sm:rounded-[16px] rounded-[12px] border border-[#97A8C6] overflow-hidden divide-y divide-[#97A8C6]",
      className
    )}>
      {children}
    </div>
  );
}

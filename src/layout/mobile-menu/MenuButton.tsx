import clsx from "clsx";
import { Link } from "src/i18n/routing";
import React, { ReactNode } from "react";

interface IProps {
  href?: string;
  children: ReactNode;
  IconComponent?: React.ComponentType<{ fontSize: number; className: string }>;
  onClick?: () => void;
  isActive?: boolean;
  className?: string;
}

export const MenuButton = ({
  href,
  children,
  IconComponent,
  isActive,
  onClick,
  className,
}: IProps) => {
  if (href) {
    return (
      <Link
        href={href}
        className={clsx(
          "py-[8px] flex flex-col items-center justify-center text-center gap-[2px] hover:text-blue300",
          isActive ? "text-[#3188AA]" : "text-gray550",
          className
        )}
        onClick={onClick}
      >
        {IconComponent && (
          <IconComponent fontSize={20} className="text-inherit" />
        )}
        <span className="text-inherit text-[11px] font-semibold">
          {children}
        </span>
      </Link>
    );
  }

  return (
    <button
      className={clsx(
        "py-[8px] flex flex-col items-center justify-center text-center gap-[2px] hover:text-blue300",
        isActive ? "text-[#3188AA]" : "text-gray550",
        className
      )}
      onClick={onClick}
    >
      {IconComponent && (
        <IconComponent fontSize={20} className="text-inherit" />
      )}
      <span className="text-[11px] font-semibold">{children}</span>
    </button>
  );
};

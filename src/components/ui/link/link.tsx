import React from "react";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./link.css";

export interface UiLinkProps
  extends React.PropsWithChildren<React.ComponentProps<typeof Link>> {
  className?: string;
  underlineColor?: "light" | "dark" | "blue" | "leaderboard";
}

export const UiLink = ({
  className,
  children,
  underlineColor = "dark",
  href,
  ...props
}: UiLinkProps) => {
  const pathname = usePathname();

  const isActive = pathname === href;

  const getUnderlineClass = () => {
    switch (underlineColor) {
      case "light":
        return "nav-underline--light";
      case "blue":
        return "nav-underline--blue";
      case "leaderboard":
        return "nav-underline--leaderboard";
      case "dark":
      default:
        return "nav-underline--dark";
    }
  };

  return (
    <Link
      {...props}
      href={href}
      className={clsx(
        "nav-underline",
        getUnderlineClass(),
        isActive && "nav-underline--active",
        className
      )}
    >
      {children}
    </Link>
  );
};

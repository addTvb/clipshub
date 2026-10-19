import React from "react";
import clsx from "clsx";
import { Link as I18nLink, usePathname } from "src/i18n/routing";
import "./link.css";

export interface UiLinkProps
  extends React.PropsWithChildren<React.ComponentProps<typeof I18nLink>> {
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

  // Определяем активную ссылку
  const isActive = pathname === href;

  // Определяем CSS класс для цвета подчеркивания
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
    <I18nLink
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
    </I18nLink>
  );
};

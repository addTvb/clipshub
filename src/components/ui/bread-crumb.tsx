"use client";

import React from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { UiLink } from "./link/link";
import ArrowRightIcon from "@icons/arrow-right-icon.svg";
import HomeIcon from "@icons/home-icon.svg";
import { useWindowSize } from "usehooks-ts";

export interface BreadcrumbItem {
  label: string;
  href: string;
  isCurrent?: boolean;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  className?: string;
  itemClassName?: string;
  currentItemClassName?: string;
  autoGenerate?: boolean;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  className = "",
  itemClassName = "text-gray400 hover:text-gray-900 text-sm font-medium",
  autoGenerate = false,
}) => {
  const pathname = usePathname();
  const { width } = useWindowSize();

  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const segments = pathname.split("/").filter((segment) => segment !== "");

    const breadcrumbs: BreadcrumbItem[] = [{ label: "Home", href: "/" }];

    let currentPath = "";
    segments.forEach((segment, i) => {
      currentPath += `/${segment}`;

      const label = segment
        .replace(/[-_]/g, " ")
        .replace(/(^\w|\s\w)/g, (m) => m.toUpperCase());

      breadcrumbs.push({
        label,
        href: currentPath,
        isCurrent: i === segments.length - 1,
      });
    });

    return breadcrumbs;
  };

  const breadcrumbItems = autoGenerate ? generateBreadcrumbs() : items || [];

  if (breadcrumbItems.length === 0) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className={`flex items-center ${className}`}>
      <ol className="flex items-center gap-[6px]">
        {breadcrumbItems.map((item, index) => {
          const isFirst = index === 0;
          const isLast = index === breadcrumbItems.length - 1;
          if (isFirst && width <= 700) {
            return (
              <UiLink
                key={item.href}
                href={item.href}
                className={clsx("block", itemClassName)}
              >
                <HomeIcon className="text-[20px] text-gray550" />
              </UiLink>
            );
          }
          return (
            <React.Fragment key={item.href}>
              {!isFirst && (
                <li className="flex items-center">
                  <ArrowRightIcon className="text-[10px] text-gray400" />
                </li>
              )}
              <li>
                {isLast || item.isCurrent ? (
                  <span
                    className={clsx(
                      "block truncate max-w-[90px] min-[350px]:max-w-[150px] sm:max-w-full hover:no-underline hover:text-gray400",
                      itemClassName
                    )}
                    aria-current="page"
                  >
                    {item.label}
                  </span>
                ) : (
                  <UiLink
                    href={item.href}
                    className={clsx(
                      "block truncate max-w-[90px] min-[350px]:max-w-[150px] sm:max-w-full",
                      itemClassName
                    )}
                  >
                    {item.label}
                  </UiLink>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;

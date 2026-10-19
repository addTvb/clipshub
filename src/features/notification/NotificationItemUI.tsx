/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import clsx from "clsx";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { formatCurrency } from "src/lib/numbers/formatCurrency";
import CrossIcon from "@icons/cross-icon.svg";
import { headerID } from "src/config/app";

interface IProps {
  open: boolean;
  campaignTitle?: string;
  balance?: number;
  onClose?: () => void;
}

export const NotificationItemUI = ({
  open,
  campaignTitle,
  balance,
  onClose,
}: IProps) => {
  const t = useTranslations("business");

  const gap = 8;
  const fixedOffset = 16;

  const notifDefaultWidth = 420;
  const horizontalMargin = 16;

  const rafRef = useRef<number | null>(null);
  const lastTopRef = useRef<number | null>(null);
  const lastLeftRef = useRef<number | null>(null);
  const lastWidthRef = useRef<number | null>(null);

  const [topPx, setTopPx] = useState<number>(fixedOffset);
  const [leftPx, setLeftPx] = useState<number>(
    Math.max(Math.round((typeof window !== 'undefined' ? window.innerWidth * 0.7 : 0) || 0), horizontalMargin)
  );
  const [widthPx, setWidthPx] = useState<number>(notifDefaultWidth);

  useEffect(() => {
    const headerEl = document.querySelector(`#${headerID}`);

    const compute = () => {
      const vw = window.innerWidth;
      let newTop = fixedOffset;
      if (headerEl) {
        const rect = headerEl.getBoundingClientRect();
        const headerBottom = rect.bottom;
        const desiredTop = Math.round(headerBottom + gap);
        newTop = Math.max(desiredTop, fixedOffset);
      } else {
        newTop = fixedOffset;
      }

      let newWidth = notifDefaultWidth;
      let newLeft = Math.round(vw * 0.7);

      const minAllowedWidth = 80;
      if (vw <= notifDefaultWidth + horizontalMargin * 2) {
        newWidth = Math.max(vw - horizontalMargin * 2, minAllowedWidth);
        newLeft = horizontalMargin;
      } else {
        newWidth = notifDefaultWidth;
        const maxLeft = vw - newWidth - horizontalMargin;
        newLeft = Math.min(Math.max(newLeft, horizontalMargin), maxLeft);
      }

      if (lastTopRef.current !== newTop) {
        lastTopRef.current = newTop;
        setTopPx(newTop);
      }
      if (lastLeftRef.current !== newLeft) {
        lastLeftRef.current = newLeft;
        setLeftPx(newLeft);
      }
      if (lastWidthRef.current !== newWidth) {
        lastWidthRef.current = newWidth;
        setWidthPx(newWidth);
      }
    };

    const onScrollOrResize = () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        compute();
        rafRef.current = null;
      });
    };

    onScrollOrResize();

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    let ro: ResizeObserver | null = null;
    try {
      if ((window as any).ResizeObserver && headerEl) {
        ro = new (window as any).ResizeObserver(() => onScrollOrResize());
        if (ro) ro.observe(headerEl);
      }
    } catch {}

    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      if (ro && headerEl) ro.unobserve(headerEl);
    };
  }, [fixedOffset, gap, notifDefaultWidth, horizontalMargin]);

  return (
    <div
      className={clsx(
        "fixed z-50 transform transition-all duration-200 ease-out",
        open
          ? "translate-y-0 opacity-100"
          : "-translate-y-6 opacity-0 pointer-events-none"
      )}
      style={{
        top: `${topPx}px`,
        left: `${leftPx}px`,
        width: `${widthPx}px`,
        transition:
          "top 180ms cubic-bezier(.2,.9,.2,1), left 180ms cubic-bezier(.2,.9,.2,1), width 180ms cubic-bezier(.2,.9,.2,1), opacity 160ms ease, transform 160ms ease",
      }}
    >
      <div className="max-w-full w-full bg-white rounded-[12px] shadow-lg py-[14px] px-[14px] flex gap-[24px]">
        <div className="flex items-center gap-[10px]">
          <div className="flex-shrink-0">
            <Image
              src="/static/images/stats/top-up-balance.svg"
              alt=""
              width={40}
              height={40}
            />
          </div>

          <div className="flex-1 flex flex-col gap-[4px]">
            <p className="text-textColor font-medium text-[13px]">
              {t.rich("campaignBalanceEmptyNotification", {
                balance: () => <strong>${formatCurrency(balance)}</strong>,
              })}
            </p>

            <div className="text-xs text-gray550">
              {campaignTitle} {t("campaign")}
            </div>
          </div>
        </div>

        <div className="flex-shrink-0">
          <button
            onClick={onClose}
            aria-label="Close notification"
            className="-mr-2 p-2 rounded-md hover:bg-slate-100 focus:outline-none"
          >
            <CrossIcon className="text-[12px]" />
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useEffect, useState } from "react";
import clsx from "clsx";
import Image from "next/image";

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
  bottomOffset?: number;
  zIndex?: number | string;
  overlayClassName?: string;
  containerClassName?: string;
  title?: React.ReactNode;
  withCross?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  open,
  onClose,
  bottomOffset = 56,
  zIndex = 14,
  overlayClassName,
  containerClassName,
  title,
  withCross,
  children,
  className,
}) => {
  const [isVisible, setIsVisible] = useState(open);
  const [isClosing, setIsClosing] = useState(false);
  const [isEntering, setIsEntering] = useState(false);

  // Control enter/exit phases
  useEffect(() => {
    if (open) {
      setIsVisible(true);
      setIsClosing(false);
      setIsEntering(true);
      const enterTimeout = setTimeout(() => setIsEntering(false), 10);
      return () => clearTimeout(enterTimeout);
    } else if (isVisible) {
      setIsClosing(true);
      setIsEntering(false);
      const closeTimeout = setTimeout(() => {
        setIsVisible(false);
        setIsClosing(false);
      }, 300);
      return () => clearTimeout(closeTimeout);
    }
  }, [open, isVisible]);

  // Close on ESC
  useEffect(() => {
    if (!isVisible) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isVisible, onClose]);

  // Lock body scroll while visible
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      <div
        className={clsx(
          `fixed inset-0 bg-black bg-opacity-80 z-[${zIndex}] transition-opacity duration-300`,
          isClosing || isEntering ? "opacity-0" : "opacity-100",
          overlayClassName
        )}
        style={{
          zIndex: zIndex,
        }}
        onClick={onClose}
      />

      <div
        className={clsx(
          `fixed left-0 right-0 z-[${zIndex}] transition-transform duration-300 ease-out`,
          isClosing || isEntering ? "translate-y-full" : "translate-y-0",
          containerClassName
        )}
        style={{
          bottom: bottomOffset,
          maxHeight: `calc(100vh - ${bottomOffset + 20}px)`,
          zIndex: zIndex,
        }}
      >
        <div
          className={clsx("flex flex-col gap-[14px] rounded-t-2xl", className)}
        >
          {(title || withCross) && (
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                {title && (
                  <div className="text-lg font-bold truncate">{title}</div>
                )}
              </div>
              {withCross && (
                <button
                  onClick={onClose}
                  className="size-6 flex items-center justify-center"
                  aria-label="Close drawer"
                >
                  <Image
                    src="/static/icons/cross-icon.svg"
                    alt="close"
                    width={12}
                    height={12}
                    className="w-3 h-3"
                  />
                </button>
              )}
            </div>
          )}
          {children}
        </div>
      </div>
    </>
  );
};

export default MobileDrawer;

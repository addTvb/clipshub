"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import CrossIcon from "@icons/cross-icon.svg";
import { cn } from "src/lib/utils";
import { useTranslations } from "next-intl";
import { useMediaQuery } from "usehooks-ts";

const Dialog = DialogPrimitive.Root;

const DialogPortal = DialogPrimitive.Portal;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-[51] bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

type DialogContentProps = Omit<
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
  "title"
> & {
  className?: string;
  children: React.ReactNode;
  withCross?: boolean;
  isMobile?: boolean;
  title?: string | React.ReactNode;
  renderFooter?: (() => React.ReactNode) | null;
  mobileClassName?: string;
};

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(({ className, children, withCross, isMobile = false, title, renderFooter, mobileClassName, ...props }, ref) => {
  const t = useTranslations("common");
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          "fixed z-[51] bg-background duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          !isMobile &&
            "left-[50%] top-[50%] grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border p-6 shadow-lg data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
          isMobile &&
            "left-0 bottom-0 right-0 border-t p-0 pb-safe shadow-lg rounded-t-[10px] h-[85vh] flex flex-col transition-all duration-500 ease-in-out data-[state=closed]:slide-out-to-bottom-full data-[state=open]:slide-in-from-bottom-full",
          className
        )}
        {...props}
      >
        {isMobile ? (
          <>
            {title && (
              <div
                className="sticky top-0 z-10 bg-background px-4 pt-4 pb-2 flex items-center justify-between"
                style={{ minHeight: 56 }}
              >
                <div className="font-bold text-lg flex-1 capitalize">{title}</div>
                {withCross && (
                  <DialogPrimitive.Close className="ml-2 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                    <CrossIcon className="text-[16px] text-gray550" />
                    <span className="sr-only">{t("close")}</span>
                  </DialogPrimitive.Close>
                )}
              </div>
            )}
            <div className={cn("flex-1 overflow-y-auto px-4 py-2", mobileClassName)}>{children}</div>
            {renderFooter && (
              <div
                className="sticky bottom-0 z-10 bg-background px-4 pt-2 pb-4 border-t flex items-center justify-center"
                style={{ minHeight: 64 }}
              >
                {renderFooter()}
              </div>
            )}
          </>
        ) : (
          <>
            {title && (
              <div className="mb-2 font-bold text-xl">{title}</div>
            )}
            {children}
            {renderFooter && (
              <div className="mt-4">{renderFooter()}</div>
            )}
            {withCross && (
              <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                <CrossIcon className="text-[14px] text-gray550" />
                <span className="sr-only">{t("close")}</span>
              </DialogPrimitive.Close>
            )}
          </>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
});
DialogContent.displayName = DialogPrimitive.Content.displayName;

interface ModalProps {
  children: React.ReactNode;
  open: boolean;
  setIsOpen: (open: boolean) => void;
  className?: string;
  mobileClassName?: string;
  withCross?: boolean;
  mobileBreakpoint?: number;
  title?: string | React.ReactNode;
  renderFooter?: (() => React.ReactNode) | null;
}

export const Modal = ({
  children,
  open,
  setIsOpen,
  className,
  mobileClassName,
  withCross,
  mobileBreakpoint = 768,
  title,
  renderFooter,
}: ModalProps) => {
  const isMobile = useMediaQuery(`(max-width: ${mobileBreakpoint}px)`);

  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogContent
        withCross={withCross}
        isMobile={isMobile}
        mobileClassName={mobileClassName}
        className={cn(
          "max-h-[90vh] overflow-y-auto",
          isMobile && "h-[85vh]",
          className
        )}
        title={title}
        renderFooter={renderFooter}
      >
        {children}
      </DialogContent>
    </Dialog>
  );
};

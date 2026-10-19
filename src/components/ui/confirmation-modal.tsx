"use client";

import { useTranslations } from "next-intl";
import { useWindowSize } from "usehooks-ts";
import { Button } from "./button/button";
import { Modal } from "./dialog";
import { MobileModal } from "./mobile-modal";
import { DialogTitle, DialogDescription } from "@radix-ui/react-dialog";
import clsx from "clsx";
import { ReactNode } from "react";

interface ConfirmationModalProps {
  /** Открыто ли модальное окно */
  open: boolean;
  /** Функция для закрытия модального окна */
  onClose: () => void;
  /** Функция для подтверждения действия */
  onConfirm: () => void;
  /** Заголовок модального окна */
  title?: string;
  /** Контент модального окна */
  children?: ReactNode;
  /** Текст кнопки подтверждения */
  confirmText?: string;
  /** Текст кнопки отмены (если не передан, кнопка отмены не отображается) */
  cancelText?: string;
  /** Вариант кнопки подтверждения */
  confirmVariant?: "default" | "outline" | "danger";
  /** Состояние загрузки */
  loading?: boolean;
  /** CSS класс для дополнительной стилизации */
  className?: string;
  /** Точка переключения на мобильную версию */
  mobileBreakpoint?: number;
  /** Не закрывать модальное окно при подтверждении */
  dontCloseOnConfirm?: boolean;
}

export const ConfirmationModal = ({
  open,
  onClose,
  onConfirm,
  title,
  children,
  confirmText,
  cancelText,
  confirmVariant = "default",
  loading = false,
  className,
  mobileBreakpoint = 700,
  dontCloseOnConfirm = false,
}: ConfirmationModalProps) => {
  const t = useTranslations("common");
  const { width } = useWindowSize();

  // Используем переводы по умолчанию, если текст не передан
  const finalTitle = title || t("confirm");
  const finalConfirmText = confirmText || t("confirm");
  const finalCancelText = cancelText || t("cancel");
  
  // Показывать ли кнопку отмены
  const showCancelButton = cancelText !== undefined;

  const handleConfirm = () => {
    onConfirm();
    if (!loading && !dontCloseOnConfirm) {
      onClose();
    }
  };

  const renderFooter = () => (
    <div className={clsx(
      "flex items-center w-full",
      showCancelButton ? "gap-[12px]" : "justify-center"
    )}>
      {showCancelButton && (
        <Button
          variant="outline"
          className="w-full"
          onClick={onClose}
          disabled={loading}
        >
          {finalCancelText}
        </Button>
      )}
      <Button
        variant={confirmVariant}
        className="w-full"
        onClick={handleConfirm}
        loading={loading}
        disabled={loading}
      >
        {finalConfirmText}
      </Button>
    </div>
  );

  if (width <= mobileBreakpoint) {
    return (
      <MobileModal
        open={open}
        setOpen={onClose}
        title={finalTitle}
        className={clsx("flex flex-col", className)}
        renderFooter={renderFooter}
      >
        {children}
      </MobileModal>
    );
  }

  return (
    <Modal
      open={open}
      setIsOpen={onClose}
      className={clsx("max-w-[516px]", className)}
      withCross
    >
      <DialogTitle className="sr-only">{finalTitle}</DialogTitle>
      <DialogDescription className="sr-only">
        {finalTitle}
      </DialogDescription>
      
      <div className="text-[20px] font-bold mb-4">{finalTitle}</div>
      
      {children && (
        <div className="mb-4">
          {children}
        </div>
      )}
      
      <div className={clsx(
        "flex items-center mt-4",
        showCancelButton ? "gap-[12px]" : "justify-center"
      )}>
        {showCancelButton && (
          <Button
            variant="outline"
            className="w-full"
            onClick={onClose}
            disabled={loading}
            size="lg"
          >
            {finalCancelText}
          </Button>
        )}
        <Button
          variant={confirmVariant}
          className="w-full"
          size="lg"
          onClick={handleConfirm}
          loading={loading}
          disabled={loading}
        >
          {finalConfirmText}
        </Button>
      </div>
    </Modal>
  );
}; 
import {
  FormProvider,
  useForm,
  UseFormProps,
  FieldValues,
} from "react-hook-form";
import { Modal } from "src/components/ui/dialog";
import { DialogTitle, DialogDescription } from "@radix-ui/react-dialog";
import { MobileModal } from "src/components/ui/mobile-modal";
import { Button } from "src/components/ui/button/button";
import { useWindowSize } from "usehooks-ts";
import React from "react";
import { useWithdrawModalStore } from "../useWithdrawModalStore";
import { PaymentMethodType } from "src/types/base";

interface WithdrawMethodModalFormProps<T extends FieldValues> {
  modalType: PaymentMethodType;
  useFormProps: UseFormProps<T>;
  icon?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  onSubmit: (data: T) => void;
  submitText: string;
  loading?: boolean;
  children: React.ReactNode;
}

export function WithdrawMethodModalForm<T extends FieldValues>({
  modalType,
  useFormProps,
  icon,
  title,
  description,
  onSubmit,
  submitText,
  loading,
  children,
}: WithdrawMethodModalFormProps<T>) {
  const { width } = useWindowSize();
  const { isModalOpen, closeModal } = useWithdrawModalStore();
  const methods = useForm<T>(useFormProps);
  
  const open = isModalOpen(modalType);
  const setIsOpen = (isOpen: boolean) => {
    if (!isOpen) {
      closeModal();
    }
  };

  const content = (
    <>
      {width > 700 && (
        <div className="flex items-center gap-[6px]">
          {icon}
          <DialogTitle className="text-[20px] font-bold">{title}</DialogTitle>
        </div>
      )}
      {description && (
        <DialogDescription className="sr-only">{description}</DialogDescription>
      )}
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="flex flex-col gap-[24px]"
      >
        {children}
        {width > 700 && (
          <Button
            type="submit"
            className="w-full"
            disabled={loading}
            loading={loading}
          >
            {submitText}
          </Button>
        )}
      </form>
    </>
  );

  if (width > 700) {
    return (
      <Modal open={open} setIsOpen={setIsOpen} className="" withCross>
        <FormProvider {...methods}>{content}</FormProvider>
      </Modal>
    );
  }
  return (
    <MobileModal
      open={open}
      setOpen={setIsOpen}
      title={
        <div className="flex items-center gap-[6px]">
          {icon}
          <DialogTitle className="text-[20px] font-bold">{title}</DialogTitle>
        </div>
      }
      renderFooter={() => (
        <Button
          onClick={methods.handleSubmit(onSubmit)}
          className="w-full"
          disabled={loading}
          loading={loading}
        >
          {submitText}
        </Button>
      )}
      drawerClassName="z-[50]"
    >
      <FormProvider {...methods}>{content}</FormProvider>
    </MobileModal>
  );
}

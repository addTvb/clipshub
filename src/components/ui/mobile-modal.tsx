import type { ReactNode } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "./drawer";
import Image from "next/image";
import clsx from "clsx";

interface IProps {
  open: boolean;
  children: ReactNode;
  title: string | ReactNode;
  className?: string;
  drawerClassName?: string;
  setOpen: (open: boolean) => void;
  renderFooter?: () => ReactNode;
}

export const MobileModal = ({
  open,
  children,
  title,
  className,
  drawerClassName,
  setOpen,
  renderFooter,
}: IProps) => {
  const handleClose = () => setOpen(false);

  return (
    <Drawer open={open} onClose={handleClose}>
      <DrawerContent className={clsx("h-[85svh] flex flex-col", drawerClassName)}>
        <DrawerHeader className="flex-shrink-0 px-[10px] mb-[24px]">
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerClose className="p-[12px]">
            <Image
              src="/static/icons/cross.svg"
              alt=""
              width={24}
              height={24}
              className="p-[7px]"
            />
          </DrawerClose>
        </DrawerHeader>

        <div 
          className={clsx(
            "flex-1 overflow-y-auto px-[10px] pr-[12px] mobile-modal-scrollbar", 
            renderFooter ? "mb-[80px]" : "mb-[24px]",
            className
          )}
          style={{ 
            maxHeight: renderFooter 
              ? "calc(85svh - 120px)" // Высота экрана минус header (60px) и footer (60px)
              : "calc(85svh - 80px)"  // Высота экрана минус header (60px) и отступ (20px)
          }}
        >
          {children}
        </div>

        {renderFooter ? (
          <div className="absolute bottom-0 left-0 right-0 bg-white px-[10px] py-[20px] border-t border-gray-100">
            <DrawerFooter className="p-0">{renderFooter()}</DrawerFooter>
          </div>
        ) : null}
      </DrawerContent>
    </Drawer>
  );
};

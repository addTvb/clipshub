import React from "react";
import { NotificationsList } from "./NotificationsList";
import { MobileDrawer } from "../../components/ui/mobile-drawer";

interface IProps {
  open: boolean;
  onClose: () => void;
  bottomOffset?: number;
}

export const NotificationDrawer: React.FC<IProps> = ({
  open,
  onClose,
  bottomOffset = 56,
}) => {
  return (
    <MobileDrawer
      open={open}
      onClose={onClose}
      bottomOffset={bottomOffset}
      className="pt-[10px] px-[2px] bg-white"
      zIndex={50}
    >
      <NotificationsList className="max-h-[70vh]" />
    </MobileDrawer>
  );
};

export default NotificationDrawer;

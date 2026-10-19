import React from "react";
import { NotificationsList } from "./NotificationsList";
import clsx from "clsx";

interface IProps {
  className?: string;
}

export const NotificationModal: React.FC<IProps> = ({ 
  className, 
}) => {
  return (
    <div className={clsx("max-w-[440px] w-full rounded-[12px] overflow-hidden", className)}>
      <NotificationsList />
    </div>
  );
};

export default NotificationModal;

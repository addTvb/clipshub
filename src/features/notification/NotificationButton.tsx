import React from "react";
import NotificationIcon from "@icons/notification-icon.svg";
import clsx from "clsx";
import { useNotificationsCount } from "src/hooks/useNotifications";

interface IProps {
  className?: string;
  onClick?: () => void;
}

export const NotificationButton: React.FC<IProps> = ({
  className,
  onClick,
}) => {
  const { unreadCount } = useNotificationsCount();

  return (
    <span
      onClick={onClick}
      className={clsx(
        "relative p-2 text-gray-400 hover:text-gray-600 transition-colors",
        className
      )}
      aria-label="Notifications"
    >
      <NotificationIcon className="w-8 h-8" />
      {unreadCount > 0 && (
        <span className="absolute left-[18px] top-[1px] text-white text-[11px] leading-[14px] font-bold bg-dark100 rounded-[5px] px-[3px]">
          {unreadCount > 99 ? "99+" : unreadCount}
        </span>
      )}
    </span>
  );
};

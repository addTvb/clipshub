import Image from "next/image";
import { useCallback } from "react";
import NotificationUnreadIcon from "@public/static/icons/notification-unread-icon.svg";
import NotificationLinkIcon from "@public/static/icons/notification-link-icon.svg";
import { Notification, NotificationType } from "src/types/notifications";
import { formatSmartDate } from "src/lib/date/formatSmartDate";
import { useTranslations } from "next-intl";
import SocialMediaIcon from "src/components/ui/social-media-icon";
import clsx from "clsx";
import DOMPurify from "isomorphic-dompurify";

// Статичные иконки для разных типов уведомлений
const getStaticIcon = (type: NotificationType): string | null => {
  const iconMap: Partial<Record<NotificationType, string>> = {
    influencer_daily_stats: "/static/images/stats/eye-purple.svg",
    new_referral: "/static/images/stats/man-green-cash.svg",
    withdrawal_approved: "/static/images/stats/widthdraw-approve.svg",
    withdrawal_rejected: "/static/images/stats/widthdraw-approve.svg",
    funds_added: "/static/images/stats/funds-added.svg",
    campaign_daily_stats: "/static/images/stats/eye-purple.svg",
    campaign_balance_low: "/static/images/stats/top-up-balance.svg",
    offer_milestone_reached: "/static/images/stats/eye-purple.svg",
    influencer_welcome_bonus_earned: "/static/images/reward-notification.svg",
  };

  return iconMap[type] || null;
};

// Проверяем, является ли тип связанным с медиаканалами
const isMediaChannelType = (type: NotificationType): boolean => {
  return type.includes("mediachannel");
};

export const NotificationItem = ({
  notification,
  onClick,
  onElementRef,
}: {
  notification: Notification;
  onClick?: () => void;
  onElementRef?: (element: HTMLElement | null) => void;
}) => {
  const t = useTranslations();

  // Callback ref для регистрации элемента
  const setElementRef = useCallback(
    (element: HTMLElement | null) => {
      if (onElementRef) {
        onElementRef(element);
      }
    },
    [onElementRef]
  );

  const Wrapper = notification.redirect_link ? "a" : "div";
  const wrapperProps = notification.redirect_link
    ? {
        href: notification.redirect_link,
        rel: "noopener noreferrer",
        onClick: onClick,
      }
    : {};

  const getBgColor = () => {
    if (notification.read_at) return "bg-transparent";
    if (notification.type?.includes("rejected")) return "bg-[#FFFBFB]";
    if (notification.type?.includes("approved")) return "bg-[#F8FCFF]";
    return "bg-[#F8FCFF]";
  };

  // Определяем какую картинку показывать
  const renderPrimaryPicture = () => {
    // Если есть оригинальная картинка, показываем её
    if (notification?.primary_picture?.link) {
      return (
        <Image
          src={notification.primary_picture.link}
          alt="avatar"
          width={40}
          height={40}
          className="w-full h-full object-cover"
        />
      );
    }

    // Для медиаканалов показываем иконку социальной сети
    if (
      isMediaChannelType(notification.type) &&
      notification.mediachannel_type
    ) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-rgba(184, 184, 184, 0.20)">
          <SocialMediaIcon
            socialPlatform={notification.mediachannel_type}
            className="w-6 h-6"
          />
        </div>
      );
    }

    // Для остальных типов показываем статичную иконку
    const staticIcon = getStaticIcon(notification.type);
    if (staticIcon) {
      return (
        <Image
          src={staticIcon}
          alt="notification icon"
          width={40}
          height={40}
          className="w-10 h-10"
        />
      );
    }

    // Fallback - пустая картинка
    return null;
  };

  return (
    <Wrapper
      ref={setElementRef}
      className={clsx(
        "px-4 py-3 flex items-center justify-between gap-[24px] border-b border-[#EBF0F8] border-solid group",
        getBgColor()
      )}
      {...wrapperProps}
    >
      <div className="flex items-center gap-[10px]">
        <div className="size-[40px] flex-shrink-0 rounded-[8px] overflow-hidden bg-[#EBF0F8] flex items-center justify-center">
          {renderPrimaryPicture()}
        </div>
        <div>
          <div className="leading-[20px]">
            {notification?.secondary_picture?.link && (
              <Image
                className="size-[20px] border border-gray700 border-solid rounded-full inline mr-1"
                src={notification?.secondary_picture?.link}
                alt="avatar"
                width={20}
                height={20}
              />
            )}
            <div
              className="inline leading-[13px] text-[13px] font-[Inter] font-[500] [&_b]:font-[600]"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(notification.content),
              }}
            />
          </div>
          <div className="text-[12px] font-[Inter] font-[400] text-gray550 [&_b]:font-[600]">
            {formatSmartDate(notification.created_at, t)} •{" "}
            <span
              className="underline"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(notification.title),
              }}
            ></span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-[24px]">
        <div className="relative w-8 h-8 flex items-center justify-center">
          {!notification.read_at ? (
            <span className="absolute inset-0 flex items-center justify-center transition-opacity duration-200 group-hover:opacity-0">
              <NotificationUnreadIcon />
            </span>
          ) : null}
          {notification.redirect_link && (
            <span className="absolute inset-0 flex items-center justify-center transition-opacity duration-200 group-hover:opacity-100 opacity-0">
              <NotificationLinkIcon />
            </span>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default NotificationItem;

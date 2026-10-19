import React, { useEffect, useRef, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Button } from "src/components/ui/button/button";
import { NotificationItem } from "./NotificationItem";
import { useNotificationsContext } from "src/contexts/NotificationsContext";
import clsx from "clsx";

interface IProps {
  className?: string;
}

function NotificationSkeleton() {
  return (
    <div className="flex items-center gap-[10px] w-full px-4 py-3 border-b border-b-[#EBF0F8]">
      <div className="size-[40px] bg-[#EBF0F8] rounded-[8px] flex-shrink-0 animate-pulse"></div>
      <div className="flex flex-col gap-[6px] w-full">
        <div className="h-[20px] w-full bg-[#EBF0F8] rounded-[6px] animate-pulse"></div>
        <div className="w-[84px] h-[12px] bg-[#EBF0F8] rounded-[4px] animate-pulse"></div>
      </div>
    </div>
  );
}

export const NotificationsList: React.FC<IProps> = ({ 
  className, 
}) => {
  const t = useTranslations();
  const {
    notifications,
    unreadCount,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    loadMore,
    markAllAsRead,
    trackDisplayedNotification,
    cleanup,
    isMarkingAllAsRead
  } = useNotificationsContext();

  const containerRef = useRef<HTMLDivElement>(null);
  const loadMoreTriggerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer для автоматической подгрузки
  useEffect(() => {
    const trigger = loadMoreTriggerRef.current;
    if (!trigger || !hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      {
        root: containerRef.current,
        rootMargin: "100px",
        threshold: 0.1,
      }
    );

    observer.observe(trigger);

    return () => {
      observer.unobserve(trigger);
      observer.disconnect();
    };
  }, [hasNextPage, isFetchingNextPage, loadMore]);

  // Intersection Observer для отслеживания видимых уведомлений
  const observerRef = useRef<IntersectionObserver | null>(null);
  const notificationElementsRef = useRef<Map<number, HTMLElement>>(new Map());

  // Создаем observer для отслеживания видимости уведомлений
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const notificationId = parseInt(entry.target.getAttribute('data-notification-id') || '0');
            if (notificationId) {
              trackDisplayedNotification(notificationId);
            }
          }
        });
      },
      {
        root: containerRef.current,
        rootMargin: '0px',
        threshold: 0.5, // 50% элемента должно быть видно
      }
    );

    // Начинаем наблюдать за всеми уже зарегистрированными элементами
    notificationElementsRef.current.forEach((element) => {
      observerRef.current?.observe(element);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [trackDisplayedNotification]);

  // Callback для регистрации элементов уведомлений
  const registerNotificationElement = useCallback((notificationId: number, element: HTMLElement | null) => {
    // Удаляем старый элемент из наблюдения
    const oldElement = notificationElementsRef.current.get(notificationId);
    if (oldElement) {
      if (observerRef.current) {
        observerRef.current.unobserve(oldElement);
      }
    }

    if (element) {
      // Добавляем новый элемент в карту сразу
      element.setAttribute('data-notification-id', notificationId.toString());
      notificationElementsRef.current.set(notificationId, element);
      
      // Если observer готов, сразу наблюдаем за элементом
      if (observerRef.current) {
        observerRef.current.observe(element);
      }
    } else {
      // Удаляем элемент из карты если element = null
      notificationElementsRef.current.delete(notificationId);
    }
  }, []);

  // Храним актуальную ссылку на cleanup функцию
  const cleanupRef = useRef(cleanup);
  cleanupRef.current = cleanup;

  // Cleanup при размонтировании (стабильный)
  useEffect(() => {
    return () => {
      cleanupRef.current();
    };
  }, []); // Пустые dependencies - cleanup вызывается только при размонтировании!



  return (
    <div className={clsx("bg-white flex flex-col", className)}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-[#EBF0F8]">
        <h2 className="font-bold text-[16px] leading-[1.375em] text-[#090C10]">
          {t("notification.activity")}
        </h2>
        {unreadCount > 0 && (
          <Button
            onClick={markAllAsRead}
            variant="text"
            size="sm"
            disabled={isMarkingAllAsRead}
            className="text-[#090C10] font-medium text-[13px] px-2 py-1 h-auto min-h-0 underline disabled:opacity-50"
          >
            {isMarkingAllAsRead 
              ? t("notification.marking") 
              : t("notification.markAllAsRead")
            }
          </Button>
        )}
      </div>

      {/* Notifications List */}
      <div
        ref={containerRef}
        className="flex flex-col overflow-y-auto flex-1"
        style={{ maxHeight: 'min(600px, calc(100vh - 200px))' }}
      >
        {/* Initial Loading */}
        {isLoading && notifications.length === 0 && (
          <div className="flex flex-col">
            {Array.from({ length: 5 }).map((_, idx) => (
              <NotificationSkeleton key={`initial-skeleton-${idx}`} />
            ))}
          </div>
        )}

        {/* Notifications */}
        {notifications.map((notification) => (
          <NotificationItem 
            key={notification.id} 
            notification={notification}
            onElementRef={(element: HTMLElement | null) => registerNotificationElement(notification.id, element)}
          />
        ))}

        {/* Load More Trigger */}
        {hasNextPage && notifications.length > 0 && (
          <div ref={loadMoreTriggerRef} className="h-4" />
        )}

        {/* Loading More */}
        {isFetchingNextPage && (
          <div className="flex flex-col">
            {Array.from({ length: 3 }).map((_, idx) => (
              <NotificationSkeleton key={`loading-skeleton-${idx}`} />
            ))}
          </div>
        )}

        {/* End Messages */}
        {!hasNextPage && notifications.length > 0 && (
          <div className="text-center py-4 text-gray-400 text-sm">
            {t("notification.allLoaded")}
          </div>
        )}

        {!isLoading && notifications.length === 0 && (
          <div className="text-center py-12 text-gray-400 text-sm">
            {t("notification.noNotifications")}
          </div>
        )}
      </div>
    </div>
  );
}; 
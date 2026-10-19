import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import { getNotifications, readNotifications, readAllNotifications } from "src/api/notification";
import { queryKeys } from "src/config/queryKeys";
import { mutationKeys } from "src/config/mutationKeys";
import { useAuthStore } from "src/store/auth";
import type { Notification, ReadNotificationRequest, GetNotificationsResponse } from "src/types/notifications";

const NOTIFICATIONS_LIMIT = 10;

// Глобальное хранилище для отслеживания показанных уведомлений
const globalDisplayedNotificationIds = new Set<number>();
let isGlobalCleanupProcessing = false;

/**
 * Легкий хук для получения только счетчика непрочитанных уведомлений
 * Используется для фонового обновления и отображения badges
 */
export const useNotificationsCount = () => {
  const { isAuthenticated } = useAuthStore();
  
  const { data, isLoading, error } = useInfiniteQuery<GetNotificationsResponse, Error>({
    queryKey: queryKeys.notifications.getNotificationsCount,
    queryFn: ({ pageParam }) => 
      getNotifications({ limit: 1, offset: pageParam as number }), // Минимальный запрос
    getNextPageParam: () => undefined, // Не загружаем дополнительные страницы
    initialPageParam: 0,
    enabled: isAuthenticated,
    refetchInterval: 30000, // Частые обновления для счетчика
    refetchIntervalInBackground: true, // Продолжаем в фоне
    refetchOnWindowFocus: true, // При возврате в окно
    staleTime: 25000, // Считаем свежими 25 секунд
  });

  const unreadCount = data?.pages?.[0]?.unreads_count ?? 0;

  return {
    unreadCount,
    isLoading,
    error,
  };
};

/**
 * Полноценный хук для списка уведомлений с пагинацией
 * Используется только когда открыт список уведомлений
 */
export const useNotificationsList = () => {
  const { isAuthenticated } = useAuthStore();
  const queryClient = useQueryClient();
  
  // Infinite query для списка уведомлений
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
    refetch
  } = useInfiniteQuery<GetNotificationsResponse, Error>({
    queryKey: queryKeys.notifications.getNotificationsList,
    queryFn: ({ pageParam }) => 
      getNotifications({ limit: NOTIFICATIONS_LIMIT, offset: pageParam as number }),
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.has_more) return undefined;
      return allPages.length * NOTIFICATIONS_LIMIT;
    },
    initialPageParam: 0,
    enabled: isAuthenticated,
    // Убираем автономный таймер - список обновляется только при изменении счетчика или действиях пользователя
    refetchOnWindowFocus: true, // Обновляем при возврате в окно
    staleTime: 300000, // Данные свежие 5 минут (поскольку обновляем вручную)
  });

  // Мутация для отметки уведомлений как прочитанных
  const markAsReadMutation = useMutation({
    mutationKey: mutationKeys.notifications.readNotifications,
    mutationFn: (data: ReadNotificationRequest) => readNotifications(data),
    onSuccess: () => {
      // Инвалидируем оба кеша при изменении статуса
      queryClient.invalidateQueries({ 
        queryKey: queryKeys.notifications.getNotificationsList 
      });
      queryClient.invalidateQueries({ 
        queryKey: queryKeys.notifications.getNotificationsCount 
      });
    },
  });

  // Мутация для отметки всех уведомлений как прочитанных
  const markAllAsReadMutation = useMutation({
    mutationKey: mutationKeys.notifications.readAllNotifications,
    mutationFn: readAllNotifications,
    onSuccess: () => {
      // Инвалидируем оба кеша при изменении статуса
      queryClient.invalidateQueries({ 
        queryKey: queryKeys.notifications.getNotificationsList 
      });
      queryClient.invalidateQueries({ 
        queryKey: queryKeys.notifications.getNotificationsCount 
      });
      globalDisplayedNotificationIds.clear();
    },
  });

  // Получаем плоский список всех уведомлений
  const notifications: Notification[] = useMemo(() => 
    data?.pages?.flatMap(page => page.list) ?? [], 
    [data?.pages]
  );
  
  const unreadCount = data?.pages?.[0]?.unreads_count ?? 0;

  // Функция для отслеживания показанных уведомлений
  const trackDisplayedNotification = useCallback((notificationId: number) => {
    globalDisplayedNotificationIds.add(notificationId);
  }, []);

  // Функция для отметки всех показанных уведомлений как прочитанных
  const markDisplayedAsRead = useCallback(() => {
    if (isGlobalCleanupProcessing) {
      return;
    }

    const idsArray = Array.from(globalDisplayedNotificationIds);
    
    if (idsArray.length === 0) {
      return;
    }

    isGlobalCleanupProcessing = true;

    // Фильтруем только непрочитанные уведомления
    const idsToMarkAsRead = idsArray.filter(id => {
      const notification = notifications.find((n: Notification) => n.id === id);
      return notification && !notification.read_at;
    });
    
    if (idsToMarkAsRead.length > 0) {
      markAsReadMutation.mutate({ notify_ids: idsToMarkAsRead });
    }
    
    globalDisplayedNotificationIds.clear();
    
    setTimeout(() => {
      isGlobalCleanupProcessing = false;
    }, 100);
  }, [notifications, markAsReadMutation]);

  // Функция для отметки всех как прочитанных
  const markAllAsRead = useCallback(() => {
    if (unreadCount > 0) {
      markAllAsReadMutation.mutate();
    }
  }, [unreadCount, markAllAsReadMutation]);

  // Функция для загрузки следующей страницы
  const loadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Cleanup функция для вызова при размонтировании
  const cleanup = useCallback(() => {
    markDisplayedAsRead();
  }, [markDisplayedAsRead]);

  return {
    // Данные
    notifications,
    unreadCount,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    error,
    
    // Действия
    loadMore,
    markAllAsRead,
    trackDisplayedNotification,
    cleanup,
    refetch,
    
    // Состояния мутаций
    isMarkingAsRead: markAsReadMutation.isPending,
    isMarkingAllAsRead: markAllAsReadMutation.isPending,
  };
}; 
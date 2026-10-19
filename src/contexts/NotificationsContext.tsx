"use client";

import React, { createContext, useContext, ReactNode, useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { 
  useNotificationsCount as useNotificationsCountOptimized, 
  useNotificationsList 
} from "src/hooks/useNotifications";
import { useAuthStore } from "src/store/auth";
import { queryKeys } from "src/config/queryKeys";
import type { Notification } from "src/types/notifications";

// Типы для контекста
interface NotificationsContextType {
  // Данные
  notifications: Notification[];
  unreadCount: number;
  hasNextPage: boolean;
  isLoading: boolean;
  isFetchingNextPage: boolean;
  error: Error | null;
  
  // Действия
  loadMore: () => void;
  markAllAsRead: () => void;
  trackDisplayedNotification: (id: number) => void;
  cleanup: () => void;
  refetch: () => Promise<unknown>;
  
  // Состояния мутаций
  isMarkingAsRead: boolean;
  isMarkingAllAsRead: boolean;
}

// Создаем контекст
const NotificationsContext = createContext<NotificationsContextType | null>(null);

// Провайдер уведомлений
interface NotificationsProviderProps {
  children: ReactNode;
}

export const NotificationsProvider: React.FC<NotificationsProviderProps> = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  const queryClient = useQueryClient();
  
  // Используем оптимизированные хуки
  const countData = useNotificationsCountOptimized(); // Легкий хук для счетчика (всегда активен)
  const listData = useNotificationsList(); // Полный хук для списка (активен только при необходимости)
  
  // Отслеживаем изменения счетчика для синхронизации со списком
  const prevUnreadCountRef = useRef<number | undefined>(undefined);
  
  useEffect(() => {
    if (!isAuthenticated) return;
    
    const currentUnreadCount = countData.unreadCount;
    const prevUnreadCount = prevUnreadCountRef.current;
    
    // Если это не первый рендер и счетчик изменился
    if (prevUnreadCount !== undefined && prevUnreadCount !== currentUnreadCount) {
      
      // Если появились новые уведомления (счетчик увеличился) - инвалидируем список
      if (currentUnreadCount > prevUnreadCount) {
        queryClient.invalidateQueries({ 
          queryKey: queryKeys.notifications.getNotificationsList 
        });
      }
    }
    
    // Сохраняем текущее значение для следующего сравнения
    prevUnreadCountRef.current = currentUnreadCount;
  }, [countData.unreadCount, isAuthenticated, queryClient]);
  
  // Если пользователь не аутентифицирован, предоставляем пустые данные
  const contextValue: NotificationsContextType = isAuthenticated ? {
    // Данные для счетчика берем из оптимизированного хука
    unreadCount: countData.unreadCount,
    // Остальные данные берем из полного хука
    notifications: listData.notifications,
    hasNextPage: listData.hasNextPage,
    isLoading: listData.isLoading,
    isFetchingNextPage: listData.isFetchingNextPage,
    error: listData.error || countData.error,
    // Действия из полного хука
    loadMore: listData.loadMore,
    markAllAsRead: listData.markAllAsRead,
    trackDisplayedNotification: listData.trackDisplayedNotification,
    cleanup: listData.cleanup,
    refetch: listData.refetch,
    // Состояния мутаций
    isMarkingAsRead: listData.isMarkingAsRead,
    isMarkingAllAsRead: listData.isMarkingAllAsRead,
  } : {
    notifications: [],
    unreadCount: 0,
    hasNextPage: false,
    isLoading: false,
    isFetchingNextPage: false,
    error: null,
    loadMore: () => {},
    markAllAsRead: () => {},
    trackDisplayedNotification: () => {},
    cleanup: () => {},
    refetch: async () => {},
    isMarkingAsRead: false,
    isMarkingAllAsRead: false,
  };

  return (
    <NotificationsContext.Provider value={contextValue}>
      {children}
    </NotificationsContext.Provider>
  );
};

// Хук для использования контекста уведомлений
export const useNotificationsContext = (): NotificationsContextType => {
  const context = useContext(NotificationsContext);
  
  if (!context) {
    throw new Error("useNotificationsContext must be used within NotificationsProvider");
  }
  
  return context;
};
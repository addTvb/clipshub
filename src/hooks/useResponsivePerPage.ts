import { useEffect, useState } from "react";

/**
 * Вычисляет количество элементов для 5 рядов на основе ширины экрана
 */
const calculatePerPage = (width: number): number => {
  // mobile (< 640): 3 колонки × 5 рядов = 15
  if (width < 640) return 15;
  // sm (640-876): 4 колонки × 5 рядов = 20
  if (width < 876) return 20;
  // md (876-1024): 5 колонок × 5 рядов = 25
  if (width < 1024) return 25;
  // lg (1024-1280): 6 колонок × 5 рядов = 30
  if (width < 1280) return 30;
  // xl (1280-1536): 7 колонок × 5 рядов = 35
  if (width < 1536) return 35;
  // 2xl (> 1536): 8 колонок × 5 рядов = 40
  return 40;
};

/**
 * Хук для динамического расчета per_page в зависимости от размера экрана
 * Всегда возвращает количество для 5 рядов
 * 
 * @returns {perPage: number, isReady: boolean} - perPage и флаг готовности (для предотвращения лишних запросов)
 */
export const useResponsivePerPage = () => {
  const [isClient, setIsClient] = useState(false);
  const [perPage, setPerPage] = useState(15); // Дефолт для SSR

  useEffect(() => {
    // Устанавливаем правильное значение сразу при монтировании на клиенте
    setPerPage(calculatePerPage(window.innerWidth));
    setIsClient(true);

    const handleResize = () => {
      setPerPage(calculatePerPage(window.innerWidth));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { perPage, isReady: isClient };
};


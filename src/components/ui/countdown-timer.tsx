import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  createdAt: string;
  duration: number; // Длительность в миллисекундах
  onComplete?: () => void; // Опциональный колбек по завершении таймера
  className?: string; // Опциональные стили
}

const CountdownTimer = ({ createdAt, duration, onComplete, className = '' }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState<string>("00:00:00");
  const [isExpired, setIsExpired] = useState<boolean>(false);
  
  useEffect(() => {
    const calculateTimeLeft = () => {
      const startTime = new Date(createdAt);
      const endTime = new Date(startTime.getTime() + duration);
      const now = new Date();
      
      // Проверяем, не истекло ли время
      if (now >= endTime) {
        if (!isExpired) {
          setIsExpired(true);
          if (onComplete) {
            onComplete();
          }
        }
        return "00:00:00";
      }
      
      // Вычисляем оставшееся время в миллисекундах
      const difference = endTime.getTime() - now.getTime();
      
      // Конвертируем в часы, минуты, секунды
      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      // Форматируем вывод
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };
    
    // Начальное вычисление времени
    const initialTimeLeft = calculateTimeLeft();
    setTimeLeft(initialTimeLeft);
    
    // Если уже истекло, не запускаем интервал
    if (isExpired) {
      return;
    }
    
    // Обновляем каждую секунду
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);
      
      if (newTimeLeft === "00:00:00") {
        clearInterval(timer);
      }
    }, 1000);
    
    return () => clearInterval(timer); // Очистка при размонтировании
  }, [createdAt, duration, onComplete, isExpired]);
  
  return <span className={className}>{timeLeft}</span>;
};

export default CountdownTimer; 
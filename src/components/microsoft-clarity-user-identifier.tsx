"use client";

import { useEffect, useState } from "react";
import { useMicrosoftClarity } from "src/hooks/useMicrosoftClarity";
import { useAuthStore } from "src/store/auth";
import { useGetUser } from "src/queries/useGetUser";

export default function MicrosoftClarityUserIdentifier() {
  const { isAuthenticated } = useAuthStore();
  const { user } = useGetUser();
  const { setUserId, setUserEmail, setUserType, identify } = useMicrosoftClarity();
  const [isProduction, setIsProduction] = useState<boolean>(false);

  useEffect(() => {
    // Проверяем, что мы в production среде
    const currentEnv = process.env.NEXT_PUBLIC_ENV;
    const isProd = currentEnv === "production";
    setIsProduction(isProd);
    
    if (!isProd) {
      return;
    }
    


    if (isAuthenticated && user) {
      // Устанавливаем базовую информацию о пользователе
      setUserId(user.id.toString());
      setUserEmail(user.email || "");
      setUserType(user.type || "user");

      // Или используем identify для более детальной информации
      identify(user.id.toString(), {
        email: user.email,
        name: user.name,
        surname: user.surname,
        type: user.type,
      });


    }
  }, [isAuthenticated, user, setUserId, setUserEmail, setUserType, identify]);

  // Не рендерим ничего, если не production среда
  if (!isProduction) {
    return null;
  }

  return null;
} 
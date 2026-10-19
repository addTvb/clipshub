"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";

const getInitialHash = (): string => {
  if (typeof window === "undefined") return "";
  const hashValue = window.location.hash.startsWith("#")
    ? window.location.hash.slice(1)
    : window.location.hash;
  return hashValue;
};

export const useHash = (): [string, (newHash: string) => void] => {
  const router = useRouter();
  const pathname = usePathname();
  const [hash, setHashState] = useState(getInitialHash);

  useEffect(() => {
    const update = () => {
      const hashValue = window.location.hash.startsWith("#")
        ? window.location.hash.slice(1)
        : window.location.hash;
      setHashState(hashValue);
    };
    // Слушаем изменения хеша (инициализация уже выполнена в useState)
    window.addEventListener("hashchange", update);

    return () => window.removeEventListener("hashchange", update);
  }, []);

  const setHash = useCallback(
    (newHash: string) => {
      const hashWithoutHash = newHash.startsWith("#")
        ? newHash.slice(1)
        : newHash;
      router.push(pathname + `#${hashWithoutHash}`);
      setHashState(hashWithoutHash);
    },
    [pathname, router]
  );

  return [hash, setHash];
}

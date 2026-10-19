"use client";

import clsx from "clsx";
import { useTranslations } from "next-intl";
import * as React from "react";

interface FormFieldErrorProps {
  visible: boolean;
  messageKey?: string | null;
  className?: string;
}

export const FormFieldError: React.FC<FormFieldErrorProps> = ({
  visible,
  messageKey,
  className,
}) => {
  const t = useTranslations();
  const [lastMessageKey, setLastMessageKey] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (visible && messageKey) {
      setLastMessageKey(messageKey);
    }
  }, [visible, messageKey]);

  return (
    <div
      className={clsx(
        "mt-1 grid transition-all",
        visible
          ? "duration-300 ease-out grid-rows-[1fr] opacity-100"
          : "duration-400 ease-in grid-rows-[0fr] opacity-0",
        className
      )}
      aria-hidden={!visible}
    >
      <p className="min-h-0 overflow-hidden text-red-500 text-sm font-[Inter] pl-1">
        {t((visible ? messageKey : lastMessageKey) || "")}
      </p>
    </div>
  );
};



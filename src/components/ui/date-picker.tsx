import * as React from "react";
import { useController, useFormContext } from "react-hook-form";
import { cn } from "src/lib/utils";
import CalendarIcon from "@icons/calendar.svg";
import { Popover, PopoverTrigger } from "src/components/ui/popover";
import { useTranslations } from "next-intl";
import dayjs from "dayjs";
import { createPortal } from "react-dom";
import dynamic from "next/dynamic";
import { Spinner } from "./spinner";

const Calendar = dynamic(
  () => import("src/components/ui/calendar").then((mod) => mod.Calendar),
  {
    ssr: false,
    loading: () => (
      <div className="w-[364px] h-[356px] flex items-center justify-center">
        <Spinner color="dark" />
      </div>
    ),
  }
);

interface DatePickerProps {
  name: string;
  placeholder?: string;
  inputClassName?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>(
  ({ name, placeholder, inputClassName, icon, disabled }) => {
    const t = useTranslations();
    const { control } = useFormContext();
    const {
      field: { value, onChange },
      fieldState: { invalid, error },
    } = useController({ name, control });

    const [open, setOpen] = React.useState(false);
    const [portalContainer, setPortalContainer] =
      React.useState<HTMLElement | null>(null);
    const dateValue = value ? new Date(value) : undefined;

    React.useEffect(() => {
      if (typeof document !== "undefined") {
        const container = document.createElement("div");
        container.style.position = "fixed";
        container.style.top = "0";
        container.style.left = "0";
        container.style.width = "100%";
        container.style.height = "100%";
        container.style.pointerEvents = "none";
        container.style.zIndex = "999999";
        document.body.appendChild(container);
        setPortalContainer(container);
        return () => {
          document.body.removeChild(container);
        };
      }
    }, []);

    const handleSelect = (date: Date | undefined) => {
      setOpen(false);
      if (date) {
        onChange(dayjs(date).format("YYYY-MM-DD"));
      } else {
        onChange("");
      }
    };

    return (
      <div className={cn("relative", inputClassName)}>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger
            type="button"
            disabled={disabled}
            className={cn(
              "flex w-full rounded-md border border-input bg-transparent p-[10px] text-textColor text-sm font-medium leading-tight placeholder:text-[#838d9b] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm text-left",
              invalid && error && "border-red-500",
              icon && "pl-[42px]",
              open && "outline-none shadow-inputShadow border-[#a8cad7]"
            )}
          >
            {icon ? (
              <span className="absolute top-[8px] left-[10px]">{icon}</span>
            ) : (
              <CalendarIcon className="absolute top-[8px] left-[10px] text-gray-400 size-[24px]" />
            )}
            <span className={cn("ml-[32px]", !dateValue && "text-[#838d9b]")}>
              {dateValue
                ? dayjs(dateValue).format("MMM D, YYYY")
                : placeholder || t("Pick a date")}
            </span>
          </PopoverTrigger>
          {portalContainer &&
            open &&
            createPortal(
              <div
                style={{
                  position: "fixed",
                  top: "0",
                  left: "0",
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  zIndex: 999999,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  pointerEvents: "auto",
                }}
                onClick={() => setOpen(false)}
              >
                <div
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    backgroundColor: "white",
                    padding: "1rem",
                    borderRadius: "0.5rem",
                    boxShadow:
                      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                    maxWidth: "90vw",
                    width: "auto",
                  }}
                >
                  <Calendar
                    mode="single"
                    selected={dateValue}
                    onSelect={handleSelect}
                    initialFocus
                    disabled={(date) => date > new Date()}
                  />
                </div>
              </div>,
              portalContainer
            )}
        </Popover>
        {invalid && error && (
          <p className="text-red-500 text-sm mt-1 font-[Inter]">{t(error.message)}</p>
        )}
      </div>
    );
  }
);
DatePicker.displayName = "DatePicker";

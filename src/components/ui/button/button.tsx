import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "src/lib/utils";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Spinner } from "../spinner";
import clsx from "clsx";
import "../link/link.css";
import "./button.css";
import { useTranslations } from "next-intl";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[6px] text-sm font-medium focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 disabled:cursor-pointer [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "text-primary-foreground btn-gradient-anim",
        outline:
          "border bg-white py-[11px] px-[12px] border-[#DFE3EA] rounded-[6px] text-textColor font-bold text-base hover:border-gray500 transition-border duration-300",
        icon: "text-center border border-[#DFE3EA] px-[12px] py-[10px] max-w-[113px] w-full rounded-sm hover:border-gray500",
        text: "bg-transparent transition-transform hover:scale-95",
        "underline-dark":
          "bg-transparent nav-underline nav-underline--dark px-0 py-0 h-auto min-h-0 rounded-none font-medium text-base",
        "underline-light":
          "bg-transparent nav-underline nav-underline--light px-0 py-0 h-auto min-h-0 rounded-none font-medium text-base",
        "danger": "btn-red-gradient text-white"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "",
        link: "w-fit",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  timer?: boolean;
  timerTitle?: string;
  timerSeconds?: number;
  timerActive?: boolean;
  href?: string;
  target?: string;
  loading?: boolean;
  icon?: React.ReactNode;
}

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      type = "button",
      onClick,
      timer = false,
      timerTitle,
      timerSeconds = 60,
      timerActive,
      href,
      loading,
      icon,
      ...props
    },
    ref
  ) => {
    const t = useTranslations("common");
    const [seconds, setSeconds] = useState(timerSeconds);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
      if (timerActive !== undefined) {
        setIsActive(timerActive);
        if (timerActive) {
          setSeconds(timerSeconds);
        }
      }
    }, [timerActive, timerSeconds]);

    useEffect(() => {
      let interval: NodeJS.Timeout;

      if (isActive && seconds > 0) {
        interval = setInterval(() => {
          setSeconds((s) => s - 1);
        }, 1000);
      } else if (seconds === 0 && isActive) {
        setIsActive(false);
        setSeconds(timerSeconds);
      }
      return () => clearInterval(interval);
    }, [isActive, seconds, timerSeconds]);

    const rippleContainerRef = React.useRef<HTMLDivElement>(null);

    const createRipple = React.useCallback((event: React.MouseEvent) => {
      const button = event.currentTarget as HTMLElement;
      const rect = button.getBoundingClientRect();
      const container = rippleContainerRef.current;

      if (!container) return;

      const circle = document.createElement("span");
      const diameter = Math.max(button.clientWidth, button.clientHeight);
      const radius = diameter / 2;

      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${event.clientX - rect.left - radius}px`;
      circle.style.top = `${event.clientY - rect.top - radius}px`;
      circle.classList.add("ripple-effect");

      circle.addEventListener("animationend", () => {
        circle.remove();
      });

      const existingRipples = container.getElementsByClassName("ripple-effect");
      while (existingRipples[0]) {
        existingRipples[0].remove();
      }

      container.appendChild(circle);
    }, []);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      createRipple(e);

      if (timer && !isActive && timerActive === undefined) {
        setIsActive(true);
        setSeconds(timerSeconds);
      }

      if (timer && isActive) {
        return;
      }
      onClick?.(e);
    };

    const renderChildrenWithLoading = () => (
      <span className="relative">
        <Spinner
          size="small"
          wrapperClassName={clsx(
            "absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] transition-opacity opacity-0",
            loading && "opacity-100"
          )}
        />
        <span
          className={clsx(
            "top-[-10px] transition-opacity flex items-center gap-[6px]",
            loading && "opacity-0"
          )}
        >
          {icon}
          {props.children}
        </span>
      </span>
    );

    if (href) {
      return (
        <Link
          href={href}
          className={cn(buttonVariants({ variant, size, className }))}
          onClick={onClick}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          {...(props as any)}
        >
          <div ref={rippleContainerRef} className="absolute inset-0 pointer-events-none overflow-hidden rounded-[6px]" />
          {timer && isActive ? (
            <>
              {timerTitle || t("resend")}
              <span className="ml-1">{formatTime(seconds)}</span>
            </>
          ) : (
            renderChildrenWithLoading()
          )}
        </Link>
      );
    }

    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        onClick={handleClick}
        type={type}
        disabled={timer && isActive}
        {...props}
      >
        <div ref={rippleContainerRef} className="absolute inset-0 pointer-events-none overflow-hidden rounded-[6px]" />
        {timer && isActive ? (
          <>
            {timerTitle || t("resend")}
            <span className="ml-1">{formatTime(seconds)}</span>
          </>
        ) : (
          renderChildrenWithLoading()
        )}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };

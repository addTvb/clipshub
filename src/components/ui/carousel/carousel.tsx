"use client";

import * as React from "react";
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";
import ArrowLeftIcon from '@icons/long-arrow-left-icon.svg'
import ArrowRightIcon from '@icons/long-arrow-right-icon.svg'
import { cn } from "src/lib/utils";
import { Button } from "src/components/ui/button/button";
import { useDotButton } from "./useDotButton";
import { useTranslations } from "next-intl";

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
  /**
   * `peek` — количество пикселей, которые будут видны слева/справа от центрального слайда.
   * Можно передать число (px) или строку (например "3rem").
   * По умолчанию — 0 (без peek).
   */
  peek?: number | string;
};

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }

  return context;
}

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      orientation = "horizontal",
      opts,
      setApi,
      plugins,
      className,
      children,
      peek = 0,
      ...props
    },
    ref
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins
    );
    const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(api);

    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);

    const onSelect = React.useCallback((api: CarouselApi) => {
      if (!api) {
        return;
      }

      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    }, []);

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev();
    }, [api]);

    const scrollNext = React.useCallback(() => {
      api?.scrollNext();
    }, [api]);

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          scrollPrev();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          scrollNext();
        }
      },
      [scrollPrev, scrollNext]
    );

    React.useEffect(() => {
      if (!api || !setApi) {
        return;
      }

      setApi(api);
    }, [api, setApi]);

    React.useEffect(() => {
      if (!api) {
        return;
      }

      onSelect(api);
      api.on("reInit", onSelect);
      api.on("select", onSelect);

      return () => {
        api?.off("select", onSelect);
      };
    }, [api, onSelect]);

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api: api,
          opts,
          orientation:
            orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
          peek,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn("relative", className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
        <div className="flex items-center justify-center mt-[12px]">
          {scrollSnaps.map((_, index) => (
            <CarouselDot
              key={`carousel-dot-${index}`}
              onClick={() => onDotButtonClick(index)}
              isSelected={index === selectedIndex}
            />
          ))}
        </div>
      </CarouselContext.Provider>
    );
  }
);
Carousel.displayName = "Carousel";

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, style, ...props }, ref) => {
  const { carouselRef, orientation, peek } = useCarousel();

  // нормализуем peek в строку типа "12px"
  const peekStr =
    typeof peek === "number" ? `${peek}px` : typeof peek === "string" ? peek : "0px";

  return (
    <div
      ref={carouselRef}
      className="overflow-hidden"
      // padding viewport чтобы слева/справа были видны "peeks"
      style={{
        paddingLeft: peekStr,
        paddingRight: peekStr,
        ...style,
      }}
    >
      <div
        ref={ref}
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className
        )}
        {...props}
      />
    </div>
  );
});
CarouselContent.displayName = "CarouselContent";

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, style, ...props }, ref) => {
  const { orientation, peek } = useCarousel();

  // вычисляем basis: calc(100% - 2 * peek)
  const doublePeek =
    typeof peek === "number" ? `${peek * 2}px` : peek ? `calc(${peek} * 2)` : "0px";
  const basis = `calc(100% - ${doublePeek})`;

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        "min-w-0 shrink-0 grow-0",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      )}
      // задаём flex-basis через inline style чтобы переопределить "basis-full"
      style={{
        flex: `0 0 ${basis}`,
        ...style,
      }}
      {...props}
    />
  );
});
CarouselItem.displayName = "CarouselItem";

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const t = useTranslations('common')
  const { scrollPrev, canScrollPrev } = useCarousel();

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute h-[36px] w-[36px] rounded-[12px] p-[6px] -top-[45px] right-[45px]",
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeftIcon className="text-[16px]" />
      <span className="sr-only">{t('previousSlide')}</span>
    </Button>
  );
});
CarouselPrevious.displayName = "CarouselPrevious";

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const t = useTranslations('common')
  const { scrollNext, canScrollNext } = useCarousel();

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute h-[36px] w-[36px] rounded-[12px] p-[6px] -top-[45px] right-0",
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRightIcon className="text-[24px]" />
      <span className="sr-only">{t('nextSlide')}</span>
    </Button>
  );
});
CarouselNext.displayName = "CarouselNext";

interface DotProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isSelected: boolean;
}

const CarouselDot = React.forwardRef<HTMLButtonElement, DotProps>(
  ({ isSelected, ...props }, ref) => {
    return (
      <button
        ref={ref}
        role="group"
        aria-roledescription="slide"
        className={cn(
          "min-w-[14px] mx-[2px] min-h-[5px] rounded-[6px] bg-blue75 transition-all",
          isSelected && "min-w-[20px] bg-blue300"
        )}
        {...props}
      />
    );
  }
);
CarouselDot.displayName = "CarouselDot";

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
};

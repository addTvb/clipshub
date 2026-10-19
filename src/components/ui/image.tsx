"use client";

import clsx from "clsx";
import Image from "next/image";
import { ChangeEvent, ImgHTMLAttributes, useState } from "react";

interface IProps extends ImgHTMLAttributes<HTMLImageElement> {
  width: number;
  height: number;
  alt?: string;
  src?: string;
  className?: string;
  //   avatar?: boolean;
  onClick?: () => void;
  imagePlaceholder?: boolean;
  priority?: boolean;
}

export const CHImage = ({
  height,
  src,
  width,
  alt,
  className,
  //   avatar = false,
  style,
  onClick,
  imagePlaceholder,
  priority,
  ...rest
}: IProps) => {
  const [isError, setError] = useState(false);

  if (isError || !src) {
    return (
      <div
        className={clsx(
          "flex items-center justify-center overflow-hidden",
          className
        )}
        style={{
          width: width,
          height: height,
        }}
        {...rest}
      >
        {imagePlaceholder ? (
          <Image
            style={{
              objectFit: "cover",
              borderRadius: "10px",
              width: "100%",
              height: "100%",
              ...style,
            }}
            src="/static/images/fallback.png"
            width={width}
            height={height}
            alt={alt || ""}
          />
        ) : (
          <div
            style={{
              width: width,
              height: height,
            }}
            className="flex items-center justify-center text-sm text-gray400 bg-gray100 rounded-full"
          >
            {alt}
          </div>
        )}
      </div>
    );
  }
  return (
    <Image
      style={{ objectFit: "cover", ...style }}
      src={src}
      width={width}
      height={height}
      alt={alt || ""}
      onError={() => setError(true)}
      onLoad={(e: ChangeEvent<HTMLImageElement>) => {
        if (e.target.naturalWidth === 0) setError(true);
      }}
      className={className}
      onClick={onClick}
      priority={priority}
    />
  );
};

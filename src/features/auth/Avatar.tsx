"use client";

import clsx from "clsx";
import Image, { ImageProps } from "next/image";
import React from "react";

const DEFAULT_AVATARS = [
  "/static/images/avatars/default-avatar-blue.webp",
  "/static/images/avatars/default-avatar-green.webp",
  "/static/images/avatars/default-avatar-pink.webp",
  "/static/images/avatars/default-avatar-yellow.webp",
];

function pickDefaultAvatar(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash += seed.charCodeAt(i);
  }
  const idx = Math.abs(hash) % DEFAULT_AVATARS.length;
  return DEFAULT_AVATARS[idx];
}

type AvatarProps = Omit<ImageProps, "src" | "alt"> & {
  src?: string;
  alt?: string;
  userID?: string | number;
  width?: number;
  height?: number;
};

export function Avatar({
  src,
  userID,
  alt,
  width,
  height,
  className,
  onError,
  ...props
}: AvatarProps) {
  const hasUserId =
    userID !== undefined && userID !== null && String(userID) !== "";

  const fallbackSeed = React.useMemo(() => {
    if (hasUserId) {
      return String(userID);
    }
    return src ?? "";
  }, [hasUserId, src, userID]);

  const defaultAvatarSrc = React.useMemo(() => {
    return fallbackSeed ? pickDefaultAvatar(fallbackSeed) : null;
  }, [fallbackSeed]);

  const resolvedSrc = React.useMemo(() => {
    if (src) {
      return src;
    }
    if (hasUserId && defaultAvatarSrc) {
      return defaultAvatarSrc;
    }
    return null;
  }, [defaultAvatarSrc, hasUserId, src]);

  const [currentSrc, setCurrentSrc] = React.useState<string | null>(resolvedSrc);

  React.useEffect(() => {
    setCurrentSrc(resolvedSrc);
  }, [resolvedSrc]);

  const safeWidth = width ?? 48;
  const safeHeight = height ?? 48;

  const handleError = React.useCallback(
    (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
      setCurrentSrc((prev) => {
        if (defaultAvatarSrc && prev !== defaultAvatarSrc) {
          return defaultAvatarSrc;
        }
        return null;
      });
      onError?.(event);
    },
    [defaultAvatarSrc, onError]
  );

  if (!currentSrc) {
    return (
      <div
        style={{ width: safeWidth, height: safeHeight }}
        className={clsx(
          "rounded-full bg-gray200 flex items-center justify-center",
          className
        )}
      />
    );
  }

  return (
    <Image
      src={currentSrc}
      alt={alt ?? ""}
      width={safeWidth}
      height={safeHeight}
      onError={handleError}
      {...props}
      className={clsx("rounded-full", className)}
    />
  );
}

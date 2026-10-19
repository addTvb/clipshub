"use client";

import React from "react";
import Image from "next/image";
import { cn } from "src/lib/utils";

interface ImageViewerProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  imageClassName?: string;
}

export const ImageViewer: React.FC<ImageViewerProps> = ({
  src,
  alt,
  width = 800,
  height = 600,
  className,
  priority = false,
  imageClassName,
}) => {
  return (
    <div className={cn("relative w-full h-full flex items-center justify-center", className)}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={cn("object-contain max-w-full max-h-full rounded-lg", imageClassName)}
        priority={priority}
      />
    </div>
  );
};

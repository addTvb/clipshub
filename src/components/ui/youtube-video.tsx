"use client";

import clsx from "clsx";

interface YouTubeVideoProps {
  videoId: string;
  title?: string;
  className?: string;
  aspectRatio?: "16/9" | "4/3";
}

export default function YouTubeVideo({ 
  videoId, 
  title = "YouTube video player",
  className,
  aspectRatio = "16/9"
}: YouTubeVideoProps) {
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;
  
  return (
    <div 
      className={clsx(
        "relative w-full overflow-hidden [border-radius:2.25%/4%] bg-gray-100",
        aspectRatio === "16/9" && "aspect-video",
        aspectRatio === "4/3" && "aspect-[4/3]",
        className
      )}
    >
      <iframe
        className="absolute inset-0 w-full h-full"
        src={embedUrl}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  );
}

"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Modal } from "./dialog";
import { ImageViewer } from "./image-viewer";
import { VideoPlayer } from "./video-player";
import { cn } from "src/lib/utils";
import { useMediaQuery } from "usehooks-ts";
import { AdFileType } from "src/widgets/business/offers/create-offer/model/useCreateOfferStore";

const PLAY_TEXT = "▶";

interface BannerPreviewProps {
  bannerType: AdFileType;
  bannerUrl: string;
  bannerName: string;
  className?: string;
  imageClassName?: string;
  previewUrl?: string;
}

export const BannerPreview: React.FC<BannerPreviewProps> = ({
  bannerType,
  bannerUrl,
  bannerName,
  className,
  imageClassName,
  previewUrl,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div
        className={cn(
          "relative group cursor-pointer transition-all duration-300 ease-out transform w-full",
          !isMobile && "hover:scale-105 hover:shadow-xl",
          "active:scale-95",
          className
        )}
        onClick={handleClick}
        onMouseEnter={() => !isMobile && setIsHovered(true)}
        onMouseLeave={() => !isMobile && setIsHovered(false)}
      >
        {bannerType === "image" ? (
          <div
            className="relative overflow-hidden rounded-[8px] shadow-lg border"
            style={{ width: "100%", height: 150 }}
          >
            <Image
              src={bannerUrl}
              alt={bannerName}
              width={100}
              height={100}
              className={cn(
                "object-cover transition-transform duration-300 ease-out w-full h-[150px]",
                !isMobile && "group-hover:scale-110",
                imageClassName
              )}
            />
            {/* Overlay при наведении */}
            {!isMobile && (
              <div
                className={cn(
                  "absolute inset-0 bg-black/20 flex items-center justify-center transition-all duration-300 ease-out",
                  isHovered ? "opacity-100" : "opacity-0"
                )}
              >
                <div className="bg-white/90 rounded-full p-2 hover:bg-white transition-all duration-300 ease-out transform hover:scale-110 active:scale-95">
                  <Image
                    src="/static/icons/zoom-in.svg"
                    alt="Zoom"
                    width={20}
                    height={20}
                    className="transition-transform duration-200"
                  />
                </div>
              </div>
            )}
          </div>
        ) : (
          <div
            className="relative overflow-hidden rounded-[8px] shadow-lg"
            style={{ width: "100%", height: 150 }}
          >
            <video
              src={bannerUrl}
              width={100}
              height={100}
              className="object-cover w-full h-full rounded-[8px]"
              muted
              playsInline
              preload="auto"
              autoPlay
              loop
              poster={previewUrl}
            />
            {/* Play button overlay */}
            <div
              className={cn(
                "absolute inset-0 bg-black/30 flex items-center justify-center transition-all duration-300 ease-out rounded-[8px]",
                isMobile
                  ? "opacity-80"
                  : isHovered
                  ? "opacity-100"
                  : "opacity-80"
              )}
            >
              <div
                className={cn(
                  "bg-white/90 rounded-full p-3 transition-all duration-300 ease-out transform w-[40px] h-[40px] flex justify-center items-center",
                  "hover:bg-white hover:scale-110 active:scale-95",
                  !isMobile && "group-hover:scale-110 group-hover:shadow-lg"
                )}
              >
                <div className="text-gray-800 font-medium text-sm transition-all duration-200">
                  {PLAY_TEXT}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal для отображения баннера в большом масштабе */}
      <Modal
        open={isModalOpen}
        setIsOpen={setIsModalOpen}
        className={cn("max-w-4xl", isMobile && "max-w-full mx-2")}
        withCross
        title={bannerName}
        mobileClassName="h-[90vh]"
      >
        <div className="flex items-center justify-center p-2 md:p-4 max-h-[80vh] overflow-hidden">
          {bannerType === "image" ? (
            <ImageViewer
              src={bannerUrl}
              alt={bannerName}
              width={800}
              height={600}
              className="max-h-[70vh]"
              priority
              imageClassName={imageClassName}
            />
          ) : (
            <VideoPlayer
              src={bannerUrl}
              title={bannerName}
              className="w-full max-w-full h-full"
            />
          )}
        </div>
      </Modal>
    </>
  );
};

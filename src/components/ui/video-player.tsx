/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { cn } from "src/lib/utils";
import { useMediaQuery } from "usehooks-ts";

const PLAY_TEXT = "▶";

interface VideoPlayerProps {
  src: string;
  title: string;
  className?: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, className }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const newTime = parseFloat(e.target.value);
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const newVolume = parseFloat(e.target.value);
      videoRef.current.volume = newVolume;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  };

  const handleMute = () => {
    if (videoRef.current) {
      if (isMuted) {
        videoRef.current.volume = volume;
        setIsMuted(false);
      } else {
        videoRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  const handleFullscreen = () => {
    if (!containerRef.current) return;

    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      } else if ((containerRef.current as any).webkitRequestFullscreen) {
        (containerRef.current as any).webkitRequestFullscreen();
      } else if ((containerRef.current as any).msRequestFullscreen) {
        (containerRef.current as any).msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      } else if ((document as any).msExitFullscreen) {
        (document as any).msExitFullscreen();
      }
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Обработка изменения полноэкранного режима
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("msfullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
      document.removeEventListener("msfullscreenchange", handleFullscreenChange);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative bg-black rounded-lg h-full group",
        isFullscreen && "fixed inset-0 z-50 rounded-none",
        className
      )}
      onMouseEnter={() => !isMobile && setShowControls(true)}
      onMouseLeave={() => !isMobile && setShowControls(false)}
      onTouchStart={() => isMobile && setShowControls(true)}
    >
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-contain rounded-[8px]"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onClick={handlePlayPause}
        playsInline
        preload="auto"
        autoPlay
        loop
      />

      {/* Play/Pause overlay */}
      {!isPlaying && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-black/20 cursor-pointer transition-all duration-300 rounded-[8px]"
          onClick={handlePlayPause}
        >
          <div
            className={cn(
              "bg-white/90 rounded-full flex items-center justify-center w-[50px] h-[50px] p-3 md:p-4 transition-all duration-300 ease-out transform",
              "hover:bg-white hover:scale-110 active:scale-95",
              !isMobile && "hover:shadow-lg"
            )}
          >
            <div className="text-gray-800 font-medium text-sm md:text-base transition-all duration-200">
              {PLAY_TEXT}
            </div>
          </div>
        </div>
      )}

      {/* Controls */}
      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 md:p-4 transition-all duration-300 ease-out rounded-[8px]" ,
          showControls || !isPlaying ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        )}
      >
        {/* Progress bar */}
        <div className="mb-2 md:mb-3">
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider transition-all duration-200 hover:h-2"
          />
        </div>

        {/* Controls row */}
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-[20px] px-[20px]">
            <button
              onClick={handlePlayPause}
              className={cn(
                "transition-all duration-300 ease-out transform",
                "hover:scale-110 active:scale-95",
                !isMobile && "hover:text-gray-300"
              )}
            >
              {isPlaying ? (
                <div className="w-[28px] h-[28px] md:w-6 md:h-6 flex items-center justify-center transition-all duration-200">
                  <div className="w-1 h-3 md:h-4 bg-white mr-1 rounded-sm"></div>
                  <div className="w-1 h-3 md:h-4 bg-white rounded-sm"></div>
                </div>
              ) : (
                <div className="text-sm w-[28px] h-[28px] flex items-center justify-center md:text-base font-medium transition-all duration-200">
                  {PLAY_TEXT}
                </div>
              )}
            </button>

            {!isMobile && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleMute}
                  className="hover:text-gray-300 transition-all duration-300 ease-out transform hover:scale-110 active:scale-95"
                >
                  {isMuted ? (
                    <Image
                      src="/static/icons/volume-mute.svg"
                      alt="Unmute"
                      width={28}
                      height={28}
                    />
                  ) : (
                    <Image
                      src="/static/icons/volume.svg"
                      alt="Mute"
                      width={28}
                      height={28}
                    />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-16 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider transition-all duration-200 hover:h-2"
                />
              </div>
            )}

            {/* Fullscreen button */}
            <button
              onClick={handleFullscreen}
              className="hover:text-gray-300 transition-all duration-300 ease-out transform hover:scale-110 active:scale-95"
            >
              {isFullscreen ? (
                <Image
                  src="/static/icons/fullscreen-exit.svg"
                  alt="Exit fullscreen"
                  width={28}
                  height={28}
                />
              ) : (
                <Image
                  src="/static/icons/fullscreen.svg"
                  alt="Enter fullscreen"
                  width={28}
                  height={28}
                />
              )}
            </button>
          </div>

          <div className="text-xs md:text-sm transition-all duration-200 font-mono">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #ffffff;
          cursor: pointer;
          transition: all 0.2s ease-out;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        }

        .slider::-moz-range-thumb {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #ffffff;
          cursor: pointer;
          border: none;
          transition: all 0.2s ease-out;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .slider::-moz-range-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        }

        .slider::-webkit-slider-track {
          background: #4b5563;
          border-radius: 4px;
          transition: all 0.2s ease-out;
        }

        .slider::-moz-range-track {
          background: #4b5563;
          border-radius: 4px;
          transition: all 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

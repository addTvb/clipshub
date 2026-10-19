interface VideoCardSkeletonProps {
  className?: string;
}

export const VideoCardSkeleton = ({ className = '' }: VideoCardSkeletonProps) => {
  return (
    <div className={`w-full max-w-[200px] mx-auto ${className}`}>
      {/* Card container */}
      <div className="md:p-[8px] p-1 md:pb-[2px] pb-0 bg-white [border-radius:11.5%/5.2%] shadow-imageShadow">
        {/* Video placeholder with shimmer effect */}
        <div className="w-full  aspect-[157/349] bg-gray200 [border-radius:11.5%/5.2%] relative overflow-hidden">
          <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent" />
        </div>
        
        {/* Bottom info */}
        <div className="flex items-center justify-between gap-[4px] mt-1">
          <div className="flex items-center gap-[6px] md:pl-0 pl-[6px]">
            {/* Platform icon */}
            <div className=" md:size-[16px] size-[14px] bg-gray200 rounded-full relative overflow-hidden">
              <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent" />
            </div>
            <div className="w-[1px] h-[18px] bg-gray200" />
          </div>
    
          <div className="flex items-center md:gap-[6px] gap-[4px] pr-[10px] py-[6px]">
            {/* Eye icon */}
            <div className="md:size-[16px] size-[10px] bg-gray200 rounded-full relative overflow-hidden">
              <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent" />
            </div>
            {/* Views count */}
            <div className="h-[12px] w-[40px] bg-gray200 rounded relative overflow-hidden">
              <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


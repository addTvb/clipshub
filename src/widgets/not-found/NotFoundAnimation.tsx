import "./video.css";

export const NotFoundAnimation = () => {
  return (
    <>
      <div className="relative flex items-center justify-center max-[900px]:hidden">
        <div className="text-[#B7C3D7] font-bold text-[200px] absolute top-[-10px] left-[50%] translate-x-[-170%] z-10">
          4
        </div>
        <div className="text-[#B7C3D7] font-bold text-[200px] absolute top-[-10px] left-[50%] translate-x-[-170%]"></div>
        <div>
          {/* gradient left */}
          <div className="bg-notFoundVideoGradient absolute top-0 left-0 w-[150px] h-[290px] rotate-[180deg] z-10" />
          <div className="bg-white50 absolute top-0 left-0 w-full h-[10px] z-10 " />
          <video
            src="/static/videos/not-found/animation.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="not-found-video border-none outline-none [appearance:none] bg-transparent"
          />
          {/* gradient right */}
          <div className="bg-white50 absolute bottom-[-4px] left-0 w-full h-[10px] z-10 " />
          <div className="bg-notFoundVideoGradient absolute top-0 right-0 w-[150px] h-[290px] z-10" />
        </div>

        <div className="text-[#B7C3D7] font-bold text-[200px] absolute top-[-10px] right-[50%] translate-x-[170%]">
          4
        </div>
      </div>
      <div className="hidden text-[#B7C3D7] font-bold text-[200px] max-[600px]:text-[100px]">
        404
      </div>
    </>
  );
};

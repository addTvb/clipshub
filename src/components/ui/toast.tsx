"use client";

import Image from "next/image";
import toast, { ToastBar, Toaster } from "react-hot-toast";
import { useWindowSize } from "usehooks-ts";

export const STToast = () => {
  const { width } = useWindowSize();
  const isMobile = width < 640;

  return (
    <Toaster
      position="top-right"
      containerStyle={{
        top: isMobile ? 68 : 116,
        right: isMobile ? 12 : 20,
      }}
      toastOptions={{
        duration: 3000,
        style: {
          padding: "0",
          background: "#222936",
        },
        error: {
          icon: (
            <Image
              src={"/static/icons/red-warning.svg"}
              alt=""
              width={24}
              height={24}
            />
          ),
        },
        success: {
          icon: (
            <Image
              src={"/static/icons/blue-warning.svg"}
              alt=""
              width={24}
              height={24}
            />
          ),
        },
      }}
    >
      {(t) => (
        <ToastBar toast={t}>
          {({ icon, message }) => (
            <div className="bg-[#] p-[14px] pr-[16px] rounded-[12px] flex gap-[10px]">
              {icon}
              <div className="flex flex-col gap-[10px]">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white">{message}</span>
                  <button
                    onClick={() => toast.dismiss(t.id)}
                    className="p-[5px] flex-shrink-0"
                  >
                    <Image
                      src="/static/icons/cross.svg"
                      alt=""
                      width={10}
                      height={10}
                    />
                  </button>
                </div>
                {/* <p className="text-gray500 text-sm">{message}</p> */}
              </div>
            </div>
          )}
        </ToastBar>
      )}
    </Toaster>
  );
};

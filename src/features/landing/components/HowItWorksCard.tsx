import Image from "next/image";
import { useTranslations } from "next-intl";
import clsx from "clsx";

interface HowItWorksCardProps {
  step: 1 | 2 | 3;
  isFullWidth?: boolean;
}

const HowItWorksCard = ({ step, isFullWidth = false }: HowItWorksCardProps) => {
  const t = useTranslations("landing.howItWorks");

  if (step === 3) {
    return (
      <div className="overflow-hidden rounded-[8px] border-solid border-[1px] border-[#E6EBF2] lg:col-span-2 md:block flex flex-col-reverse ">
        <div className="flex md:flex-row flex-col md:items-center lg:justify-start justify-between lg:gap-[72px] md:p-[32px] p-[24px] text-left">
          <div className="md:text-[28px] text-[20px] font-bold [&>span]:opacity-[0.2] flex gap-[12px] md:mb-0 mb-[24px]">
            <span>/3</span>
            {t("steps.step3.title")}
          </div>
          <div className="font-[Inter] md:text-[16px] text-[14px]">
            {t("steps.step3.description")}
          </div>
        </div>
        <div className="bg-purpleLight relative md:h-[500px] overflow-hidden flex xl:items-center items-start xl:pl-[87px] pl-[40px] md:pt-0  w-full md:aspect-auto aspect-square">
          <div className="rounded-[8px] bg-primary font-bold text-[16px] text-white px-[8px] py-[4px] absolute top-[29px] left-[30px] z-10">
            {t("steps.step3.label")}
          </div>
          <Image
            alt=""
            src="/static/images/landing/make-post.webp"
            className="m-auto absolute lg:right-[30px] md:right-[20px] right-[-10%] bottom-0"
            style={{
              filter: "drop-shadow(0px 4px 18.3px rgba(13, 41, 74, 0.10))",
            }}
            width={641}
            height={508}
          />
          <div className="text-left pt-[70px] xl:pt-0 lg:block hidden max-[1229px]:max-w-[300px] min-[1230px]:max-w-[700px]">
            <div className="xl:text-[64px] leading-[1.1] text-[48px] font-bold ">
              {t("steps.step3.title")}
            </div>
            <div className="text-[#7070A8] xl:text-[20px] text-[16px] font-[Inter]">
              {t("steps.step3.description")}
            </div>
          </div>
          <Image
            alt=""
            width={283}
            height={36}
            src="/static/images/landing/platforms.svg"
            className="absolute xl:left-[87px] lg:left-[40px] left-[20px] bottom-[55px] md:block hidden"
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className={clsx(
        "overflow-hidden rounded-[8px] border-solid border-[1px] border-[#E6EBF2] relative",
        {
          "lg:col-span-2": isFullWidth,
        }
      )}
    >
      <div className="rounded-[8px] bg-primary font-bold text-[16px] text-white px-[8px] py-[4px] absolute top-[29px] left-[30px] z-10">
        {t(`steps.step${step}.label`)}
      </div>

      <div
        className={clsx(
          "relative md:h-[390px] overflow-hidden w-full md:aspect-auto aspect-square",
          {
            "bg-blueLightGrad flex justify-center pt-[89px] md:pt-0": step === 1,
            "bg-orangeLight": step !== 1,
          }
        )}
      >
        <Image
          alt=""
          src={`/static/images/landing/${
            step === 1 ? "register" : "pick-offer"
          }.webp`}
          className={clsx(
            "m-auto",
            {
              "absolute md:left-[124px] md:top-[64px] md:bottom-auto bottom-0 left-[15%]": step === 2,
            }
          )}
          style={{
            filter: "drop-shadow(0px 4px 18.3px rgba(13, 41, 74, 0.10))",
          }}
          width={step === 2 ? 641 : 430}
          height={step === 2 ? 472 : 345}
        />
      </div>

      <div className="lg:grid lg:grid-cols-2 md:flex-row flex-col md:items-center justify-between md:p-[32px] p-[24px] text-left">
        <div className="md:text-[28px] text-[20px] font-bold [&>span]:opacity-[0.2] flex gap-[12px] md:mb-0 mb-[24px]">
          <span>/{step}</span>
          {t(`steps.step${step}.title`)}
        </div>
        <div className="font-[Inter] md:text-[16px] text-[14px]">
          {t(`steps.step${step}.description`)}
        </div>
      </div>
    </div>
  );
};

export default HowItWorksCard;

import Image from "next/image";
import { Input } from "src/components/ui/input";
import { Button } from "src/components/ui/button/button";
import { useForm, FormProvider } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useTranslations } from "next-intl";
import { SocialMediaLogin } from "src/widgets/auth/SocialMediaLogin";
import { useAuthStore } from "src/store/auth";
import { TrustPilotBadge } from "./components/TrustPilotBadge";
import DOMPurify from "isomorphic-dompurify";

interface FormValues {
  email: string;
}

const LandingHero = () => {
  const t = useTranslations("landing.hero");
  const { isAuthenticated } = useAuthStore();

  const methods = useForm<FormValues>({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    if (!data.email) {
      return;
    }
    // Landings-only build: no auth backend — keep email in UI state
    methods.reset({ email: data.email });
  };

  const boxRef = useRef(null);
  const formRef = useRef(null);
  const titleRef = useRef(null);
  const inputRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Функция для проверки размера экрана
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Проверяем при загрузке
    checkScreenSize();

    // Слушаем изменение размера экрана
    window.addEventListener("resize", checkScreenSize);

    // Очистка слушателя
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  useEffect(() => {
    // Параметры анимации в зависимости от размера экрана
    const boxAnimation = {
      start: { opacity: 0, y: isMobile ? -200 : -100 },
      end: {
        opacity: 1,
        y: isMobile ? -80 : 15,
        duration: 1,
      },
    };

    const formAnimation = {
      start: { opacity: 0, y: 50 },
      end: {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.2,
      },
    };

    const titleAnimation = {
      start: {
        opacity: 0,
        y: 20,
        filter: "blur(15px)",
      },
      end: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.6,
        delay: 0.4,
      },
    };

    const inputAnimation = {
      start: {
        opacity: 0,
        y: 20,
        filter: "blur(15px)",
      },
      end: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.6,
        delay: 0.6,
      },
    };

    // Применяем анимации
    if (!isMobile || (isMobile && boxRef.current)) {
      gsap.fromTo(boxRef.current, boxAnimation.start, boxAnimation.end);
    }

    gsap.fromTo(formRef.current, formAnimation.start, formAnimation.end);

    gsap.fromTo(titleRef.current, titleAnimation.start, titleAnimation.end);

    // Анимация формы только для неавторизованных пользователей
    if (!isAuthenticated && inputRef.current) {
      gsap.fromTo(inputRef.current, inputAnimation.start, inputAnimation.end);
    }
  }, [isMobile, isAuthenticated]);

  return (
    <div className="relative overflow-hidden px-[10px]">
      <div className="w-[80svw] aspect-[2/1] bg-radialBlue2 rounded-[50%] absolute left-0 top-0 translate-x-[-10%] translate-y-[-40%]"></div>
      <div className="w-[80svw] aspect-[2/1] bg-radialBlue rounded-[50%] absolute right-0 top-0 translate-x-[15%] translate-y-[-40%]"></div>
      <div
        ref={boxRef}
        className="flex gap-[10px] w-full translate-y-[-20%] z-0"
      >
        <div className="flex md:gap-[15px] lg:gap-[20px] gap-[10px] md:absolute left-0 top-0 md:translate-x-[-16%]">
          <div className="flex flex-col gap-[20px]">
            <div className="w-full md:w-[10vw] max-w-[224px] aspect-[1/2] max-h-[520px] rounded-[167px] flex items-center justify-center border-solid border-[#3188AA] border-[2px]">
              <Image
                alt=""
                width={181}
                height={221}
                src="/static/images/landing/tiktok.webp"
              />
            </div>

            <div className="w-full md:w-[10vw] max-w-[224px] aspect-[1/2] max-h-[520px] rounded-[167px] flex items-center justify-center border-solid border-[#3188AA] border-[2px] relative overflow-hidden">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover z-0"
              >
                <source src="/static/videos/video3.webm" type="video/webm" />
              </video>
            </div>
          </div>

          <div className="flex flex-col gap-[20px] translate-y-[14%]">
            <div className="w-full md:w-[10vw] max-w-[224px] aspect-[1/2] max-h-[520px] rounded-[167px] flex items-center justify-center border-solid border-[#3188AA] border-[2px] relative overflow-hidden">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover z-0"
              >
                <source src="/static/videos/video2.webm" type="video/webm" />
              </video>
            </div>

            <div className="w-full md:w-[10vw] max-w-[224px] aspect-[8/10] max-h-[278px] rounded-[167px] flex items-center justify-center border-dashed border-[#3188AA] border-[2px]">
              <Image
                alt=""
                width={184}
                height={158}
                src="/static/images/landing/coin.webp"
              />
            </div>
          </div>
        </div>

        <div className="flex md:gap-[15px] lg:gap-[20px] gap-[10px] md:absolute right-0 top-0 md:translate-x-[16%]">
          <div className="flex flex-col gap-[20px]  translate-y-[14%]">
            <div className="w-full md:w-[10vw] max-w-[224px] aspect-[8/10] max-h-[278px] rounded-[167px] flex items-center justify-center border-dashed border-[#3188AA] border-[2px]">
              <Image
                alt=""
                width={184}
                height={158}
                src="/static/images/landing/instagram.webp"
              />
            </div>
            <div className="w-full md:w-[10vw] max-w-[224px] aspect-[1/2] max-h-[520px] rounded-[167px] flex items-center justify-center border-solid border-[#3188AA] border-[2px] relative overflow-hidden">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover z-0"
              >
                <source src="/static/videos/video1.webm" type="video/webm" />
              </video>
            </div>
          </div>

          <div className="flex flex-col gap-[20px]">
            <div className="w-full md:w-[10vw] max-w-[224px] aspect-[1/2] max-h-[520px] rounded-[167px] flex items-center justify-center border-solid border-[#3188AA] border-[2px] relative overflow-hidden">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover z-0"
              >
                <source src="/static/videos/video4.webm" type="video/webm" />
              </video>
            </div>
            <div className="w-full md:w-[10vw] max-w-[224px] aspect-[1/2] max-h-[520px] rounded-[167px] flex items-center justify-center border-solid border-[#3188AA] border-[2px]">
              <Image
                alt=""
                width={181}
                height={221}
                src="/static/images/landing/youtube.webp"
              />
            </div>
          </div>
        </div>

        <div className="md:hidden absolute bottom-0 left-0 w-full h-[60%] bg-[linear-gradient(180deg,rgba(243,246,250,0.00)_0%,#FFFFFF_66.25%)] translate-y-[20%] z-1"></div>
      </div>

      <div
        ref={formRef}
        className="flex flex-col items-center md:w-[50vw] w-full max-w-[777px] m-auto text-center 2xl:mb-[350px] xl:mb-[250px] mb-[150px] relative z-10"
      >
        <div className="flex flex-col items-center gap-[18px] 2xl:mt-[200px] xl:mt-[160px] md:mt-[100px] mt-[-19%]">
          <TrustPilotBadge />

          <h1 className="2xl:text-[64px] 2xl:leading-[68px] xl:leading-[48px] xl:text-[44px] text-[32px] leading-[38px] font-light mb-[32px] [&>b]:font-bold">
            <b dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(t.raw("title.bold")) }} />
            <br />
            {t("title.regular")}
          </h1>
        </div>
        <div
          ref={titleRef}
          className="font-[Inter] 2xl:text-[20px] xl:text-[18px] text-[16px] 2xl:mb-[68px] xl:mb-[48px] mb-[36px]"
        >
          {t("subtitle")}
        </div>
        {!isAuthenticated && (
          <>
            <FormProvider {...methods}>
              <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className="md:mb-[34px] mb-[46px] w-full"
                ref={inputRef}
              >
                <div className="flex flex-col sm:flex-row gap-[12px] w-full">
                  <Input
                    name="email"
                    placeholder={t("emailPlaceholder")}
                    type="email"
                    icon="/static/icons/email.svg"
                    className="w-full"
                  />
                  <Button type="submit" size="lg">
                    {t("button")}
                  </Button>
                </div>
              </form>
            </FormProvider>
            <SocialMediaLogin variant="landing" />
          </>
        )}
      </div>
    </div>
  );
};

export default LandingHero;

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useTranslations } from "next-intl";
import { TermsSignature } from "./terms-signature/TermsSignature";
import { Button } from "src/components/ui/button/button";
import EditIcon from "@icons/edit.svg";
import { RenderTermsSection } from "./RenderTermsSection";
import { Fragment, useEffect, useRef, useState } from "react";
import { Divider } from "src/components/ui/divider";
import Image from "next/image";
import { useScrollToBottom } from "use-scroll-to-bottom";
import { useUploadFiles } from "src/queries/useUploadFiles";
import toast from "react-hot-toast";
import { useEditUser } from "../model/useEditUser";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { EditUserRequest } from "src/types/auth";
import { useGetUser } from "src/queries/useGetUser";

const sections = [
  "serviceAndAccount",
  "feesAndExpenses",
  "reserveBalance",
  "ownershipAndPermissions",
  "userContent",
  "termAndTermination",
  "rightsOfThePlatform",
  "additionalTerms",
  "contactInformation",
  "platformAsIsDisclaimer",
  "generalProvisions",
];

const fileType = {
  influencer: "clipper_terms_signature" as const,
  business: "business_terms_signature" as const,
} as const;

// Helper function to convert data URL to Blob
const dataURLtoBlob = (dataurl: string) => {
  const arr = dataurl.split(",");
  const mime = arr[0]?.match(/:(.*?);/)?.[1];
  const bstr = atob(arr[1]!);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
};

export const TermsPage = () => {
  const t = useTranslations();

  const sigPadRef = useRef<any>(null);
  const termsEndRef = useRef<HTMLSpanElement | null>(null);
  const [sigReady, setSigReady] = useState(false);
  const [isSignatureEmpty, setIsSignatureEmpty] = useState(true);
  const [setBottomRef, isBottom] = useScrollToBottom();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { push } = useRouter();

  const { user } = useGetUser();

  useEffect(() => {
    const isEmailConfirmed = searchParams.get("emailConfirmed");
    if (isEmailConfirmed === "true") {
      toast.success(t("common.emailConfirmed"));
      push(pathname);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isBottom) setSigReady(true);
  }, [isBottom]);

  const { uploadFile, loadingFile } = useUploadFiles();
  const { editUserProfile, pendingEditUser } = useEditUser();

  const handleAccept = () => {
    if (!sigPadRef.current) return;
    if (!user?.type) return;

    const signaturePadInstance = sigPadRef.current;
    const dataURL = signaturePadInstance.toDataURL("image/png");
    const blob = dataURLtoBlob(dataURL);

    if (!blob) return;
    const file = new File([blob], "signature.png", { type: "image/png" });
    uploadFile(
      { file, type: fileType[user.type] },
      {
        onSuccess: (data) => {
          const body: EditUserRequest =
            user.type === "business"
              ? { business_terms_signature_file_id: data.file.id, ...user }
              : { clipper_terms_signature_file_id: data.file.id, ...user };

          editUserProfile(body, {
            onSuccess: () => {
              toast.success(t("common.loginSuccessful"));
              if (typeof window !== "undefined") {
                window.location.assign("/?termsSigned=true");
              } else {
                push("/?termsSigned=true");
              }
            },
          });
        },
      }
    );
  };

  return (
    <div className="w-full flex flex-col items-center gap-[25px] px-[20px] pt-[20px] pb-[225px] md:pb-[120px] h-screen max-w-screenMaxWidth mx-auto">
      <div className="flex gap-[12px] items-center">
        <span className="text-textColor text-xl font-bold">
          {t("signature.youAreLoggedAs", { userType: user?.type })}
        </span>

        <Button
          variant="outline"
          size="icon"
          className="rounded-full size-[28px]"
          href="/auth/setup-profile"
        >
          <EditIcon />
        </Button>
      </div>

      <div className="relative flex-1 w-full overflow-hidden">
        <div
          className="absolute inset-0 overflow-y-auto pr-[10px]"
          style={{
            WebkitOverflowScrolling: "touch",
            overscrollBehavior: "contain",
          }}
        >
          <div className="flex flex-col gap-[49px]">
            <div className="flex flex-col gap-[32px]">
              {sections.map((section, index) => (
                <Fragment key={section}>
                  <RenderTermsSection
                    translationKey={section}
                    sectionIndex={index + 1}
                    level={0}
                  />
                  {index < sections.length - 1 && <Divider />}
                </Fragment>
              ))}
            </div>

            <div className="flex flex-col md:grid md:grid-cols-[8fr_9fr] gap-[32px] items-center h-[263px]">
              <div className="flex items-center">
                <div className="flex flex-col gap-[12px]">
                  <div className="text-lg md:text-xl font-bold">
                    {t("signature.drawYourSignatureBelowToAgree")}
                  </div>
                  <p className="text-base font-medium">
                    {t("signature.drawYourSignatureBelowToAgreeText")}
                  </p>
                </div>
                <Image
                  src="/static/images/curvy-blue-arrow.svg"
                  alt=""
                  width={135}
                  height={102}
                  className="hidden md:block"
                />
              </div>

              <TermsSignature
                sigPadRef={sigPadRef}
                onSignatureChange={(isEmpty) => setIsSignatureEmpty(isEmpty)}
              />
            </div>
            <span
              ref={(node) => {
                setBottomRef(node);
                termsEndRef.current = node;
              }}
            />
          </div>
        </div>
      </div>

      <div className="flex self-end items-center gap-[10px]">
        <span className="text-gray550 italic font-medium text-sm">
          {t("signature.scrollAndSignToContinue")}
        </span>
        <Button
          disabled={!sigReady || isSignatureEmpty}
          loading={loadingFile || pendingEditUser}
          onClick={handleAccept}
        >
          {t("signature.accept")}
        </Button>
      </div>
    </div>
  );
};

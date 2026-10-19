/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, RefObject, useEffect, useCallback } from "react";
import ReactSignaturePadWrapper from "react-signature-pad-wrapper";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { SignatureAnimation } from "./SignatureAnimation";

interface IProps {
  sigPadRef: RefObject<InstanceType<typeof ReactSignaturePadWrapper> | null>;
  onSignatureChange: (isEmpty: boolean) => void;
}

export const TermsSignature = ({ sigPadRef, onSignatureChange }: IProps) => {
  const t = useTranslations("signature");
  const tCommon = useTranslations("common");
  const [canUndo, setCanUndo] = useState(false);
  const [hideAnimation, setHideAnimation] = useState(false);

  const isCanvasEmpty = useCallback(() => {
    if (!sigPadRef.current) return;
    return (sigPadRef.current as any).signaturePad.isEmpty();
  }, [sigPadRef]);

  const handleHideAnimation = useCallback(() => setHideAnimation(true), []);
  const handleShowAnimation = useCallback(() => {
    const isEmpty = isCanvasEmpty();
    if (isEmpty) setHideAnimation(false);
    else setHideAnimation(true);
  }, [isCanvasEmpty]);

  useEffect(() => {
    const handleEndStrokeInternal = () => {
      const isEmpty = isCanvasEmpty();
      onSignatureChange(isEmpty);
      setCanUndo(!isEmpty);
    };

    if (sigPadRef.current && (sigPadRef.current as any).signaturePad) {
      const signaturePadInstance = (sigPadRef.current as any).signaturePad;
      signaturePadInstance.addEventListener(
        "endStroke",
        handleEndStrokeInternal
      );

      return () => {
        signaturePadInstance.removeEventListener(
          "endStroke",
          handleEndStrokeInternal
        );
      };
    }
  }, [sigPadRef, onSignatureChange, isCanvasEmpty]);

  const clear = () => {
    if (!sigPadRef.current) return;
    (sigPadRef.current as any).signaturePad.clear();
    setCanUndo(false);
    onSignatureChange(true);
  };

  const undo = () => {
    if (!sigPadRef.current) return;
    const signaturePad = (sigPadRef.current as any).signaturePad;

    const points = signaturePad.toData();
    if (points.length <= 1) {
      setCanUndo(false);
      onSignatureChange(true);
      signaturePad.clear();
      return;
    }

    points.pop();
    signaturePad.clear();
    signaturePad.fromData(points);
    const isEmpty = points.length === 0;
    setCanUndo(!isEmpty);
    setHideAnimation(!isEmpty);
    onSignatureChange(isEmpty);
  };

  return (
    <>
      <div className="relative border border-dashed shadow-cardShadow border-gray500 rounded-[8px] p-[12px] w-full">
        <span className="text-gray350 text-sm font-bold absolute top-[22px] left-[22px] select-none">
          {t("signHere")}
        </span>
        <SignatureAnimation
          isEmpty={!hideAnimation}
          onHide={handleHideAnimation}
        />
        <div
          onMouseEnter={handleHideAnimation}
          onMouseLeave={handleShowAnimation}
        >
          <ReactSignaturePadWrapper
            ref={sigPadRef}
            options={{
              minWidth: 0.5,
              maxWidth: 2.5,
              penColor: "black",
            }}
            canvasProps={{
              className:
                "border rounded-[8px] w-full h-[263px] bg-white50 text-gray550",
            }}
          />
        </div>

        <div className="flex gap-[8px] items-center absolute bottom-[18px] left-[22px]">
          <button
            className="p-[8px] text-gray550 flex items-center gap-[6px] font-medium text-sm"
            onClick={undo}
            disabled={!canUndo}
          >
            <Image
              src="/static/icons/back-gray.svg"
              alt=""
              width={18}
              height={18}
            />
            <span>{tCommon("back")}</span>
          </button>

          <div className="w-[1px] h-[11px] border-r border-gray300" />

          <button
            className="p-[8px] text-gray550 flex items-center gap-[6px] font-medium text-sm"
            onClick={clear}
          >
            <Image
              src="/static/icons/erase-gray.svg"
              alt=""
              width={18}
              height={18}
            />
            <span>{t("clear")}</span>
          </button>
        </div>
      </div>
    </>
  );
};

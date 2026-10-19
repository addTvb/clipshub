"use client";

/**
 * DragAndDrop компонент для загрузки файлов через drag & drop или выбор файла.
 *
 * @example Без стора (только форма)
 * ```tsx
 * <DragAndDrop
 *   name="fileID"
 *   type="image"
 * />
 * ```
 *
 * @example С синхронизацией в стор
 * ```tsx
 * const { setFileID, setFileLink, setFileName, fileID, fileLink, fileName } = useYourStore();
 *
 * <DragAndDrop
 *   name="fileID"
 *   type="offer-video-and-image"
 *   storeActions={{
 *     setFileID,
 *     setFileLink,
 *     setFileName,
 *     fileID,
 *     fileLink,
 *     fileName,
 *   }}
 * />
 * ```
 */

// TODO decompose component
import { useTranslations } from "next-intl";
import Image from "next/image";
import {
  useCallback,
  useState,
  useEffect,
  useRef,
  useMemo,
  type CSSProperties,
} from "react";
import clsx from "clsx";
import { useController, useFormContext } from "react-hook-form";
import { useUploadFiles } from "src/queries/useUploadFiles";
import { Spinner } from "./spinner";
import { FileResponse, UploadFileType } from "src/types/files";
import { AdFileType } from "src/widgets/business/offers/create-offer/model/useCreateOfferStore";
import { FormFieldError } from "./form-field-error";

export interface FileStoreActions {
  setFileID: (id: number) => void;
  setFileLink: (link: string) => void;
  setFileName: (name: string) => void;
  fileLink?: string;
  fileName?: string;
  fileID?: number;
}

interface DragAndDropProps {
  name: string;
  type: "offer-video-and-image" | "image" | "clipper-avatar";
  setFileType?: (fileType: AdFileType) => void;
  storeActions?: FileStoreActions;
}

export const DragAndDrop = ({
  name,
  type,
  setFileType,
  storeActions,
}: DragAndDropProps) => {
  const t = useTranslations();
  const { control } = useFormContext();
  const {
    field: { value, onChange: onFormChange },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });

  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [filePath, setFilePath] = useState("");
  const [fileName, setFileName] = useState("");

  const dropzoneBorderColor = useMemo(() => {
    if (invalid && error) return "#EF4444";
    if (isDragging) return "#60A5FA";
    return "#B3B7BD";
  }, [error, invalid, isDragging]);

  const dashedBorderStyle = useMemo<CSSProperties>(() => {
    const dashLength = 10;
    const gapLength = 7;
    const horizontalDash = `repeating-linear-gradient(90deg, ${dropzoneBorderColor} 0 ${dashLength}px, transparent ${dashLength}px ${dashLength + gapLength}px)`;
    const verticalDash = `repeating-linear-gradient(180deg, ${dropzoneBorderColor} 0 ${dashLength}px, transparent ${dashLength}px ${dashLength + gapLength}px)`;

    return {
      border: "1px solid transparent",
      borderRadius: "12px",
      backgroundImage: `${horizontalDash}, ${horizontalDash}, ${verticalDash}, ${verticalDash}`,
      backgroundSize:
        "calc(100% - 2px) 1.5px, calc(100% - 2px) 1.5px, 1.5px calc(100% - 2px), 1.5px calc(100% - 2px)",
      backgroundPosition:
        "1px 1px, 1px calc(100% - 1px), 1px 1px, calc(100% - 1px) 1px",
      backgroundRepeat: "no-repeat",
    };
  }, [dropzoneBorderColor]);

  // Добавляем эффект для установки filePath при получении значения
  useEffect(() => {
    if (value && typeof value === "string") {
      setFilePath(value);
    }
  }, [value]);

  useEffect(() => {
    if (!value) {
      setFile(null);
      setFilePath("");
      setFileName("");
    }
  }, [value]);

  const handleChange = useCallback(
    (data: FileResponse) => {
      onFormChange(data.file.id);

      // If storeActions is provided, save file info to the store
      if (storeActions) {
        storeActions.setFileID(data.file.id);
        storeActions.setFileLink(data.file?.link);
        storeActions.setFileName(data.file?.name);
      }
    },
    [onFormChange, storeActions]
  );

  const { uploadFile, loadingFile } = useUploadFiles();

  // Initialize from store if storeActions is provided and there's data in the store
  useEffect(() => {
    if (
      storeActions &&
      storeActions.fileLink &&
      storeActions.fileName &&
      storeActions.fileID === value
    ) {
      setFilePath(storeActions.fileLink);
      setFileName(storeActions.fileName);
    }
  }, [storeActions, value]);

  useEffect(() => {
    if (value instanceof File) setFile(value);
  }, [value]);

  const prevValueRef = useRef<string | number | null>(null);
  const prevFilePathRef = useRef<string>("");
  const prevFileNameRef = useRef<string>("");
  const handlingErrorRef = useRef(false);

  const handleDragOver = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsDragging(true);
    },
    []
  );

  const handleDragLeave = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsDragging(false);
    },
    []
  );

  const processFile = useCallback(
    (file: File) => {
      const isImage = file.type.startsWith("image/");
      let fileType: UploadFileType = "ad_campaign_logo";

      if (type === "offer-video-and-image") {
        fileType = isImage ? "ad_offer_banner_image" : "ad_offer_banner_video";
      } else if (type === "clipper-avatar") {
        fileType = "ad_offer_clipper_avatar";
      } else if (type === "image") {
        fileType = "ad_campaign_logo";
      }
      // Запоминаем предыдущее состояние перед началом новой загрузки
      const previousPath =
        filePath ||
        (typeof value === "string"
          ? value
          : storeActions &&
            storeActions.fileID === value &&
            storeActions.fileLink
          ? storeActions.fileLink
          : "");
      const previousName =
        fileName ||
        (storeActions && storeActions.fileID === value
          ? storeActions.fileName || ""
          : "");
      prevValueRef.current = (value as string | number | null) ?? null;
      prevFilePathRef.current = previousPath || "";
      prevFileNameRef.current = previousName || "";

      // Сбрасываем предыдущее состояние в UI
      setFilePath("");
      setFileName("");
      setFile(file);
      uploadFile(
        { file, type: fileType },
        {
          onSuccess: (data) => {
            setFilePath(data.file.link);
            setFileName(data.file.name);
            handleChange(data);
          },
          onError: () => {
            handlingErrorRef.current = true;
            const hadPrevious =
              !!prevFilePathRef.current || prevValueRef.current !== null;

            if (hadPrevious) {
              // Возвращаемся к предыдущему значению
              setFilePath(prevFilePathRef.current || "");
              setFileName(prevFileNameRef.current || "");
              setFile(null);
              onFormChange(prevValueRef.current);
            } else {
              // Полностью очищаем, если это был первый выбор
              setFileName("");
              setFilePath("");
              setFile(null);
              onFormChange(null);
              if (storeActions) {
                storeActions.setFileLink("");
                storeActions.setFileName("");
              }
            }
            handlingErrorRef.current = false;
          },
        }
      );
      if (setFileType) setFileType(isImage ? "image" : "video");
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      type,
      uploadFile,
      setFileType,
      handleChange,
      filePath,
      fileName,
      value,
      storeActions,
    ]
  );

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsDragging(false);

      const droppedFiles = Array.from(event.dataTransfer.files);
      const file = droppedFiles[0];
      if (file) {
        processFile(file);
      }
    },
    [processFile]
  );

  const handleFileInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = event.target.files
        ? Array.from(event.target.files)
        : [];
      const file = selectedFiles[0];
      if (file) {
        processFile(file);
      }
      // Очищаем input для возможности повторного выбора того же файла
      event.target.value = "";
    },
    [processFile]
  );

  const imageFormats = ".png,.jpg,.jpeg,.webp";
  const videoFormats = ".mp4,.mov";
  const accept =
    type === "image" ? imageFormats : `${imageFormats},${videoFormats}`;

  const defaultTitle =
    type === "offer-video-and-image"
      ? t("business.offerForm.dragAndDropFile")
      : t("business.dragAndDropImage");

  const showingFile = filePath
    ? filePath
    : file
    ? URL.createObjectURL(file)
    : null;

  const displayFileName = file ? file.name : fileName || defaultTitle;

  return (
    <div data-field-name={name}>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={clsx(
          isDragging && "bg-[#F8FCFF]",
          "relative p-[25px] box-border flex justify-between items-start flex-col sm:items-center sm:flex-row gap-[24px] rounded-[8px] transition-colors"
        )}
        style={dashedBorderStyle}
      >
        {loadingFile && (
          <div className="flex justify-center items-center opacity-40 w-full h-full rounded-[8px] bg-slate-300 absolute top-0 left-0">
            <Spinner color="dark" />
          </div>
        )}
        <div className="flex items-center gap-[32px]">
          {showingFile ? (
            <Image
              src={showingFile}
              alt=""
              width={68}
              height={68}
              className="w-[68px] h-[68px] object-cover rounded-full border border-[#DDDFE4] absolute"
            />
          ) : (
            <Image
              src={
                type === "offer-video-and-image"
                  ? "/static/images/image-video-placeholder.svg"
                  : "/static/images/file-image-placeholder.svg"
              }
              alt=""
              width={52}
              height={52}
              className="h-[52px] w-auto"
            />
          )}

          <div
            className={clsx(
              (file || showingFile) && "pl-[92px]",
              "flex flex-col gap-[6px]"
            )}
          >
            <p className="text-textColor text-sm font-semibold sm:truncate max-w-auto sm:max-w-[340px]">
              {displayFileName}
            </p>
            <p className="text-gray600 font-medium text-sm">
              {type === "offer-video-and-image"
                ? t("business.offerForm.dragAndDropVideoImageFormat")
                : t("business.dragAndDropFileFormat")}
            </p>
          </div>
        </div>

        <label
          htmlFor={`file-input-${name}`}
          className="min-w-[105px] w-full sm:w-auto text-center pointer border bg-white py-[11px] px-[12px] border-[#DFE3EA] rounded-[6px] text-textColor font-bold text-base transition-all cursor-pointer hover:border-gray350"
        >
          {file || showingFile
            ? t("business.reselectFile")
            : t("business.selectFile")}
        </label>

        <input
          id={`file-input-${name}`}
          type="file"
          accept={accept}
          onChange={handleFileInput}
          style={{ display: "none" }}
        />
      </div>

      <FormFieldError
        visible={Boolean(invalid && error)}
        messageKey={error?.message}
      />
    </div>
  );
};

import CopyIcon from "@icons/copy.svg";
import CopiedIcon from "@icons/copied.svg";
import { useState, useRef, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useTranslations } from "next-intl";
import clsx from "clsx";
import { useWindowSize } from "usehooks-ts";
import ArrowDown from "@icons/arrow-down.svg";
import DOMPurify from "isomorphic-dompurify";
import EditIcon from "@icons/edit.svg";
import CheckIcon from "@icons/marker.svg";

interface TextCardProps {
  text?: string;
  copy?: boolean;
  className?: string;
  url?: string;
  inputValue?: string;
  onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextCard = ({
  text = "",
  copy = false,
  className = "",
  url,
  inputValue,
  onInputChange,
}: TextCardProps) => {
  const t = useTranslations();
  const [isCopied, setIsCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLongText, setIsLongText] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [localInputValue, setLocalInputValue] = useState(text);
  const { width } = useWindowSize();
  const isMobile = width <= 768;
  const contentRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const copyTimeout = useRef<NodeJS.Timeout | null>(null);

  const edit = inputValue !== undefined;

  useEffect(() => {
    if (contentRef.current) {
      const contentHeight = contentRef.current.scrollHeight;
      setIsLongText(contentHeight > 200);
    }
  }, [text]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      const input = inputRef.current;
      input.focus();
      const len = input.value.length;
      input.setSelectionRange(len, len);
    }
  }, [isEditing]);

  const handleCopy = () => {
    if (typeof text === "string") {
      navigator.clipboard
        .writeText(text || inputValue || localInputValue)
        .then(() => {
          setIsCopied(true);
          toast.success(t("common.copied"));
          if (copyTimeout.current) clearTimeout(copyTimeout.current);
          copyTimeout.current = setTimeout(() => setIsCopied(false), 1500);
        })
        .catch((err) => {
          console.error(t("common.copyFailed"), err);
          toast.error(t("common.copyFailed"));
        });
    }
  };

  useEffect(() => {
    return () => {
      if (copyTimeout.current) clearTimeout(copyTimeout.current);
    };
  }, []);

  useEffect(() => {
    setLocalInputValue(text);
  }, [text]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalInputValue(e.target.value);
  };

  const textContent = edit ? (
    <input
      disabled={!isEditing}
      ref={inputRef}
      value={inputValue !== undefined ? inputValue : localInputValue}
      onChange={onInputChange ? onInputChange : handleInputChange}
      className="bg-transparent border-none p-0 h-auto leading-[20px] text-[14px] font-[500] font-[Inter] focus:outline-none focus:border-none focus:bg-transparent focus-visible:shadow-none focus-visible:border-none disabled:opacity-100"
    />
  ) : (
    <div
      ref={contentRef}
      className={clsx(
        "whitespace-pre-line transition-max-height duration-300 ease-in-out min-h-[24px] truncate",
        isMobile && "relative",
        isMobile && !isExpanded && isLongText
          ? "max-h-[200px] overflow-hidden after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[60px] after:bg-gradient-to-t after:from-white50 after:to-transparent"
          : "max-h-[2000px]"
      )}
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(text) }}
    />
  );

  const content = (
    <>
      {url ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#3188AA] underline"
        >
          {textContent}
        </a>
      ) : (
        <>{textContent}</>
      )}

      {isMobile && isLongText && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full mt-4 text-[#3188AA] text-sm font-medium flex justify-center items-center"
          type="button"
        >
          <ArrowDown
            className={clsx(
              "size-[20px] flex-none transition-transform duration-300 ease-in-out",
              isExpanded && "rotate-180"
            )}
          />
        </button>
      )}
      <div className="flex gap-[8px] items-center">
        {edit && (
          <button
            type={!isEditing ? "submit" : "button"}
            className="size-[25px] flex items-center justify-center "
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? (
              <CheckIcon className="size-[20px] flex-none" />
            ) : (
              <EditIcon className="size-[20px] flex-none" />
            )}
          </button>
        )}
        {edit && copy && <div className="w-[1px] h-[11px] bg-gray300" />}
        {copy && (
          <button
            className="size-[25px] flex items-center justify-center focus:outline-none"
            onClick={handleCopy}
            aria-label={t("common.copyToClipboard")}
            type="button"
          >
            {isCopied ? (
              <CopiedIcon className="size-[20px] flex-none" />
            ) : (
              <CopyIcon className="size-[20px] flex-none" />
            )}
          </button>
        )}
      </div>
    </>
  );

  return (
    <div
      className={clsx(
        "bg-white50 p-[18px] rounded-[8px] relative w-full text-sm font-[Inter] flex items-center justify-between gap-[10px] ",
        className
      )}
    >
      {content}
    </div>
  );
};

export default TextCard;

import DOMPurify from "isomorphic-dompurify";
import { useTranslations } from "next-intl";
import clsx from "clsx";

type SectionProps = {
  translationKey: string;
  sectionIndex: number;
  level: number;
};

export const RenderCookieSections = ({
  translationKey,
  sectionIndex,
  level,
}: SectionProps) => {
  const t = useTranslations();

  const hasList = t.has(`cookiePolicy.${translationKey}.list`);
  const hasDescription = t.has(`cookiePolicy.${translationKey}.description`);

  return (
    <div className="flex flex-col gap-[16px]">
      <h2 className="font-bold text-xl lg:text-[28px] font-sans">
        {level === 0 && <span className="mr-2">{sectionIndex}.</span>}
        <span
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(
              t.raw(`cookiePolicy.${translationKey}.title`)
            ),
          }}
        />
      </h2>

      {hasDescription && (
        <p
          className="whitespace-pre-line"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(
              t.raw(`cookiePolicy.${translationKey}.description`)
            ),
          }}
        />
      )}

      {hasList && (
        <ol className="list-none pl-0 flex flex-col gap-[10px]">
          {Object.keys(t.raw(`cookiePolicy.${translationKey}.list`) || {}).map(
            (key, itemIndex) => {
              const itemKey = `cookiePolicy.${translationKey}.list.${key}`;
              const displayPrefix = `${sectionIndex}.${itemIndex + 1}`;
              const paddingClass = sectionIndex >= 10 ? "pl-14" : "pl-10";
              const hasSubDescription = t.has(`${itemKey}.description`);

              return (
                <li
                  key={key}
                  className={clsx("relative", paddingClass, "mb-4")}
                >
                  <span className="absolute left-0 font-bold text-lg font-sans">
                    {displayPrefix}
                  </span>
                  <div
                    className="font-bold text-lg font-sans"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(t.raw(`${itemKey}.title`)),
                    }}
                  />

                  {hasSubDescription && (
                    <p
                      className="whitespace-pre-line"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(
                          t.raw(`${itemKey}.description`)
                        ),
                      }}
                    />
                  )}
                </li>
              );
            }
          )}
        </ol>
      )}
    </div>
  );
};

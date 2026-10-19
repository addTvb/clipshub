import clsx from "clsx";
import { useTranslations } from "next-intl";
import DOMPurify from "isomorphic-dompurify";

type SectionProps = {
  translationKey: string;
  sectionIndex: number;
  level: number;
};

export const RenderTermsSection = ({
  translationKey,
  sectionIndex,
  level,
}: SectionProps) => {
  const t = useTranslations("termsAndConditions");

  const hasTitle = t.has(`${translationKey}.title`);
  const hasDescription = t.has(`${translationKey}.description`);
  const hasList = t.has(`${translationKey}.list`);

  // Use ordered list for levels 0 and 1, unordered list for level 2
  const ListComponent = level < 2 ? "ol" : "ul";
  const listStyle = level === 2 ? "list-disc pl-6" : "list-none pl-0";

  return (
    <div className="flex flex-col gap-[16px] terms-section">
      {hasTitle && (
        <h2 className="font-bold text-xl lg:text-[28px] font-sans">
          {level === 0 && <span className="mr-2">{sectionIndex}.</span>}
          <span
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(t.raw(`${translationKey}.title`)),
            }}
          />
        </h2>
      )}
      {hasDescription && (
        <div
          className="whitespace-pre-line"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(t.raw(`${translationKey}.description`)),
          }}
        />
      )}
      {hasList && (
        <ListComponent className={clsx(listStyle, "flex flex-col gap-[10px]")}>
          {Object.keys(t.raw(`${translationKey}.list`) || {}).map(
            (key, itemIndex) => {
              const itemKey = `${translationKey}.list.${key}`;

              // Format prefixes according to level
              let displayPrefix = "";
              if (level === 0) {
                displayPrefix = `${sectionIndex}.${itemIndex + 1}`;
              } else if (level === 1) {
                displayPrefix = `${sectionIndex}.${itemIndex + 1}`;
              }

              const paddingClass = sectionIndex >= 10 ? "pl-12" : "pl-8";

              const hasSublist = t.has(`${itemKey}.sublist`);
              const hasDescription = t.has(`${itemKey}.description`);
              const hasTitle = t.has(`${itemKey}.title`);

              return (
                <li
                  key={key}
                  className={clsx(
                    level < 2 ? `relative ${paddingClass}` : "",
                    level === 2 ? "list-disc pl-6" : "list-none pl-0"
                  )}
                >
                  {level < 2 && (
                    <span className="absolute left-0 font-medium font-sans">
                      {displayPrefix}
                    </span>
                  )}
                  {hasTitle && (
                    <div
                      className="font-medium font-sans"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(t.raw(`${itemKey}.title`)),
                      }}
                    />
                  )}
                  {hasDescription && (
                    <p
                      className="whitespace-pre-line"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(
                          t.raw(`${itemKey}.description`)
                        ),
                      }}
                    />
                  )}

                  {hasSublist && (
                    <ul className="list-disc pl-6 mt-[10px] mb-[20px]">
                      {Object.keys(t.raw(`${itemKey}.sublist`)).map(
                        (subKey) => (
                          <li
                            key={subKey}
                            className="whitespace-pre-line"
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(
                                t.raw(`${itemKey}.sublist.${subKey}`)
                              ),
                            }}
                          />
                        )
                      )}
                    </ul>
                  )}
                </li>
              );
            }
          )}
        </ListComponent>
      )}
    </div>
  );
};

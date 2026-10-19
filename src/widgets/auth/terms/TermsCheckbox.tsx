import clsx from "clsx";
import { useTranslations } from "next-intl";
import { Link } from "src/i18n/routing";
import { memo } from "react";
import { useController, useFormContext } from "react-hook-form";
import { Checkbox } from "src/components/ui/checkbox";

interface IProps {
  name: string;
  className?: string;
}

export const TermsCheckbox = memo(({ name, className }: IProps) => {
  const t = useTranslations();
  const { control } = useFormContext();
  const {
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });

  return (
    <div className={clsx(className)}>
      <div>
        <div className="flex gap-[10px] items-center">
          <Checkbox id="terms" name={name} />
          <label htmlFor="terms" className="text-sm font-medium">
            {t.rich("common.acceptTermsAndConditions", {
              terms: (chunks) => (
                <Link
                  href="/terms-and-conditions"
                  about="_blank"
                  className="text-[#6396A6] underline"
                >
                  {chunks}
                </Link>
              ),
              privacy: (chunks) => (
                <Link
                  href="/privacy-policy"
                  about="_blank"
                  className="text-[#6396A6] underline"
                >
                  {chunks}
                </Link>
              ),
            })}
          </label>
        </div>
        {invalid && error && (
          <p className="text-red-500 text-sm mt-1 font-[Inter]">{t(error.message)}</p>
        )}
      </div>
    </div>
  );
});
TermsCheckbox.displayName = "TermsCheckbox";

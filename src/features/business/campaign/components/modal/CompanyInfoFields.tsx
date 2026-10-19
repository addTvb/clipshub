import { Input } from "src/components/ui/input";
import { Textarea } from "src/components/ui/textarea";
import type { Translate } from "../../types";

type CompanyInfoFieldsProps = {
  t: Translate;
};

export const CompanyInfoFields = ({ t }: CompanyInfoFieldsProps) => (
  <>
    <div className="flex flex-col gap-[10px]">
      <h4 className="text-base font-bold">{t("business.enterCompanyName")}</h4>
      <Input
        name="companyName"
        placeholder={t("business.companyName")}
        icon="/static/icons/portfolio.svg"
      />
    </div>

    <div className="flex flex-col gap-[10px]">
      <h4 className="text-base font-bold">{t("business.aboutYourCompany")}</h4>
      <Textarea
        name="aboutCompany"
        rows={4}
        placeholder={t("business.aboutYourCompanyPlaceholder")}
      />
    </div>
  </>
);


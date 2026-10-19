"use client";

import { useTranslations } from "next-intl";
import { Button } from "src/components/ui/button/button";
import { Modal } from "src/components/ui/dialog";
import { Divider } from "src/components/ui/divider";

interface IProps {
  open: boolean;
  setIsOpen: (open: boolean) => void;
}

export const BudgetInfoModal = ({ open, setIsOpen }: IProps) => {
  const t = useTranslations("business.offerForm");
  const handleClose = () => setIsOpen(false);

  const renderContent = () => {
    return (
      <>
        <div className="space-y-[10px]">
          <div className="text-base font-semibold">{t("budgetLimitSet")}</div>
          <div className="text-sm">
            {t.rich("budgetLimitSetDesc1", {
              bold: (chunks) => <strong>{chunks}</strong>,
            })}
          </div>
          <div className="text-sm">{t("budgetLimitSetDesc2")}</div>
        </div>

        <Divider />

        <div className="space-y-[10px]">
          <div className="text-base font-semibold">
            {t("budgetUnlimitForAdvanced")}
          </div>
          <div className="text-sm">
            {t.rich("budgetUnlimitForAdvancedDesc1", {
              bold: (chunks) => <strong>{chunks}</strong>,
            })}
          </div>
          <div className="text-sm">
            {t.rich("budgetUnlimitForAdvancedDesc2", {
              bold: (chunks) => <strong>{chunks}</strong>,
            })}
          </div>
        </div>

        <Divider />

        <div className="space-y-[10px]">
          <div className="text-base font-semibold">
            {t("howSpendingCalculated")}
          </div>
          <div className="text-sm">
            {t.rich("howSpendingCalculatedDesc", {
              bold: (chunks) => <strong>{chunks}</strong>,
            })}
          </div>
        </div>

        <div className="space-y-[10px]">
          <div className="text-base font-semibold">
            {t("checkFinalBalance")}
          </div>
          <div className="text-sm">
            {t.rich("checkFinalBalanceDesc", {
              bold: (chunks) => <strong>{chunks}</strong>,
            })}
          </div>
        </div>
      </>
    );
  };

  return (
    <Modal
      title={t("howBudgetWorksTitle")}
      open={open}
      setIsOpen={setIsOpen}
      withCross
      className="flex flex-col gap-[24px] max-w-[674px]"
      mobileBreakpoint={700}
      renderFooter={() => (
        <Button className="w-full" onClick={handleClose}>
          {t("understand")}
        </Button>
      )}
    >
      {renderContent()}
    </Modal>
  );
};

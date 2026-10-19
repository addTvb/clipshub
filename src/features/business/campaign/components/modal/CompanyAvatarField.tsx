import { useMemo } from "react";
import { DragAndDrop } from "src/components/ui/drag-and-drop";
import type { Translate } from "../../types";
import type { BrandAvatarState } from "../../model/useBrandPrefill";

type CompanyAvatarFieldProps = {
  t: Translate;
  brandAvatar: BrandAvatarState;
  onAvatarChange: (patch: Partial<BrandAvatarState>) => void;
};

export const CompanyAvatarField = ({
  t,
  brandAvatar,
  onAvatarChange,
}: CompanyAvatarFieldProps) => {
  const storeActions = useMemo(
    () => ({
      setFileID: (id?: number) => onAvatarChange({ id }),
      setFileLink: (link: string) => onAvatarChange({ link }),
      setFileName: (name: string) => onAvatarChange({ name }),
      fileID: brandAvatar.id,
      fileLink: brandAvatar.link,
      fileName: brandAvatar.name,
    }),
    [brandAvatar, onAvatarChange]
  );

  return (
    <div className="flex flex-col gap-[10px]">
      <h4 className="text-base font-bold">{t("business.companyAvatar")}</h4>
      <DragAndDrop name="companyAvatar" type="image" storeActions={storeActions} />
    </div>
  );
};


import AdTypeTooltipContent from "./AdTypeTooltipContent";
import { AdType } from "src/types/base";

interface IProps {
  adType: AdType;
  showLink?: boolean;
}

/**
 * Универсальный компонент tooltip для всех типов рекламы
 * Заменяет отдельные компоненты BannerTooltip, HalfScreenTooltip и т.д.
 */
export default function AdTypeTooltip({ adType, showLink = false }: IProps) {
  return <AdTypeTooltipContent adType={adType} showLink={showLink} />;
}

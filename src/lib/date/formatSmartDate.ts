import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import { useTranslations } from "next-intl";

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

export function formatSmartDate(
  dateStr: string,
  t: ReturnType<typeof useTranslations>
): string {
  const date = dayjs(dateStr);
  const now = dayjs();

  if (date.isSame(now, "day")) {
    const diffMinutes = now.diff(date, "minute");
    const diffHours = now.diff(date, "hour");
    if (diffMinutes < 1) return t("date.justNow");
    if (diffHours < 1) return t("date.ago", { time: `${diffMinutes}m` });
    return t("date.ago", { time: `${diffHours}h` });
  }
  if (date.isSame(now.subtract(1, "day"), "day")) {
    return t("date.yesterday");
  }
  if (now.diff(date, "day") < 7) {
    // День недели
    const dayOfWeek = date.format("dddd").toLowerCase();
    return t(`date.daysOfWeek.${dayOfWeek}`);
  }
  // Старше недели — форматируем как дату (можно через ICU)
  return t("date.dateFormat", { date: date.toDate() });
}
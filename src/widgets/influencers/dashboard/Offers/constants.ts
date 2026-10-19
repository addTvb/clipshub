import { PostStatusType } from "src/types/posts";

export type TabValue =
  | "active"
  | "needs-posting"
  | "moderation"
  | "archived"
  | "rejected"
  | "closed"
  | "revoked";

export const TAB_TO_STATUS_MAP: Record<TabValue, PostStatusType> = {
  active: "approved",
  "needs-posting": "created",
  moderation: "moderation",
  archived: "archived",
  rejected: "rejected",
  closed: "closed",
  revoked: "revoked",
} as const;

export const STATUS_TO_TAB_MAP: Record<PostStatusType, TabValue> = {
  approved: "active",
  created: "needs-posting",
  moderation: "moderation",
  archived: "archived",
  rejected: "rejected",
  closed: "closed",
  revoked: "revoked",
} as const;

export const DEFAULT_STATUS: PostStatusType = "approved";
export const DEFAULT_TAB: TabValue = "active";

export const ALL_STATUSES: readonly PostStatusType[] = [
  "created",
  "moderation",
  "approved",
  "archived",
  "rejected",
  "closed",
  "revoked",
] as const;

export const ALL_TABS: readonly TabValue[] = [
  "active",
  "needs-posting",
  "moderation",
  "archived",
  "rejected",
  "closed",
  "revoked",
] as const;


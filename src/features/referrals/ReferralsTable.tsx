import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "src/components/ui/table";
import { useTranslations } from "next-intl";
import { InvitedUser } from "src/types/influencers";
import { Avatar } from "src/features/auth/Avatar";
import Image from "next/image";
import clsx from "clsx";

interface IProps {
  data: InvitedUser[];
}

const ReferralCell = ({ user }: { user: InvitedUser["user"] }) => (
  <div className="flex items-center gap-3 w-max">
    <Avatar src={user?.icon?.link} userID={user?.id} width={44} height={44} />
    <span className="font-medium text-[16px]">
      {user?.name} {user?.surname}
    </span>
  </div>
);

const bgColors = {
  beginner: "bg-white50",
  small: "bg-refGradeSmallClipperTableBadge",
  medium: "bg-refGradeMediumClipperTableBadge",
  big: "bg-refGradeBigClipperTableBadge",
  influencer: "bg-refGradeInfluencerClipperTableBadge",
};

export const ReferralsTable = ({ data }: IProps) => {
  const t = useTranslations("influencer.referralProgram");

  return (
    <div className="bg-white mt-[32px] rounded-[12px] w-full overflow-x-auto space-y-[24px]">
      <div className="flex items-center gap-[10px] pt-[24px] pr-[24px] pl-[24px]">
        <h2 className="lg:text-[28px] text-xl font-bold">{t("table.title")}</h2>
        <span className="bg-gray200 text-textColor text-xs font-bold px-[6px] py-[4px] rounded-[8px]">
          {data?.length}
        </span>
      </div>
      <div>
        {!data || data.length <= 0 ? (
          <div className="flex w-full items-center justify-center font-[Inter] h-[150px] text-gray400 border-t">
            {t("youDontHaveReferrals")}
          </div>
        ) : (
          <div className="pb-[10px] pr-[10px] pl-[10px] sm:pb-[24px] sm:pr-[24px] sm:pl-[24px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="rounded-l-[8px]">
                    {t("table.referral")}
                  </TableHead>
                  <TableHead>{t("table.userType")}</TableHead>
                  <TableHead>{t("table.grade")}</TableHead>
                  {/* <TableHead>{t("table.joined")}</TableHead> */}
                  {/* <TableHead>{t("table.email")}</TableHead> */}
                  {/*  <TableHead>{t("table.subreferrals")}</TableHead> */}
                  <TableHead className="rounded-r-[8px]">
                    {t("table.profit")}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.map((item) => (
                  <TableRow key={item.user.id}>
                    <TableCell>
                      <ReferralCell user={item.user} />
                    </TableCell>
                    <TableCell className="capitalize">
                      {item.user.type}
                    </TableCell>
                    <TableCell className="capitalize">
                      {item.referral_level_slug ? (
                        <span
                          className={clsx(
                            "p-[4px] rounded-[10px] bg-white50 flex items-center gap-[6px] text-black400 font-[Inter] text-sm font-medium w-max",
                            bgColors[item.referral_level_slug]
                          )}
                        >
                          <Image
                            src={
                              item.referral_level_slug === "influencer"
                                ? "/static/icons/influencer-crown.svg"
                                : `/static/images/ref-grades/${item.referral_level_slug}.webp`
                            }
                            alt=""
                            width={22}
                            height={22}
                          />
                          <span>
                            {t(`grades.${item.referral_level_slug}`)}{" "}
                          </span>
                        </span>
                      ) : (
                        <>-</>
                      )}
                    </TableCell>
                    {/* <TableCell>{item.joined}</TableCell> */}
                    {/* <TableCell>{item.user.email}</TableCell> */}
                    {/*  <TableCell>{item.subreferrals}</TableCell> */}
                    <TableCell>${item.payment_sum}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
        {/* <Pagination paginate={paginate} /> */}
      </div>
    </div>
  );
};

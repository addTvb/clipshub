import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "src/components/ui/table";
import { useTranslations } from "next-intl";
import VisaIcon from "@icons/visa.svg";
import PaypalIcon from "@icons/paypal.svg";
import UsdtTrc20Icon from "@icons/usdt-trc20.svg";
import UsdtErc20Icon from "@icons/usdt-erc20.svg";
import CopyIcon from "@icons/copy.svg";
import LinkIcon from "@icons/link.svg";
import LinkIconSmall from "@icons/link-icon.svg";
import { toast } from "react-hot-toast";
import { WithdrawRequest } from "src/types/withdraw";
import { formatDate } from "src/lib/date/formatDate";
import { PaymentStatus } from "src/types/base";
import { RefillRequestItem } from "src/types/refill";
import { formatWalletAddress } from "src/lib/formatWalletAddress";
import { InfoPopover } from "src/components/ui/info-popover";
import { Button } from "src/components/ui/button/button";
import ApplePayIcon from "@icons/apple-pay-icon.svg";
import VisaMcIcon from "@icons/visa-mc.svg";

const TransactionStatus = ({ status }: { status: PaymentStatus }) => {
  const t = useTranslations("withdraw");
  let bgColor = "";
  let textColor = "";

  switch (status.toLowerCase()) {
    case "pending":
    case "processing":
      bgColor = "bg-gray200";
      textColor = "text-gray400";
      break;
    case "processed":
    case "completed":
    case "succeed":
      bgColor = "bg-green100";
      textColor = "text-white";
      break;
    case "rejected":
    case "failed":
      bgColor = "bg-[#FEE0E0]";
      textColor = "text-[#B13A3A]";
      break;
    default:
      bgColor = "bg-gray200";
      textColor = "text-gray400";
  }

  return (
    <div
      className={`${bgColor} text-[14px] font-bold ${textColor} rounded-[8px] px-[6px] py-[4px] w-fit`}
    >
      {t("transactionsTable.statusTypes." + status)}
    </div>
  );
};

const PaymentMethod = ({
  type,
  methodDetail,
}: {
  type: string;
  methodDetail?: string;
}) => {
  let icon = null;

  switch (type.toLowerCase()) {
    case "bank_account":
      icon = <VisaIcon width={26} hanging={26} />;
      break;
    case "paypal":
      icon = <PaypalIcon width={26} hanging={26} />;
      break;
    case "usdt_erc20":
      icon = <UsdtErc20Icon width={26} hanging={26} />;
      break;
    case "usdt_erc_20":
      icon = <UsdtErc20Icon width={26} hanging={26} />;
      break;
    case "usdt_trc20":
      icon = <UsdtTrc20Icon width={26} hanging={26} />;
      break;
    case "usdt_trc_20":
    case "crypto":
      icon = <UsdtTrc20Icon width={26} hanging={26} />;
      break;
    case "apple_pay":
      icon = <ApplePayIcon width={32} height={32} />;
      break;
    case "credit_card":
      icon = <VisaMcIcon width={26} height={26} />;
      break;
  }

  return (
    <div className="flex items-center gap-[6px]">
      {icon}
      <div className="text-[14px] font-[500] font-[Inter]">{methodDetail}</div>
    </div>
  );
};

const CopyButton = ({ text }: { text: string }) => {
  const t = useTranslations();
  return (
    <button
      className="flex items-center gap-[4px]"
      onClick={() => {
        navigator.clipboard.writeText(text);
        toast.success(t("common.copied"));
      }}
    >
      {formatWalletAddress(text, 3, 3, "...")}
      <CopyIcon width={12} hanging={12} className="flex-shrink-0" />
    </button>
  );
};

const TransactionHash = ({ hash, url }: { hash?: string; url?: string }) => {
  if (!hash || hash === "--") return <span>--</span>;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-[4px]"
    >
      {formatWalletAddress(hash, 3, 3, "...")}
      <LinkIcon width={12} height={12} />
    </a>
  );
};

const TransactionsTable = ({
  data,
}: {
  data: WithdrawRequest[] | RefillRequestItem[];
}) => {
  const withdrawT = useTranslations("withdraw");

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="rounded-l-[8px]">
            {withdrawT("transactionsTable.id")}
          </TableHead>
          <TableHead>{withdrawT("transactionsTable.method")}</TableHead>
          <TableHead>{withdrawT("transactionsTable.amount")}</TableHead>
          <TableHead>{withdrawT("transactionsTable.date")}</TableHead>
          <TableHead>
            <span className="flex items-center gap-[4px]">
              <span>{withdrawT("transactionsTable.hash")}</span>
              <InfoPopover>
                {withdrawT("transactionsTable.hashTooltip")}
              </InfoPopover>
            </span>
          </TableHead>
          <TableHead className="rounded-r-[8px]">
            {withdrawT("transactionsTable.status")}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => {
          const isWithdraw = "credentials" in item;
          return (
            <TableRow key={item.id}>
              <TableCell>
                <CopyButton text={item.id.toString()} />
              </TableCell>
              <TableCell>
                <PaymentMethod
                  type={
                    isWithdraw
                      ? item.credentials.withdraw_method_id
                      : item.method
                  }
                  methodDetail={
                    isWithdraw
                      ? String(
                          formatWalletAddress(
                            item?.credentials?.data?.wallet_address ||
                              item?.credentials?.data?.email ||
                              ""
                          )
                        )
                      : String(
                          formatWalletAddress(
                            (item?.metadata?.address as string) || ""
                          )
                        )
                  }
                />
              </TableCell>
              <TableCell>
                {isWithdraw ? item.amount : item.amount_usd} USD
              </TableCell>
              <TableCell>{formatDate(item.created_at)}</TableCell>
              <TableCell>
                {!isWithdraw && item?.metadata?.tx_hash ? (
                  <TransactionHash
                    hash={item?.metadata?.tx_hash as string}
                    url={`https://tronscan.org/#/transaction/${item?.metadata?.tx_hash}`}
                  />
                ) : (
                  <span>--</span>
                )}
              </TableCell>
              <TableCell>
                <span className="flex items-center gap-[7px]">
                  <TransactionStatus status={item.status} />
                  {item.status === "pending" &&
                    ((item as RefillRequestItem)?.metadata
                      ?.payment_url as string) && (
                      <Button
                        href={
                          (item as RefillRequestItem)?.metadata
                            ?.payment_url as string
                        }
                        target="_blank"
                        variant="outline"
                        className="rounded-[8px] px-[6px] py-[4px] border-blue300 text-blue300 text-sm font-bold flex items-center gap-[4px] h-fit hover:border-blue400 hover:text-blue400"
                      >
                        <span>{withdrawT("pay")}</span>
                        <LinkIconSmall
                          width={14}
                          height={14}
                          className="text-inherit transition-colors"
                        />
                      </Button>
                    )}
                </span>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default TransactionsTable;

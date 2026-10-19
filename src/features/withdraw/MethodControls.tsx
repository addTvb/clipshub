import { useState, useEffect } from "react";
import { Button } from "src/components/ui/button/button";
import MoreOptionsButton from "src/components/ui/more-options-button";
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "src/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "src/components/ui/popover";
import TrashIcon from "@icons/trash-red.svg";
import VisaIcon from "@icons/visa.svg";
import PaypalIcon from "@icons/paypal.svg";
import UsdtTrc20Icon from "@icons/usdt-trc20.svg";
import { useTranslations } from "next-intl";
import EditConfirmButton from "src/components/ui/edit-confirm-button";
import { useRef } from "react";
import { WithdrawCreditial } from "src/types/withdraw";
import { useDeleteWithdrawCreditial } from "src/queries/withdraw/useDeleteWithdrawCreditial";
import { useUpdateWithdrawCreditial } from "src/queries/withdraw/useUpdateWithdrawCreditial";
import { PaymentMethodType } from "src/types/base";

type FormValues = {
  comment: string;
};


const PaymentMethod = ({
  type,
  methodDetail,
  className,
}: {
  type: PaymentMethodType;
  methodDetail?: string;
  className?: string;
}) => {
  let icon = null;

  switch (type.toLowerCase()) {
    case "bank_account":
      icon = <VisaIcon width={26} hanging={26} />;
      break;
    case "paypal":
      icon = <PaypalIcon width={26} hanging={26} />;
      break;
    case "usdt_trc20":
      icon = <UsdtTrc20Icon width={26} hanging={26} />;
      break;
  }

  return (
    <div className={`flex items-center gap-[6px] ${className}`}>
      <div className="py-[2px] px-[6px] rounded-[6px] bg-white">{icon}</div>
      <div className="text-[14px] font-[500] font-[Inter]">{methodDetail}</div>
    </div>
  );
};

interface IProps {
  selectedMethod: WithdrawCreditial | null;
}

const MethodControls = ({ selectedMethod }: IProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [comment, setComment] = useState(selectedMethod?.comment || "");
  const [tempComment, setTempComment] = useState(selectedMethod?.comment || "");
  const withdrawT = useTranslations("withdraw");
  const { mutate: deleteWithdrawCreditial } = useDeleteWithdrawCreditial();
  const { mutate: updateWithdrawCreditial } = useUpdateWithdrawCreditial();

  const methods = useForm<FormValues>({
    defaultValues: {
      comment: selectedMethod?.comment || "",
    },
  });

  useEffect(() => {
    const newComment = selectedMethod?.comment || "";
    setComment(newComment);
    setTempComment(newComment);
    methods.reset({ comment: newComment });
  }, [selectedMethod, methods]);

  const handleEditToggle = () => {
    if (isEditing) {
      setComment(tempComment);
      setIsEditing(false);
      methods.handleSubmit(methodCommentSubmit)();
    } else {
      setTempComment(comment);
      setIsEditing(true);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  };

  const methodCommentSubmit = (data: FormValues) => {
    if (selectedMethod) {
      updateWithdrawCreditial({
        id: selectedMethod.id,
        body: {
          comment: data.comment,
        },
      });
    }
    setIsEditing(false);
  };
  

  return (
    <div className="md:flex flex-row-reverse contents">
      <Popover>
        <PopoverTrigger className="w-fit ml-auto">
          <MoreOptionsButton />
        </PopoverTrigger>
        <PopoverContent align="end" className="p-[10px] text-gray400 font-medium text-sm w-fit">
          <ul className="flex flex-col gap-[10px]">
            <li>
              <Button variant="text" size="icon" onClick={() => {
                if (selectedMethod) {
                  deleteWithdrawCreditial({ id: selectedMethod.id });
                }
              }}>
                <TrashIcon /> {withdrawT("methodControls.delete")}
              </Button>
            </li>
          </ul>
        </PopoverContent>
      </Popover>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(methodCommentSubmit)}
          className="w-full col-span-2 md:col-span-1 md:bg-transparent bg-white50  rounded-[8px] px-[6px] py-[6px]"
        >
          <div className="flex items-center justify-between md:justify-start gap-[12px] break-all">
            {
              selectedMethod && (
                <PaymentMethod
                  type={selectedMethod.withdraw_method_id}
                  methodDetail={selectedMethod?.data.wallet_address || selectedMethod?.data.email || ""}
                  className="md:hidden"
                />
              )
            }
            <div className="flex items-center gap-[12px]">
              <Input
                ref={inputRef}
                name="comment"
                inputClassName="bg-transparent border-none p-0 h-auto leading-[20px] text-[14px] font-[500] font-[Inter] text-gray400 text-right focus:outline-none focus:border-none focus:bg-transparent focus-visible:shadow-none focus-visible:border-none disabled:opacity-100"
                disabled={!isEditing}
                placeholder={withdrawT("methodControls.commentPlaceholder")}
              />
              <EditConfirmButton
                isEditing={isEditing}
                onClick={handleEditToggle}
              />
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default MethodControls;

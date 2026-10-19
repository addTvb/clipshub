import { Button } from "src/components/ui/button/button";
import EditIcon from "@icons/edit.svg";
import CheckIcon from "@icons/marker.svg";

type EditConfirmButtonProps = {
  isEditing: boolean;
  onClick: () => void;
  className?: string;
};

const EditConfirmButton = ({ isEditing, onClick, className }: EditConfirmButtonProps) => (
  <Button
    variant="outline"
    size="icon"
    className={`rounded-full size-[28px] mr-1 ${className || ""}`}
    onClick={onClick}
  >
    {isEditing ? <CheckIcon /> : <EditIcon />}
  </Button>
);

export default EditConfirmButton;

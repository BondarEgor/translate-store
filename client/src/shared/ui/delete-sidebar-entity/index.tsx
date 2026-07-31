import { useState } from "react";
import { TrashIcon } from "@radix-ui/react-icons";
import { IconButton, Tooltip } from "@radix-ui/themes";
import { ConfirmDialog } from "@/shared/ui/confirm-dialog";

type Props = {
  entityName: string;
  entityType: string;
  onConfirm: () => void;
};

export const DeleteEntityButton = ({ entityName, entityType, onConfirm }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Tooltip content={`Удалить ${entityType}`}>
        <IconButton
          size="1"
          variant="ghost"
          color="gray"
          aria-label={`Удалить ${entityType} ${entityName}`}
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(true);
          }}
        >
          <TrashIcon />
        </IconButton>
      </Tooltip>

      <ConfirmDialog
        open={isOpen}
        title={`Удалить ${entityType} ${entityName}?`}
        description="Все связанные переводы будут удалены безвозвратно."
        onConfirm={onConfirm}
        onOpenChange={setIsOpen}
      />
    </>
  );
};

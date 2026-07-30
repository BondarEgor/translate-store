import { ConfirmDialog } from "@/components/confirm-dialog";
import { TrashIcon } from "@radix-ui/react-icons";
import { IconButton, Tooltip } from "@radix-ui/themes";
import { useState } from "react";

export const DeleteEntityButton = ({ onConfirm }: { onConfirm: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Tooltip content="Удалить язык">
        <IconButton
          size="1"
          variant="ghost"
          color="gray"
          aria-label={`Удалить язык `}
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
        title={`Удалить язык ?`}
        description="Язык и все его переводы будут удалены безвозвратно."
        onConfirm={onConfirm}
        onOpenChange={setIsOpen}
      />
    </>
  );
};

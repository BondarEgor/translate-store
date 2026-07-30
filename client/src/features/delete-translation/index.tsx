import { ConfirmDialog } from "@/components/confirm-dialog";
import { translationsApi } from "@/entities/translations/api";
import { TrashIcon } from "@radix-ui/react-icons";
import { Tooltip, IconButton } from "@radix-ui/themes";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export const DeleteTranslation = ({
  keyName,
  locale,
  onDeleteTranslation,
}: {
  keyName: string;
  locale: string;
  onDeleteTranslation: (locale: string, key: string) => void;
}) => {
  const [open, setOpen] = useState(false);

  const { isPending, mutate } = useMutation({
    mutationFn: () => translationsApi.remove(locale, keyName),
    onMutate: () => onDeleteTranslation(locale, keyName),
  });

  return (
    <>
      <Tooltip content="Удалить ключ">
        <IconButton
          size="1"
          variant="ghost"
          color="gray"
          aria-label={`Удалить ключ ${keyName}`}
          onClick={() => setOpen(true)}
        >
          <TrashIcon />
        </IconButton>
      </Tooltip>

      <ConfirmDialog
        open={open}
        loading={isPending}
        onOpenChange={setOpen}
        onConfirm={mutate}
        title={`Удалить ключ ${keyName}?`}
        description="Ключ исчезнет из всех языков сразу."
      />
    </>
  );
};

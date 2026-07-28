import { Dialog, TextField, Flex, Button } from "@radix-ui/themes";
import { useState, useEffect } from "react";
import { ConfirmDialog } from "../confirm-dialog";
import { Actions } from "@/store";

export const AddNamespaceDialog = ({
  dialog,
  onClose,
  actions,
}: {
  dialog: { mode: "add" } | { mode: "edit"; name: string } | null;
  onClose: () => void;
  actions: Actions;
}) => {
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    setName(dialog?.mode === "edit" ? dialog.name : "");
    setConfirmDelete(false);
  }, [dialog]);

  const editName = dialog?.mode === "edit" ? dialog.name : null;

  const submit = async () => {
    const trimmed = name.trim();
    if (!trimmed || busy) return;
    setBusy(true);
    let ok = false;
    if (dialog?.mode === "add") {
      ok = (await actions.addNamespace({ name: trimmed })).status === "added";
    } else if (editName) {
      ok =
        trimmed === editName ||
        (await actions.renameNamespace({ from: editName, to: trimmed }))
          .status === "renamed";
    }
    setBusy(false);
    if (ok) onClose();
  };

  return (
    <>
      <Dialog.Root open={dialog !== null} onOpenChange={(o) => !o && onClose()}>
        <Dialog.Content maxWidth="380px">
          <Dialog.Title>
            {editName ? `Таблица ${editName}` : "Новая таблица"}
          </Dialog.Title>
          <Dialog.Description size="2">
            {editName
              ? "Переименование затронет переводы на всех языках."
              : "Имя станет префиксом ключей: таблица.ключ"}
          </Dialog.Description>
          <TextField.Root
            autoFocus
            mt="3"
            value={name}
            placeholder="например, home или Общее"
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && void submit()}
          />
          <Flex gap="3" mt="4" justify={editName ? "between" : "end"}>
            {editName && (
              <Button
                color="red"
                variant="soft"
                onClick={() => setConfirmDelete(true)}
              >
                Удалить таблицу
              </Button>
            )}
            <Button
              highContrast
              loading={busy}
              disabled={!name.trim()}
              onClick={() => void submit()}
            >
              {editName ? "Переименовать" : "Создать"}
            </Button>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>

      <ConfirmDialog
        open={confirmDelete}
        onOpenChange={setConfirmDelete}
        title={`Удалить таблицу ${editName}?`}
        description="Таблица исчезнет из всех языков вместе со всеми ключами."
        onConfirm={() => {
          if (editName) void actions.deleteNamespace({ name: editName });
          onClose();
        }}
      />
    </>
  );
};

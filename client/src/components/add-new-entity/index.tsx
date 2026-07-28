import { Dialog, TextField, Flex, Button } from "@radix-ui/themes";
import { useState } from "react";

type Props = {
  title: string;
  description?: string;
  primaryBtn: string;
  secondaryBtn: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (newEntity: string) => void;
};

export const AddNewEntityModal = ({
  open,
  onOpenChange,
  onConfirm,
  title,
  description,
  primaryBtn,
  secondaryBtn,
}: Props) => {
  const [entityName, setEntityName] = useState("");

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content maxWidth="380px">
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Description size="2">{description}</Dialog.Description>

        <TextField.Root
          autoFocus
          mt="3"
          value={entityName}
          placeholder="Введите название"
          style={{ fontFamily: "monospace" }}
          onChange={(e) => setEntityName(e.target.value)}
        />

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              {secondaryBtn}
            </Button>
          </Dialog.Close>
          <Button
            highContrast
            disabled={!entityName.trim()}
            onClick={() => onConfirm(entityName)}
          >
            {primaryBtn}
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

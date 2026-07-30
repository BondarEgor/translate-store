import { Dialog, TextField, Flex, Button, Select } from "@radix-ui/themes";
import { useState } from "react";

type Props = {
  title: string;
  description?: string;
  primaryBtn: string;
  secondaryBtn: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (newEntity: string) => void;
  options?: Record<string, string>;
};

export const AddNewEntityModal = ({
  open,
  onOpenChange,
  onConfirm,
  title,
  description,
  primaryBtn,
  secondaryBtn,
  options,
}: Props) => {
  const [entityName, setEntityName] = useState("");

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content maxWidth="380px">
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Description size="2">{description}</Dialog.Description>

        {options ? (
          <Select.Root value={entityName} onValueChange={setEntityName}>
            <Select.Trigger mt="3" placeholder="Выберите язык" style={{ width: "100%" }} />
            <Select.Content position="item-aligned" style={{ maxHeight: 280 }}>
              {Object.entries(options).map(([code, name]) => (
                <Select.Item key={code} value={code}>
                  {code} — {name}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
        ) : (
          <TextField.Root
            autoFocus
            mt="3"
            value={entityName}
            placeholder="Введите название"
            style={{ fontFamily: "monospace" }}
            onChange={(e) => setEntityName(e.target.value)}
          />
        )}

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              {secondaryBtn}
            </Button>
          </Dialog.Close>
          <Button disabled={!entityName.trim()} onClick={() => onConfirm(entityName)}>
            {primaryBtn}
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

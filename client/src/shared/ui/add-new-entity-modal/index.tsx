import { useState } from "react";
import { Button, Dialog, Flex, ScrollArea, TextField } from "@radix-ui/themes";
import css from "./styles.module.css";

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
          <ScrollArea type="auto" mt="3" className={css.options}>
            <Flex direction="column" gap="1" pr="2">
              {Object.entries(options).map(([code, name]) => (
                <Button
                  key={code}
                  variant={entityName === code ? "soft" : "ghost"}
                  color={entityName === code ? undefined : "gray"}
                  onClick={() => setEntityName(code)}
                  className={css.option}
                >
                  {code} — {name}
                </Button>
              ))}
            </Flex>
          </ScrollArea>
        ) : (
          <TextField.Root
            autoFocus
            mt="3"
            value={entityName}
            placeholder="Введите название"
            className={css.input}
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

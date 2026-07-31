import { useState } from "react";
import { PlusIcon } from "@radix-ui/react-icons";
import { Text } from "@radix-ui/themes";
import { AddNewEntityModal } from "@/shared/ui/add-new-entity-modal";
import { NavRow } from "@/shared/ui/nav-row";

type Props = {
  onConfirm: (entityName: string) => void;
  label: string;
  title: string;
  description?: string;
  primaryBtn: string;
  secondaryBtn: string;
  options?: Record<string, string>;
};

export const AddNewSidebarEntityItem = ({
  description,
  title,
  primaryBtn,
  secondaryBtn,
  options,
  label,
  onConfirm,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <AddNewEntityModal
        description={description}
        title={title}
        primaryBtn={primaryBtn}
        secondaryBtn={secondaryBtn}
        options={options}
        open={isOpen}
        onOpenChange={setIsOpen}
        onConfirm={(entityName) => {
          onConfirm(entityName);
          setIsOpen(false);
        }}
      />

      <NavRow onClick={() => setIsOpen(true)}>
        <PlusIcon />
        <Text color="gray">{label}</Text>
      </NavRow>
    </>
  );
};

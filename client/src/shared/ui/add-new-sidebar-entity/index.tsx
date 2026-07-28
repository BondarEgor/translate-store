import { AddNewEntityModal } from "@/components/add-new-entity";
import { NavRow } from "@/components/naw-row";
import { PlusIcon } from "@radix-ui/react-icons";
import { Text } from "@radix-ui/themes";
import { useState } from "react";

type Props = {
  onConfirm: (entityName: string) => void;
  label: string;
  title: string;
  description?: string;
  primaryBtn: string;
  secondaryBtn: string;
};

export const AddNewSidebarEntityItem = ({
  description,
  title,
  primaryBtn,
  secondaryBtn,
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

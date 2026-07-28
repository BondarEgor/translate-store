import { AddNewSidebarEntityItem } from "@/shared/ui/add-new-sidebar-entity";
import { useMutation } from "@tanstack/react-query";

export const AddNamespace = ({
  onAddSuccess,
}: {
  onAddSuccess: (newNamespace: string) => void;
}) => {
  const submit = async (newNamespace: string) => {
    return fetch("http://localhost:3001/api/namespaces", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        namespace: newNamespace,
      }),
    }).then((r) => r.json());
  };

  const { mutate } = useMutation({
    mutationFn: submit,
    onSuccess: (newNamespace) => {
      console.log(newNamespace);
      onAddSuccess(newNamespace.name);
    },
    mutationKey: ["add namespace"],
  });

  return (
    <AddNewSidebarEntityItem
      onConfirm={mutate}
      title="Новая таблица"
      primaryBtn="Добавить таблицу"
      secondaryBtn="Отмена"
      label="Добавить таблицу"
    />
  );
};

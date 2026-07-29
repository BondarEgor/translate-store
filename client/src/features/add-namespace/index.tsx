import { namespacesApi } from "@/entities/namespaces/api";
import { AddNewSidebarEntityItem } from "@/shared/ui/add-new-sidebar-entity";
import { useMutation } from "@tanstack/react-query";

export const AddNamespace = ({
  onAddSuccess,
}: {
  onAddSuccess: (newNamespace: string) => void;
}) => {
  const { mutate } = useMutation({
    mutationFn: namespacesApi.create,
    onSuccess: (newNamespace) => {
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

import { namespacesApi } from "@/entities/namespaces/api";
import { AddNewSidebarEntityItem } from "@/shared/ui/add-new-sidebar-entity";
import { useMutation } from "@tanstack/react-query";

export const AddNamespace = ({
  onAddNamespace,
}: {
  onAddNamespace: (newNamespace: string) => void;
}) => {
  const { mutate } = useMutation({
    onMutate: (namespace) => onAddNamespace(namespace),
    mutationFn: namespacesApi.create,
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

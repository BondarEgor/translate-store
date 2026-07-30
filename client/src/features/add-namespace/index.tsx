import { namespacesApi } from "@/entities/namespaces/api";
import { Namespace } from "@/entities/namespaces/types";
import { AddNewSidebarEntityItem } from "@/shared/ui/add-new-sidebar-entity";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const AddNamespace = ({
  onAddNamespace,
  onSuccess,
}: {
  onAddNamespace: (newNamespace: string) => void;
  onSuccess: (namespace: Namespace) => void;
}) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    onMutate: (namespace) => onAddNamespace(namespace),
    mutationFn: namespacesApi.create,
    onSuccess: (namespace) => {
      queryClient.invalidateQueries({ queryKey: ["namespaces"] });
      onSuccess(namespace);
    },
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

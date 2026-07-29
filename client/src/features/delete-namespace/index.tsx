import { namespacesApi } from "@/entities/namespaces/api";
import { DeleteEntityButton } from "@/shared/ui/delete-sidebar-entity";
import { useMutation } from "@tanstack/react-query";

type Props = {
  onDeleteSuccess: (language: string) => void;
  namespace: string;
};

export const DeleteNamespace = ({ namespace, onDeleteSuccess }: Props) => {
  const { mutate } = useMutation({
    mutationFn: () => namespacesApi.remove(namespace),
    onSuccess: () => onDeleteSuccess(namespace),
    mutationKey: ["delete namespace"],
  });

  return <DeleteEntityButton onConfirm={mutate} />;
};

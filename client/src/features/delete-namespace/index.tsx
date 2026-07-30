import { namespacesApi } from "@/entities/namespaces/api";
import { DeleteEntityButton } from "@/shared/ui/delete-sidebar-entity";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
  onDeleteNamespace: (language: string) => void;
  namespace: string;
};

export const DeleteNamespace = ({ namespace, onDeleteNamespace }: Props) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () => namespacesApi.remove(namespace),
    onMutate: () => onDeleteNamespace(namespace),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["namespaces"] }),
  });

  return <DeleteEntityButton onConfirm={mutate} />;
};

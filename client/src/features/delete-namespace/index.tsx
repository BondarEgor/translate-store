import { DeleteEntityButton } from "@/shared/ui/delete-sidebar-entity";
import { useMutation } from "@tanstack/react-query";

type Props = {
  onDeleteSuccess: (language: string) => void;
  namespace: string;
};

export const DeleteNamespace = ({ namespace, onDeleteSuccess }: Props) => {
  const submit = async () => {
    fetch("http://localhost:3001/api/namespaces", {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ namespace }),
    });
  };

  const { mutate } = useMutation({
    mutationFn: submit,
    onSuccess: () => onDeleteSuccess(namespace),
    mutationKey: ["delete namespace"],
  });

  return <DeleteEntityButton onConfirm={mutate} />;
};

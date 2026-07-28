import { DeleteEntityButton } from "@/shared/ui/delete-sidebar-entity";
import { useMutation } from "@tanstack/react-query";

type Props = {
  onDeleteSuccess: (language: string) => void;
  language: string;
};

export const DeleteLanguage = ({ language, onDeleteSuccess }: Props) => {
  const submit = async () => {
    fetch("http://localhost:3001/api/locales", {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        code: language,
      }),
    });
  };

  const { mutate } = useMutation({
    mutationFn: submit,
    onSuccess: () => onDeleteSuccess(language),
    mutationKey: ["delete language"],
  });

  return <DeleteEntityButton onConfirm={mutate} />;
};

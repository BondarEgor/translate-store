import { AddNewSidebarEntityItem } from "@/shared/ui/add-new-sidebar-entity";
import { useMutation } from "@tanstack/react-query";

export const AddNewLanguage = ({
  onAddSuccess,
}: {
  onAddSuccess: (language: string) => void;
}) => {
  const submit = async (newLanguage: string) => {
    return fetch("http://localhost:3001/api/locales", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        code: newLanguage,
      }),
    }).then((r) => r.json());
  };

  const { mutate } = useMutation({
    mutationFn: submit,
    onSuccess: ({ code }) => onAddSuccess(code),
    mutationKey: ["add language"],
  });

  return (
    <AddNewSidebarEntityItem
      onConfirm={(newLanguage) => mutate(newLanguage)}
      description="Все существующие ключи сразу появятся в новом языке."
      title="Новый язык"
      primaryBtn="Добавить язык"
      secondaryBtn="Отмена"
      label="Языки"
    />
  );
};

import { localesApi } from "@/entities/locales/api";
import { LOCALE_RU } from "@/constants/locales";
import { AddNewSidebarEntityItem } from "@/shared/ui/add-new-sidebar-entity";
import { useMutation } from "@tanstack/react-query";

export const AddNewLanguage = ({ onAddLocale }: { onAddLocale: (language: string) => void }) => {
  const { mutate } = useMutation({
    mutationFn: localesApi.create,
    onMutate: (locale) => onAddLocale(locale),
    mutationKey: ["add language"],
  });
  return (
    <AddNewSidebarEntityItem
      onConfirm={(newLanguage) => mutate(newLanguage)}
      description="Все существующие ключи сразу появятся в новом языке."
      options={LOCALE_RU}
      title="Новый язык"
      primaryBtn="Добавить язык"
      secondaryBtn="Отмена"
      label="Добавить язык"
    />
  );
};

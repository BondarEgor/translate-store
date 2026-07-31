import { translationsApi } from "@/entities/translations/api";
import { useAppMutation } from "@/shared/hooks/use-app-mutation";
import { TranslationValueCell } from "@/shared/ui/translation-value-cell";
import { Translation } from "@/entities/translations/types";

export const EditTranslation = ({
  value,
  namespace,
  locale,
  translateKey,
  onUpdateTranslation,
}: {
  onUpdateTranslation: (update: Translation) => void;
  value: string;
  namespace: string;
  locale: string;
  translateKey: string;
}) => {
  const { mutate } = useAppMutation({
    onMutate: (newValue) =>
      onUpdateTranslation({
        namespace,
        key: translateKey,
        locale,
        value: newValue,
      }),
    mutationFn: async (newValue: string) =>
      translationsApi.update({
        namespace,
        locale,
        key: translateKey,
        value: newValue,
      }),
  });

  return <TranslationValueCell value={value} onSave={(value) => mutate(value)} />;
};

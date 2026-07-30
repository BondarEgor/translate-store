import { translationsApi } from "@/entities/translations/api";
import { Translation } from "@/entities/translations/types";
import { useAppMutation } from "@/shared/hooks/use-app-mutation";
import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";

type Props = {
  queryItem: {
    key: string;
    value: string;
    namespace: string;
    locale: string;
  };
  disabled: boolean;
  onAddSuccess: (newTranslation: Translation) => void;
};

export const AddTranslation = ({ queryItem, disabled, onAddSuccess }: Props) => {
  const { mutate, isPending } = useAppMutation({
    onMutate: () => onAddSuccess(queryItem),
    mutationFn: () => translationsApi.create(queryItem),
    onSuccess: onAddSuccess,
  });

  return (
    <Button highContrast loading={isPending} disabled={disabled} onClick={() => mutate()}>
      <PlusIcon />
      Добавить ключ
    </Button>
  );
};

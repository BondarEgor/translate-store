import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import { translationsApi } from "@/entities/translations/api";
import { Translation } from "@/entities/translations/types";
import { useAppMutation } from "@/shared/hooks/use-app-mutation";

type QueryItem = {
  key: string;
  value: string;
  namespace: string;
  locale: string;
};

type Props = {
  queryItem: QueryItem;
  invalid: boolean;
  onInvalid: () => void;
  onAddSuccess: (newTranslation: Translation) => void;
};

export const AddTranslation = ({ queryItem, invalid, onInvalid, onAddSuccess }: Props) => {
  const { mutate, isPending } = useAppMutation({
    onMutate: (item) => onAddSuccess(item),
    mutationFn: (item: QueryItem) => translationsApi.create(item),
    onSuccess: onAddSuccess,
  });

  const onSubmit = () => {
    const item = { ...queryItem, key: queryItem.key.trim(), value: queryItem.value.trim() };

    if (invalid || !item.key || !item.value) {
      onInvalid();
      return;
    }

    mutate(item);
  };

  return (
    <Button loading={isPending} onClick={onSubmit}>
      <PlusIcon />
      Добавить ключ
    </Button>
  );
};

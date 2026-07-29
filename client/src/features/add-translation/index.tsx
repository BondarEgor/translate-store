import { translationsApi } from "@/entities/translations/api";
import { Translation } from "@/entities/translations/types";
import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

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
  const { mutate, isPending } = useMutation({
    mutationFn: () => translationsApi.create(queryItem),
    onSuccess: onAddSuccess,
    onError: (e) => {
      toast(e.message);
    },
    mutationKey: ["add key value", queryItem],
  });

  return (
  <Button highContrast loading={isPending} disabled={disabled} onClick={() => mutate()}>
      <PlusIcon />
      Добавить ключ
    </Button>
  );
};

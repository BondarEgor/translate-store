import { translationsApi } from "@/entities/translations/api";
import { Button } from "@radix-ui/themes";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
  namespace: string;
  sourceLocale: string;
  keyName: string;
  value?: string;
};

export const PullTranslation = ({ namespace, sourceLocale, keyName, value }: Props) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      translationsApi.updateAll({ namespace, locale: sourceLocale, key: keyName, value: value! }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["translations", namespace] }),
  });

  return (
    <Button
      size="1"
      variant="outline"
      color="gray"
      loading={isPending}
      disabled={!value}
      onClick={() => mutate()}
    >
      Подтянуть
    </Button>
  );
};

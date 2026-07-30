import { localesApi } from "@/entities/locales/api";
import { DeleteEntityButton } from "@/shared/ui/delete-sidebar-entity";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
  onDeleteLocale: (locale: string) => void;
  locale: string;
};

export const DeleteLanguage = ({ locale, onDeleteLocale }: Props) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () => localesApi.remove(locale),
    onMutate: () => onDeleteLocale(locale),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["locales"] }),
    mutationKey: ["delete language"],
  });

  return <DeleteEntityButton onConfirm={mutate} />;
};

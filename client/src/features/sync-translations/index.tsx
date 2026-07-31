import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { translationsApi } from "@/entities/translations/api";
import { useAppMutation } from "@/shared/hooks/use-app-mutation";

export const SyncTranslations = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useAppMutation({
    mutationFn: translationsApi.sync,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["translations"] });
      toast.success("Переводы синхронизированы");
    },
  });

  return (
    <Button variant="outline" color="gray" loading={isPending} onClick={() => mutate()}>
      <ReloadIcon />
      Синхронизировать
    </Button>
  );
};

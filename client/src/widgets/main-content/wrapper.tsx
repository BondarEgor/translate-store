import { translationsApi } from "@/entities/translations/api";
import { KeysTable } from "../keys-table";
import { useAppQuery } from "@/shared/hooks/use-app-query";
import { Locales } from "@/entities/locales/types";

export const KeyTablesWrapper = ({
  locales,
  activeNamespace,
  activeLocale,
}: {
  activeNamespace: string;
  activeLocale: string;
  locales: Locales;
}) => {
  const { data: translations, isLoading: translationsLoading } = useAppQuery({
    queryKey: ["translations", activeNamespace],
    queryFn: () => translationsApi.getAllForNameSpace(activeNamespace),
  });

  if (translationsLoading) {
    return "Loading..";
  }

  return (
    <KeysTable
      locales={locales}
      translations={translations}
      activeNamespace={activeNamespace}
      activeLocale={activeLocale}
    />
  );
};

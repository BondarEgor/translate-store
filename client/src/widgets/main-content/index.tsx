import { KeyTablesWrapper } from "./wrapper";
import { EmptyState } from "@/shared/ui/empty-state";
import { Locales } from "@/entities/locales/types";

export const MainContent = ({
  activeNamespace,
  activeLocale,
  locales,
}: {
  activeNamespace: string | null;
  activeLocale: string | null;
  locales: Locales;
}) => {
  if (!activeNamespace || !activeLocale) {
    return <EmptyState text="Выберите таблицу и язык" />;
  }

  return (
    <KeyTablesWrapper
      activeNamespace={activeNamespace}
      activeLocale={activeLocale}
      locales={locales}
    />
  );
};

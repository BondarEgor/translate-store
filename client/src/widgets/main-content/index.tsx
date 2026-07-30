import { KeyTablesWrapper } from "./wrapper";
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
  if (!activeNamespace || !activeLocale) return "Empty";

  return (
    <KeyTablesWrapper
      activeNamespace={activeNamespace}
      activeLocale={activeLocale}
      locales={locales}
    />
  );
};

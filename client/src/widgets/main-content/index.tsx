import { KeyTablesWrapper } from "./wrapper";
import { Locales } from "@/entities/locales/types";

export const MainContent = ({
  activeNamespace,
  locales,
}: {
  activeNamespace: string | null;
  locales: Locales;
}) => {
  if (!activeNamespace) return "Empty";

  return <KeyTablesWrapper activeNamespace={activeNamespace} locales={locales} />;
};

import { useQuery } from "@tanstack/react-query";
import { localesApi } from "./entities/locales/api";
import { namespacesApi } from "./entities/namespaces/api";
import { useState } from "react";
import { useAppQuery } from "./shared/hooks/use-app-query";

export const useBootstrap = () => {
  const [activeNs, setActiveNs] = useState<string | null>(null);
  const [selectedLocale, setSelectedLocale] = useState<string | null>(null);

  const { data: namespaces, isLoading: namespacesLoading } = useAppQuery({
    queryKey: ["namespaces"],
    queryFn: namespacesApi.getAll,
  });

  const { data: locales, isLoading: localesLoading } = useQuery({
    queryKey: ["locales"],
    queryFn: localesApi.getAll,
  });

  const activeLocale = locales?.some((l) => l.code === selectedLocale)
    ? selectedLocale
    : (locales?.find((l) => l.isDefault)?.code ?? null);

  const derivedActiveNs = namespaces?.some((n) => n.name === activeNs)
    ? activeNs
    : (namespaces?.[0]?.name ?? null);

  const isLoading = namespacesLoading || localesLoading;

  return {
    namespaces,
    activeNs: derivedActiveNs,
    onSelectNs: setActiveNs,
    locales,
    activeLocale,
    onSelectLocale: setSelectedLocale,
    isAppLoading: isLoading,
  };
};

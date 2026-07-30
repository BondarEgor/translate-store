import { useQuery } from '@tanstack/react-query';
import { localesApi } from './entities/locales/api';
import { namespacesApi } from './entities/namespaces/api';
import { useState } from 'react';
import { useAppQuery } from './shared/hooks/use-app-query';

export const useBootstrap = () => {
  const [activeNs, setActiveNs] = useState<string | null>(null);

  const { data: namespaces, isLoading: namespacesLoading } = useAppQuery({
    queryKey: ["namespaces"],
    queryFn: namespacesApi.getAll,
  });

  const { data: locales, isLoading: localesLoading } = useQuery({
    queryKey: ["locales"],
    queryFn: localesApi.getAll,
  });

  const isLoading = namespacesLoading || localesLoading;

  return {
    namespaces,
    activeNs,
    onSelectNs: setActiveNs,
    locales,
    isAppLoading: isLoading
  };
};
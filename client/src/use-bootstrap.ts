import { useQuery } from '@tanstack/react-query';
import { localesApi } from './entities/locales/api';
import { namespacesApi } from './entities/namespaces/api';
import { translationsApi } from './entities/translations/api';

export const useBootstrap = () => {
  const { data: translations, isLoading: translationsLoading } = useQuery({
    queryKey: ["translations"],
    queryFn: () => translationsApi.getAllForNameSpace('test'),
  });

  const { data: namespaces, isLoading: namespacesLoading } = useQuery({
    queryKey: ["namespaces"],
    queryFn: namespacesApi.getAll,
  });

  const { data: locales, isLoading: localesLoading } = useQuery({
    queryKey: ["locales"],
    queryFn: localesApi.getAll,
  });

  const isLoading = namespacesLoading || translationsLoading || localesLoading;

  return {
    translations,
    namespaces,
    locales,
    isAppLoading: isLoading
  };
};
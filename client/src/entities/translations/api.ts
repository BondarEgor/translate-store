import { NetworkService } from "@/shared/services/network-service";
import { Translation, Translations } from "./types";

const api = new NetworkService();

export const translationsApi = {
  getAllForNameSpace: (namespace: string) => {
    const params = new URLSearchParams({
      namespace,
    });

    return api.get<Translations>(`/api/translations?${params.toString()}`);
  },

  create: (payload: { namespace: string; locale: string; value: string; key: string }) =>
    api.post<Translation>("/api/translations", payload),

  remove: (locale: string, key: string) => api.delete<void>(`/api/translations/${locale}/${key}`),

  updateAll: ({
    value,
    key,
    namespace,
    locale,
  }: {
    namespace: string;
    locale: string;
    value: string;
    key: string;
  }) => {
    return api.put<string>(`/api/translations/${namespace}/${locale}/${key}/all`, {
      value,
    });
  },

  update: ({
    value,
    key,
    namespace,
    locale,
  }: {
    namespace: string;
    locale: string;
    value: string;
    key: string;
  }) => {
    return api.put<Translation>(`/api/translations/${namespace}/${locale}/${key}`, {
      value,
    });
  },

  sync: () => api.post<void>("/api/sync", {}),
};

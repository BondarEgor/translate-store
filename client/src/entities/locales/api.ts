import { NetworkService } from "@/shared/services/network-service";
import { Locale, Locales } from "./types";

const api = new NetworkService();

export const localesApi = {
  getAll: () => api.get<Locales>("/api/locales"),

  create: (locale: string) =>
    api.post<Locale>("/api/locales", {
      code: locale,
    }),

  remove: (locale: string) => api.delete<void>(`/api/locales/${locale}`),
};

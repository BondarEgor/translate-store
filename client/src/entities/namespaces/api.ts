import { NetworkService } from "@/shared/services/network-service";
import { Namespace, Namespaces } from "./types";

const api = new NetworkService();

export const namespacesApi = {
  getAll: () => api.get<Namespaces>("/api/namespaces"),

  create: (namespace: string) =>
    api.post<Namespace>("/api/namespaces", {
      namespace,
    }),

  remove: (namespace: string) => api.delete<void>(`/api/namespaces/${namespace}`),
};

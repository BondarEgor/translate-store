/** Общий конверт ответа API: status = машиночитаемый итог, message — для тоста. */
export interface ApiResult {
  status: string;
  message?: string;
}

export interface LocaleInfo {
  code: string;
  isDefault: boolean;
  total: number;
  missing: number;
  percent: number;
}

export interface NamespaceInfo {
  name: string;
  keys: number;
}

export interface Stats {
  languages: number;
  tables: number;
  keys: number;
  missing: number;
}

export interface AppState extends ApiResult {
  defaultLocale: string;
  locales: LocaleInfo[];
  namespaces: NamespaceInfo[];
  stats: Stats;
}

export interface TranslationRow {
  ns: string;
  key: string;
  values: Record<string, string>;
  missing: string[];
}

export interface KeysData extends ApiResult {
  defaultLocale: string;
  others: string[];
  rows: TranslationRow[];
}

export interface Suggestions extends ApiResult {
  locales: string[];
}

export interface AddKeyPayload {
  ns: string;
  key: string;
  value: string;
  translate?: boolean;
}

export interface UpdateKeyPayload {
  ns: string;
  key: string;
  value: string;
}

export interface DeleteKeyPayload {
  ns: string;
  key: string;
}

export interface RenameKeyPayload {
  ns: string;
  key: string;
  newKey: string;
}

export interface AddLocalePayload {
  code: string;
  translate?: boolean;
}

export interface AddNamespacePayload {
  name: string;
}

export interface RenameNamespacePayload {
  from: string;
  to: string;
}

export interface DeleteNamespacePayload {
  name: string;
}

async function request<T extends ApiResult = ApiResult>(
  method: string,
  url: string,
  body?: unknown
): Promise<T> {
  const res = await fetch(url, {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined
  });

  if (!res.ok) {
    throw res.status;
  }

  const data = await res.json();

  return data;
}

export const api = {
  state: () => request<AppState>('GET', '/api/state'),
  keys: () => request<KeysData>('GET', '/api/keys'),
  suggestions: () => request<Suggestions>('GET', '/api/suggestions'),

  addKey: (d: AddKeyPayload) => request('POST', '/api/keys', d),
  updateKey: (d: UpdateKeyPayload) => request('PUT', '/api/keys', d),
  deleteKey: (d: DeleteKeyPayload) => request('DELETE', '/api/keys', d),
  renameKey: (d: RenameKeyPayload) => request('POST', '/api/keys/rename', d),

  addLocale: (d: AddLocalePayload) => request('POST', '/api/locales', d),
  removeLocale: (d: { code: string; }) => request('DELETE', '/api/locales', d),

  addNamespace: (d: AddNamespacePayload) => request('POST', '/api/namespaces', d),
  renameNamespace: (d: RenameNamespacePayload) => request('PUT', '/api/namespaces', d),
  deleteNamespace: (d: DeleteNamespacePayload) => request('DELETE', '/api/namespaces', d),

  sync: () => request('POST', '/api/sync')
} as const;

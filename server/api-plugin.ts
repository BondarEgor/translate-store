/**
 * Vite-плагин: поднимает API хранилища прямо внутри dev-сервера
 * (и preview-сервера после `vite build`). Отдельный бэкенд не нужен.
 *
 *   GET    /api/state          снимок: языки, таблицы, статистика
 *   GET    /api/keys           строки таблицы ключей (источник правды — основной язык)
 *   POST   /api/keys           {ns, key, value, translate} — новый ключ + рассылка
 *   PUT    /api/keys           {ns, key, value} — правка значения основного языка
 *   DELETE /api/keys           {ns, key} — удалить ключ из всех языков
 *   POST   /api/keys/rename    {ns, key, newKey} — переименовать ключ во всех языках
 *   POST   /api/locales        {code, translate} — новый язык в один клик (+ авто-перевод)
 *   DELETE /api/locales        {code} — удалить язык
 *   POST   /api/namespaces     {name} — новая таблица во всех языках
 *   PUT    /api/namespaces     {from, to} — переименовать таблицу
 *   DELETE /api/namespaces     {name} — удалить таблицу со всеми переводами
 *   POST   /api/sync           разослать недостающие ключи
 *   GET    /api/suggestions    популярные языки, которых ещё нет в проекте
 */
import type { IncomingMessage, ServerResponse } from 'node:http';
import type { Plugin, PreviewServer, ViteDevServer } from 'vite';
import * as store from './store';

interface ApiRequest extends IncomingMessage {
  body?: Record<string, unknown>;
}

interface Route {
  (req: ApiRequest): Promise<Record<string, unknown>>;
}

function readBody(req: IncomingMessage): Promise<Record<string, unknown>> {
  return new Promise((resolve) => {
    let data = '';
    req.on('data', (chunk) => (data += chunk));
    req.on('end', () => {
      try {
        resolve(JSON.parse(data || '{}'));
      } catch {
        resolve({});
      }
    });
  });
}

function send(res: ServerResponse, payload: Record<string, unknown>, code = 200): void {
  const body = JSON.stringify(payload);
  res.statusCode =
    payload.status === 'invalid' ? 400 : payload.status === 'exists' ? 409 : code;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(body);
}

const routes: Record<string, Route> = {
  'GET /state': () => store.getState() as Promise<Record<string, unknown>>,
  'GET /keys': () => store.listKeys() as Promise<Record<string, unknown>>,
  'GET /suggestions': async () => {
    const { locales } = (await store.getState()) as unknown as { locales: { code: string; }[]; };
    const existing = new Set(locales.map((l) => l.code));
    return { status: 'ok', locales: store.SUGGESTED_LOCALES.filter((c) => !existing.has(c)) };
  },
  'POST /keys': (req) => store.addKey(req.body as never) as Promise<Record<string, unknown>>,
  'PUT /keys': (req) => store.updateKey(req.body as never) as Promise<Record<string, unknown>>,
  'DELETE /keys': (req) => store.deleteKey(req.body as never) as Promise<Record<string, unknown>>,
  'POST /keys/rename': (req) => store.renameKey(req.body as never) as Promise<Record<string, unknown>>,
  'POST /locales': (req) => store.addLocale(req.body as never) as Promise<Record<string, unknown>>,
  'DELETE /locales': (req) => store.removeLocale(req.body as never) as Promise<Record<string, unknown>>,
  'POST /namespaces': (req) => store.addNamespace(req.body as never) as Promise<Record<string, unknown>>,
  'PUT /namespaces': (req) => store.renameNamespace(req.body as never) as Promise<Record<string, unknown>>,
  'DELETE /namespaces': (req) => store.deleteNamespace(req.body as never) as Promise<Record<string, unknown>>,
  'POST /sync': () => store.syncKeys() as Promise<Record<string, unknown>>
};

async function handleApi(req: IncomingMessage, res: ServerResponse): Promise<void> {
  const pathname = new URL(req.url ?? '/', 'http://local').pathname;
  const handler = routes[`${req.method} ${pathname}`];
  if (!handler) return send(res, { status: 'error', message: 'Неизвестный endpoint' }, 404);
  try {
    const apiReq = req as ApiRequest;
    if (req.method !== 'GET') apiReq.body = await readBody(req);
    send(res, await handler(apiReq));
  } catch (error) {
    console.error('[api]', error);
    send(res, { status: 'error', message: String((error as Error)?.message ?? error) }, 500);
  }
}

export function apiPlugin(): Plugin {
  // Важно: connect.use() ВОЗВРАЩАЕТ app — если вернуть его из хука,
  // Vite примет это за post-hook и вызовет без аргументов. Поэтому — только побочный эффект.
  const attach = (server: ViteDevServer | PreviewServer): void => {
    server.middlewares.use('/api', (req, res) => void handleApi(req, res));
  };
  return {
    name: 'translation-store-api',
    configureServer: attach,
    configurePreviewServer: attach
  };
}

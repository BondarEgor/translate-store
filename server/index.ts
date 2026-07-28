import "dotenv/config";
import cors from 'cors';
import express, { type Express, type Request, type Response } from 'express';
import { createLocale, deleteLocale, getLocales } from './repositories/locale.repository.ts';
import { createNamespace, deleteNamespace, getNamespaces } from './repositories/namespace.repository.ts';
import { getTranslationsForLocale } from './repositories/translations.repository.ts';

const app: Express = express();
const port = 3001;

app.use(cors());
app.use(express.json());

type ApiError = {
  message: string;
};

type GetLocalesSuccess = {
  code: string;
  isDefault: boolean;
}[];

type GetLocalesResponse = GetLocalesSuccess | ApiError;

app.get('/api/locales', async (_, res: Response<GetLocalesResponse>) => {
  try {
    const locales = await getLocales();

    const mappedLocales = locales.map((locale) => ({
      code: locale.code,
      isDefault: locale.is_default,
    }));

    res.send(mappedLocales);
  } catch (e) {
    res.status(500).json({
      message: (e as Error).message
    });
  }
});

app.post('/api/locales', async (req: Request<{ code: string; }>, res) => {
  try {
    const newLocale = await createLocale(req.body.code);
    res.send(newLocale);
  } catch (e) {
    res.status(404).json({
      message: 'Не удалось добавить новый язык'
    });
  }
});

app.delete('/api/locales', async (req: Request<{}, {}, { code: string; }>, res) => {
  const locale = req.body.code;

  try {
    await deleteLocale(locale);
    res.sendStatus(204);
  } catch (e) {
    res.status(500).json({
      message: `Не удалось удалить язык: ${locale}`
    });
  }
});

type GetNamespacesSuccess = {
  createdAt: string;
  name: string;
}[];


type GetNamespacesResponse = GetNamespacesSuccess | ApiError;

app.get('/api/namespaces', async (_, res: Response<GetNamespacesResponse>) => {
  try {
    const namespaces = await getNamespaces();

    const mappedNamespaces = namespaces.map((namespace) => ({
      createdAt: namespace.created_at,
      name: namespace.name
    }));

    res.send(mappedNamespaces);
  } catch (e) {
    res.status(500).json({
      message: (e as Error).message
    });
  }
});

app.post('/api/namespaces', async (req: Request<{}, {}, { namespace: string; }>, res) => {
  const newNameSpace = req.body.namespace;

  try {
    const createdLocale = await createNamespace(newNameSpace);
    res.send(createdLocale);
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: `Не удалось добавить таблицу:${newNameSpace}`
    });
  }
});

app.delete('/api/namespaces', async (req: Request<{}, {}, { namespace: string; }>, res) => {
  const namespace = req.body.namespace;

  try {
    await deleteNamespace(namespace);
  } catch (e) {
    res.status(500).json({
      message: `Не удалось удалить таблицу: ${namespace}`
    });
  }
});

app.get('/api/translations', async (req: Request<{}, {}, {}, { locale: string; }>, res) => {
  const locale = req.query.locale;

  try {
    const translationsForLocale = await getTranslationsForLocale(locale);
    res.send(translationsForLocale);
  } catch {
    res.status(500).send({
      message: `Не удалось получить переводы для языка: ${locale}`
    });
  }
});


app.listen(port, () => {
  console.log('listening port');
});

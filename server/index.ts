import "dotenv/config";
import cors from 'cors';
import express, { type Express, type Request, type Response } from 'express';
import { createLocale, deleteLocale, getLocales } from './repositories/locale.repository.ts';
import { createNamespace, deleteNamespace, getNamespaces } from './repositories/namespace.repository.ts';
import { addTranslation, deleteTranslation, getTranslations, updateTranslationValue } from './repositories/translations.repository.ts';

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

app.delete('/api/locales/:locale', async (req: Request<{ locale: string; }>, res) => {
  const locale = req.params.locale;

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
  } catch {
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

app.get('/api/translations', async (req: Request<{}, {}, {}, { namespace: string; }>, res) => {
  const { namespace } = req.query;

  try {
    const translationsForLocale = await getTranslations(namespace);
    res.send(translationsForLocale);
  } catch {
    res.status(500).send({
      message: `Не удалось получить переводы для таблицы: ${namespace}`
    });
  }
});

app.post('/api/translations', async (req: Request<{}, {}, { namespace: string, locale: string, key: string, value: string; }>, res) => {
  try {
    const translationsForLocale = await addTranslation(req.body);
    res.send(translationsForLocale);
  } catch {
    res.status(500).send({
      message: `Не удалось добавить перевод для ${req.body.key}`
    });
  }
});

app.delete('/api/translations/:locale/:key', async (req: Request<{ locale: string, key: string; }>, res) => {
  const { locale, key } = req.params;

  try {
    await deleteTranslation(locale, key);
    res.status(204).send();
  } catch {
    res.status(500).send({
      message: `Не удалось удалить перевод для ${key}`
    });
  }
});

app.put('/api/translations/:namespace/:locale/:key', async (req: Request<{ namespace: string; locale: string; key: string; }, {}, { value: string; }>, res) => {
  const { value } = req.body;
  const { namespace, key, locale } = req.params;

  try {
    const updatedValue = await updateTranslationValue({ namespace, locale, key, newValue: value });
    res.send(updatedValue);
  } catch {
    res.status(500).send({
      message: "Something went wrong"
    });
  }
});

app.put('/api/translations/:namespace/:locale/:key/all', async (req: Request<{ namespace: string; locale: string; key: string; }, {}, { value: string; }>, res) => {
  const { value } = req.body;
  const { namespace, key, locale } = req.params;

  try {
    await updateTranslationValue({ namespace, locale, key, newValue: value });
  } catch {
    res.status(500).send({
      message: "Something went wrong"
    });
  }
});


app.listen(port, (error) => {
  if (error) {
    console.error(`listening port error: ${error}`);
  }
});

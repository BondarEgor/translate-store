import type { Request, Response } from 'express';
import { createLocaleService, deleteLocaleService, getLocalesService } from '../services/locales.service.ts';

export async function getLocalesController(_: Request, res: Response) {
  try {
    const locales = await getLocalesService();

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
}

export async function createLocaleController(req: Request<{}, {}, { code: string; }>, res: Response) {
  try {
    const newLocale = await createLocaleService(req.body.code);
    res.send(newLocale);
  } catch (e) {
    res.status(404).json({
      message: 'Не удалось добавить новый язык'
    });
  }
}

export async function deleteLocaleController(req: Request<{ locale: string; }>, res: Response) {
  try {
    const newLocale = await deleteLocaleService(req.params.locale);
    res.send(newLocale);
  } catch (e) {
    res.status(404).json({
      message: 'Не удалось добавить новый язык'
    });
  }
}

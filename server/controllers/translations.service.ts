import type { Request, Response } from 'express';
import { createTranslationService, deleteTranslationService, getTranslationsForNamespaceService, updateAllTranslationsService, updateTranslationService } from '../services/translations.service.ts';

export async function getTranslationsController(req: Request<{}, {}, {}, { namespace: string; }>, res: Response) {
  try {
    const translations = await getTranslationsForNamespaceService(req.query.namespace);
    res.send(translations);
  } catch (e) {
    res.status(500).send();
  }
};

export async function createTranslationController(req: Request<{}, {}, { namespace: string; value: string; key: string; locale: string; }>, res: Response) {
  try {
    const translation = await createTranslationService(req.body);
    res.send(translation);
  } catch (e) {
    res.status(500).send();
  }
};

export async function deleteTranslationController(req: Request<{ key: string; locale: string; }>, res: Response) {
  try {
    const { locale, key } = req.params;
    const translation = await deleteTranslationService(locale, key);

    res.send(translation);
  } catch (e) {
    res.status(500);
  }
};

export async function updateTranslationController(req: Request<{ namespace: string; key: string; value: string; locale: string; }>, res: Response) {
  try {
    const updated = await updateTranslationService(req.params);
    res.send(updated);
  } catch (e) {
    res.status(500).send((e as Error).message);
  }
}

export async function updateAllTranslationByKeyController(req: Request<{ namespace: string; key: string; locale: string; }>, res: Response) {
  const { namespace, locale, key } = req.params;
  try {
    updateAllTranslationsService(locale, key);
  } catch (e) {

  }
}
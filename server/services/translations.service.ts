import { createTranslation, deleteTranslation, getTranslationsForNamespace, updateTranslation } from '../repositories/translations.repository.ts';

export async function getTranslationsForNamespaceService(namespace: string) {
  const translations = await getTranslationsForNamespace(namespace);
  return translations;
}

export async function createTranslationService(query: { namespace: string, locale: string, value: string, key: string; }) {
  const translations = await createTranslation(query);
  return translations;
}

export async function deleteTranslationService(locale: string, key: string) {
  const translations = await deleteTranslation(locale, key);
  return translations;
}

export async function updateTranslationService(query: { namespace: string, locale: string, value: string, key: string; }) {
  const translation = await updateTranslation(query);
  return translation;
}


export async function updateAllTranslationsService(locale: string, key: string) {
  const translations = await deleteTranslation(locale, key);
  return translations;
}
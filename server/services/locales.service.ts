import { createLocale, deleteLocale, getLocales } from '../repositories/locale.repository.ts';

export async function getLocalesService() {
  const locales = await getLocales();
  return locales;
};

export async function createLocaleService(newLocale: string) {
  const created = await createLocale(newLocale);
  return created;
}

export async function deleteLocaleService(locale: string) {
  return deleteLocale(locale);
}
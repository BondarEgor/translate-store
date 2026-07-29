import { getLocales } from '../repositories/locale.repository.ts';
import { googleTranslate } from './translate.ts';

export async function createTranslationsForAll({ locale, text }: { text: string; locale: string; }) {
  const locales = await getLocales();
  const otherLocales = locales.filter(l => l.code !== locale);

  const allTranslations = await Promise.all(otherLocales.map(async ({ code: otherLocaleCode }) => ({
    translatedText: await googleTranslate(text, locale, otherLocaleCode),
    locale: otherLocaleCode
  })));

  return allTranslations;
}
import { createTranslationsForAll } from '../services/create-translation-for-all.ts';
import { supabaseClient } from '../supabase-client.ts';
import type { Database } from '../types/database.types.ts';

type TranslationRow = Database['public']['Tables']['translations']['Row'];
type Translation = Omit<TranslationRow, 'updated_at'>;

export async function getTranslations(namespace: string) {
  const { error, data } = await supabaseClient
    .from('translations')
    .select()
    .eq('namespace', namespace);

  if (error) {
    throw error;
  }

  return data;
}

export async function addTranslation(query: { namespace: string, locale: string, key: string, value: string; }) {
  const { value, namespace, key, locale } = query;
  const allTranslations = await createTranslationsForAll({ locale, text: value });

  const dbQuery = [query];

  allTranslations.forEach(({ locale, translatedText }) => {
    dbQuery.push({
      namespace,
      key,
      value: translatedText,
      locale
    });
  });


  const { error, data } = await supabaseClient
    .from('translations')
    .insert(dbQuery)
    .select();

  if (error) {
    throw error.message;
  }

  return data;
}

export async function deleteTranslation(locale: string, key: string) {
  const { error } = await supabaseClient
    .from('translations')
    .delete()
    .eq('locale', locale)
    .eq('key', key);

  if (error) {
    throw error.message;
  }
}

export async function updateTranslationValue({ namespace, key, newValue, locale }: { namespace: string; key: string; newValue: string; locale: string; }): Promise<Translation> {
  const { error, data } = await supabaseClient
    .from('translations')
    .update({ namespace, locale, key, value: newValue })
    .eq('namespace', namespace)
    .eq('locale', locale)
    .eq('key', key)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return {
    namespace: data.namespace,
    key: data.key,
    value: data.value,
    locale: data.locale
  };
}

export async function updateAllTranslationsByKey({ namespace, key, newValue, locale }: { namespace: string; key: string; newValue: string; locale: string; }) {
  const rows = [{ namespace, locale, key, value: newValue }];

  const allTranslations = await createTranslationsForAll({ locale, text: newValue });

  allTranslations.forEach((translation) => {
    rows.push({
      namespace,
      key,
      locale: translation.locale,
      value: translation.translatedText
    });
  });

  const { error } = await supabaseClient
    .from('translations')
    .upsert(rows, {
      onConflict: 'namespace,key,locale'
    });

  if (error) {
    console.log(error, ': inside');
    throw error;
  }
}
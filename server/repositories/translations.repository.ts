import { supabaseClient } from '../supabase-client.ts';

export async function getTranslationsForLocale(locale: string) {
  const { error, data } = await supabaseClient
    .from('translations')
    .select()
    .eq('locale', locale);

  if (error) {
    throw error;
  }

  return data;
}
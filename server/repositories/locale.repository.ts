import { supabaseClient } from '../supabase-client.ts';
import { type Database } from '../types/database.types.ts';

type LocaleRow =
  Database['public']['Tables']['locales']['Row'];

export async function getLocales(): Promise<LocaleRow[]> {
  const { data, error } = await supabaseClient
    .from('locales')
    .select('*');

  if (error) {
    throw error;
  }

  return data;
}

export async function createLocale(newLocale: string): Promise<LocaleRow> {
  const { data, error } = await supabaseClient
    .from('locales')
    .insert({
      code: newLocale
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function deleteLocale(locale: string) {
  const { error } = await supabaseClient
    .from('locales')
    .delete()
    .eq('code', locale);

  if (error) {
    throw error;
  }
}
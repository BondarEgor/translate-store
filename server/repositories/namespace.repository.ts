import { supabaseClient } from '../supabase-client.ts';
import type { Database } from '../types/database.types.ts';

type NameSpaceRow = Database['public']['Tables']['namespaces']['Row'];

export async function getNamespaces(): Promise<NameSpaceRow[]> {
  const { error, data } = await supabaseClient
    .from('namespaces')
    .select('*');

  if (error) {
    throw error;
  }

  return data;
}

export async function createNamespace(newNamespace: string) {
  const { error, data } = await supabaseClient
    .from('namespaces')
    .insert({ name: newNamespace })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function deleteNamespace(namespace: string) {
  const { error } = await supabaseClient
    .from('namespaces')
    .delete()
    .eq('name', namespace);

  if (error) {
    console.log(error);
    throw error;
  }
}
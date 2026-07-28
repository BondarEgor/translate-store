import { Database } from '../../../server/database.types';

export type Locale = Database['public']['Tables']['locales'];
export type Locales = Locale[];
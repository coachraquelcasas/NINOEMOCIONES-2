import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

// Si no se configuraron las variables, la app sigue funcionando con el
// contenido local de src/data (ver src/lib/content.ts). Esto evita que
// la aplicación se rompa mientras Supabase no está conectado todavía.
export const supabaseConfigured = Boolean(url && anonKey);

export const supabase = supabaseConfigured
  ? createClient(url as string, anonKey as string)
  : null;

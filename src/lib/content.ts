import { supabase, supabaseConfigured } from "./supabaseClient";
import { EMOTIONS as LOCAL_EMOTIONS } from "../data/emotions";
import { GUARDIANS as LOCAL_GUARDIANS } from "../data/guardians";
import { SCENES as LOCAL_SCENES } from "../data/adventure";
import type { Emotion, Guardian, AdventureScene } from "../types";

// Cada función intenta traer el contenido desde Supabase (para que los
// cambios que haga la administradora se vean sin recompilar la app).
// Si Supabase no está configurado o falla, se usa el contenido local
// como respaldo para que la app nunca se quede en blanco.

export async function fetchEmotions(): Promise<Emotion[]> {
  if (!supabaseConfigured || !supabase) return LOCAL_EMOTIONS;
  const { data, error } = await supabase.from("emotions").select("*").order("orden");
  if (error || !data || data.length === 0) return LOCAL_EMOTIONS;
  return data as Emotion[];
}

export async function fetchGuardians(): Promise<Guardian[]> {
  if (!supabaseConfigured || !supabase) return LOCAL_GUARDIANS;
  const { data, error } = await supabase.from("guardians").select("*").order("orden");
  if (error || !data || data.length === 0) return LOCAL_GUARDIANS;
  return data as Guardian[];
}

export async function fetchScenes(): Promise<AdventureScene[]> {
  if (!supabaseConfigured || !supabase) return LOCAL_SCENES;
  const { data, error } = await supabase.from("adventure_scenes").select("*").order("orden");
  if (error || !data || data.length === 0) return LOCAL_SCENES;
  return data as AdventureScene[];
}

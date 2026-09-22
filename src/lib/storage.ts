import type { Progress } from "../types";

const KEY = "laboratorio-emociones:progreso";

const DEFAULT_PROGRESS: Progress = {
  nombre: null,
  misionesCompletadas: [],
  aventuraCompletada: false,
  juramentoAceptado: false,
};

export function loadProgress(): Progress {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...DEFAULT_PROGRESS };
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_PROGRESS, ...parsed };
  } catch {
    // localStorage no disponible o datos corruptos: se continúa sin progreso guardado
    return { ...DEFAULT_PROGRESS };
  }
}

export function saveProgress(progress: Progress): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(progress));
  } catch {
    // Falla silenciosa: el niño puede seguir jugando en esta sesión aunque no se guarde
  }
}

export function clearProgress(): void {
  try {
    localStorage.removeItem(KEY);
  } catch {
    // Nada que hacer si localStorage no está disponible
  }
}

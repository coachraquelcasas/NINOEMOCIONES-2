import { useEffect, useState } from "react";
import type { Progress } from "../types";
import { loadProgress, saveProgress, clearProgress } from "../lib/storage";

export function useProgress() {
  const [progress, setProgress] = useState<Progress>(() => loadProgress());

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  function setNombre(nombre: string) {
    setProgress((p) => ({ ...p, nombre }));
  }

  function completeMission(id: string) {
    setProgress((p) =>
      p.misionesCompletadas.includes(id)
        ? p
        : { ...p, misionesCompletadas: [...p.misionesCompletadas, id] }
    );
  }

  function finishAdventure() {
    setProgress((p) => ({ ...p, aventuraCompletada: true }));
  }

  function acceptOath() {
    setProgress((p) => ({ ...p, juramentoAceptado: true }));
  }

  function reset() {
    clearProgress();
    setProgress(loadProgress());
  }

  return { progress, setNombre, completeMission, finishAdventure, acceptOath, reset };
}

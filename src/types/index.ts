export interface Emotion {
  id: string;
  nombre: string;
  color: string;
  mensaje: string;
  tecnica: string;
  frase: string;
}

export interface Guardian {
  id: string;
  nombre: string;
  poder: string;
  color: string;
  situacion: string;
  opciones: string[];
  correcta: number;
  aprendizaje: string;
}

export interface AdventureScene {
  id: string;
  titulo: string;
  texto: string;
  pregunta: string;
  opciones: string[];
  correcta: number;
  aprendizaje: string;
}

export interface Progress {
  nombre: string | null;
  misionesCompletadas: string[];
  aventuraCompletada: boolean;
  juramentoAceptado: boolean;
}

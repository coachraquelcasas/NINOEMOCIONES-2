import type { AdventureScene } from "../types";

export const SCENES: AdventureScene[] = [
  { id: "escena-1", titulo: "Una sombra en el recreo", texto: "Trueno se burla de las plumas de Alberto delante de todos. Alberto siente calor en la cara y su corazón late rápidamente.",
    pregunta: "¿Qué debería hacer primero?",
    opciones: ["Insultar a Trueno más fuerte", "Reconocer: “Estoy enojado y necesito respirar”", "Fingir que no siente nada"],
    correcta: 1, aprendizaje: "Nombrar la emoción ayuda al cerebro a recuperar la calma." },
  { id: "escena-2", titulo: "Una voz firme", texto: "Alberto ya respiró, pero Trueno vuelve a molestarlo.",
    pregunta: "¿Qué puede decir Alberto con seguridad?",
    opciones: ["“No me gusta. Detente”", "“Tienes razón, mis plumas son horribles”", "No decir nada aunque se sienta inseguro"],
    correcta: 0, aprendizaje: "Un límite puede ser corto, claro y respetuoso." },
  { id: "escena-3", titulo: "La red protectora", texto: "Trueno no se detiene. Alberto recuerda que pedir ayuda también es valentía.",
    pregunta: "¿Cuál es la mejor decisión?",
    opciones: ["Quedarse solo con el problema", "Buscar a un adulto de confianza y contar lo ocurrido", "Planear una venganza"],
    correcta: 1, aprendizaje: "Pedir ayuda frente al bullying es protegerte." },
];

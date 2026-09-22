import type { Guardian } from "../types";

export const GUARDIANS: Guardian[] = [
  { id: "colibri", nombre: "Colibrí", poder: "Alegría", color: "#E6BE7E",
    situacion: "Tu amiga logró algo importante. ¿Cómo puedes compartir su alegría?",
    opciones: ["Cambiar de tema para hablar de mí", "Felicitarla y preguntarle cómo se siente", "Decirle que no fue tan difícil"],
    correcta: 1, aprendizaje: "Celebrar a otros hace crecer la alegría sin quitarte nada." },
  { id: "leon", nombre: "León", poder: "Valentía", color: "#E15B4F",
    situacion: "Te da miedo participar en clase aunque sabes la respuesta. ¿Cuál es un paso valiente?",
    opciones: ["Burlarme de alguien para distraer", "Quedarme callado siempre", "Respirar, levantar la mano y probar"],
    correcta: 2, aprendizaje: "La valentía no elimina el miedo; te ayuda a dar un paso pequeño." },
  { id: "dally", nombre: "Delfín Dally", poder: "Empatía", color: "#2FA79B",
    situacion: "Ves a un compañero solo y con cara triste. ¿Qué haría un Guardián?",
    opciones: ["Acercarme y preguntarle si quiere compañía", "Decirle que deje de estar triste", "Ignorarlo porque no es mi problema"],
    correcta: 0, aprendizaje: "La empatía comienza cuando escuchamos sin juzgar." },
  { id: "buho", nombre: "Búho", poder: "Calma", color: "#6E3D72",
    situacion: "Alguien toma tu lápiz sin permiso y sientes mucho enojo. ¿Qué haces primero?",
    opciones: ["Gritar y empujar", "Respirar y decir con firmeza: “Devuélvemelo, por favor”", "Romper su lápiz"],
    correcta: 1, aprendizaje: "La calma te ayuda a poner límites claros sin lastimar." },
  { id: "tortuga", nombre: "Tortuga", poder: "Paciencia", color: "#8A9A5B",
    situacion: "Un dibujo no te sale como esperabas. ¿Cómo activas la paciencia?",
    opciones: ["Arrugarlo y decir que no puedo", "Pedir que otra persona lo haga por mí", "Hacer una pausa e intentarlo paso a paso"],
    correcta: 2, aprendizaje: "Aprender toma tiempo. Cada intento entrena tu cerebro." },
];

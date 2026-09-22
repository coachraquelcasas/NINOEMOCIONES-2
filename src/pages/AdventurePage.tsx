import { useState } from "react";
import Alberto from "../components/Alberto";
import BigButton from "../components/BigButton";
import BottomNav from "../components/BottomNav";
import { useContent } from "../hooks/useContent";
import { useProgress } from "../hooks/useProgress";

export default function AdventurePage() {
  const { scenes } = useContent();
  const { progress, finishAdventure } = useProgress();
  const [scene, setScene] = useState(0);
  const [choice, setChoice] = useState<number | null>(null);
  const s = scenes[scene];

  if (progress.aventuraCompletada) {
    return (
      <>
        <div style={{ padding: "40px 24px", textAlign: "center" }}>
          <Alberto size={90} />
          <p className="body-text" style={{ marginTop: 14 }}>
            “Tu voz merece respeto y pedir ayuda es un acto de valentía.”
          </p>
          <p style={{ fontFamily: "'Baloo 2', sans-serif", color: "var(--turquesa)" }}>
            Ya completaste “La nube Trueno” ✓
          </p>
        </div>
        <BottomNav />
      </>
    );
  }

  return (
    <>
      <div style={{ padding: "22px 18px 90px" }}>
        <h2 className="section-title">La nube Trueno</h2>
        <p style={{ fontFamily: "'Nunito', sans-serif", color: "var(--ciruela-clara)", fontSize: 13 }}>
          Escena {scene + 1} de 3
        </p>
        <div className="card">
          <h3 style={{ fontFamily: "'Baloo 2', sans-serif", color: "var(--ciruela)", marginTop: 0 }}>{s.titulo}</h3>
          <p className="body-text">{s.texto}</p>
          <p className="field-label" style={{ marginTop: 14 }}>{s.pregunta}</p>

          {choice === null ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {s.opciones.map((op, i) => (
                <button key={i} onClick={() => setChoice(i)} className="option-btn">{op}</button>
              ))}
            </div>
          ) : choice === s.correcta ? (
            <div>
              <p className="body-text" style={{ color: "var(--turquesa)", fontWeight: 700 }}>Elección consciente.</p>
              <p className="body-text">{s.aprendizaje}</p>
              <BigButton
                color="var(--ciruela)"
                onClick={() => {
                  if (scene < scenes.length - 1) {
                    setScene(scene + 1);
                    setChoice(null);
                  } else {
                    finishAdventure();
                  }
                }}
              >
                {scene < scenes.length - 1 ? "Continuar" : "Terminar aventura"}
              </BigButton>
            </div>
          ) : (
            <div>
              <p className="body-text" style={{ color: "var(--rojo)" }}>Respira un momento y vuelve a intentarlo.</p>
              <BigButton color="var(--ciruela-clara)" onClick={() => setChoice(null)}>Intentar otra vez</BigButton>
            </div>
          )}
        </div>
      </div>
      <BottomNav />
    </>
  );
}

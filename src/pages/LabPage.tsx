import { useState } from "react";
import Alberto from "../components/Alberto";
import BigButton from "../components/BigButton";
import BottomNav from "../components/BottomNav";
import { useContent } from "../hooks/useContent";
import { shade } from "../lib/level";

export default function LabPage() {
  const { emotions } = useContent();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const emotion = emotions.find((e) => e.id === selectedId) ?? null;

  return (
    <>
      <div style={{ padding: "22px 18px 90px" }}>
        <h2 className="section-title">¿Qué emoción te visita hoy?</h2>

        {!emotion && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 14 }}>
            {emotions.map((e) => (
              <button
                key={e.id}
                onClick={() => setSelectedId(e.id)}
                style={{
                  background: e.color, border: "none", borderRadius: 20, padding: "20px 10px",
                  color: "#fff", fontFamily: "'Baloo 2', sans-serif", fontWeight: 600, fontSize: 15,
                  cursor: "pointer", boxShadow: `0 6px 0 ${shade(e.color, -24)}`,
                }}
              >
                {e.nombre}
              </button>
            ))}
          </div>
        )}

        {emotion && (
          <div className="card">
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <div style={{ width: 14, height: 14, borderRadius: "50%", background: emotion.color }} />
              <h3 style={{ fontFamily: "'Baloo 2', sans-serif", color: "var(--ciruela)", margin: 0, fontSize: 20 }}>{emotion.nombre}</h3>
            </div>
            <p className="field-label">Este es su mensaje</p>
            <p className="body-text">{emotion.mensaje}</p>
            <p className="field-label">Técnica para el laboratorio</p>
            <p className="body-text">{emotion.tecnica}</p>
            <p className="field-label">Frase consciente</p>
            <p className="body-text" style={{ fontStyle: "italic", color: "var(--rojo)" }}>“{emotion.frase}”</p>
            <div style={{ display: "flex", gap: 10, alignItems: "center", marginTop: 16, background: "var(--crema)", borderRadius: 16, padding: 12 }}>
              <Alberto size={40} />
              <p className="body-text" style={{ margin: 0, fontSize: 13 }}>“Gracias por contarme lo que sientes. Vamos a atravesarlo juntos.”</p>
            </div>
            <div style={{ marginTop: 16 }}>
              <BigButton color="var(--ciruela-clara)" onClick={() => setSelectedId(null)}>Elegir otra emoción</BigButton>
            </div>
          </div>
        )}
      </div>
      <BottomNav />
    </>
  );
}

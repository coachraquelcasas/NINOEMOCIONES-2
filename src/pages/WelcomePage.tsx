import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alberto from "../components/Alberto";
import BigButton from "../components/BigButton";
import { useProgress } from "../hooks/useProgress";

export default function WelcomePage() {
  const { setNombre } = useProgress();
  const [name, setName] = useState("");
  const navigate = useNavigate();

  function start() {
    const trimmed = name.trim();
    if (!trimmed) return;
    setNombre(trimmed);
    navigate("/laboratorio");
  }

  return (
    <div style={{ padding: "40px 24px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
      <Alberto size={110} />
      <h1 style={{ fontFamily: "'Baloo 2', sans-serif", color: "var(--ciruela)", fontSize: 26, lineHeight: 1.15, margin: 0 }}>
        Alberto Einstein y el<br />Laboratorio de las Emociones
      </h1>
      <p className="body-text" style={{ maxWidth: 280 }}>
        Descubre lo que sientes, activa tus superpoderes y conviértete en Guardián de las Emociones.
      </p>
      <p style={{ fontFamily: "'Nunito', sans-serif", fontStyle: "italic", color: "var(--rojo)", fontSize: 14 }}>
        “¡Hola! Soy Alberto. Antes de empezar, cuéntame cómo te llamas.”
      </p>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && start()}
        placeholder="Tu nombre o apodo"
        aria-label="Tu nombre o apodo"
        style={{
          width: "100%", maxWidth: 260, padding: "13px 16px", borderRadius: 16,
          border: "2px solid var(--crema-osc)", fontFamily: "'Nunito', sans-serif",
          fontSize: 16, outline: "none", textAlign: "center",
        }}
      />
      <div style={{ maxWidth: 260, width: "100%" }}>
        <BigButton color="#2FA79B" onClick={start}>Entrar al laboratorio</BigButton>
      </div>
      <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 12, color: "var(--ciruela-clara)", maxWidth: 260 }}>
        Tu progreso se guarda únicamente en este dispositivo. No pedimos correo ni datos personales.
      </p>
    </div>
  );
}

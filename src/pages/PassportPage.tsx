import { useNavigate } from "react-router-dom";
import BadgeIcon from "../components/BadgeIcon";
import BigButton from "../components/BigButton";
import BottomNav from "../components/BottomNav";
import Feather from "../components/Feather";
import { levelFor } from "../lib/level";
import { useContent } from "../hooks/useContent";
import { useProgress } from "../hooks/useProgress";

export default function PassportPage() {
  const { guardians } = useContent();
  const { progress, acceptOath, reset } = useProgress();
  const navigate = useNavigate();

  const feathers = progress.misionesCompletadas.length;
  const unlocked = feathers === 5 && progress.aventuraCompletada;
  const level = levelFor(feathers);
  const name = progress.nombre ?? "Explorador";

  function handleReset() {
    const confirmado = window.confirm(
      "¿Seguro que quieres cambiar de explorador? Se borrará el progreso guardado en este dispositivo."
    );
    if (confirmado) {
      reset();
      navigate("/");
    }
  }

  return (
    <>
      <div style={{ padding: "22px 18px 90px" }}>
        <h2 className="section-title">Pasaporte de Guardián</h2>
        <div className="card">
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 56, height: 56, borderRadius: "50%", background: "var(--ciruela)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff", fontFamily: "'Baloo 2', sans-serif", fontSize: 22,
              }}
            >
              {name[0]?.toUpperCase()}
            </div>
            <div>
              <p style={{ fontFamily: "'Baloo 2', sans-serif", color: "var(--ciruela)", margin: 0, fontSize: 18 }}>{name}</p>
              <p style={{ fontFamily: "'Nunito', sans-serif", color: "var(--turquesa)", margin: 0, fontSize: 13, fontWeight: 700 }}>{level}</p>
            </div>
          </div>

          <p className="field-label" style={{ marginTop: 18 }}>Insignias ({feathers}/5)</p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {guardians.map((g) => (
              <BadgeIcon key={g.id} guardian={g} earned={progress.misionesCompletadas.includes(g.id)} />
            ))}
          </div>

          <p className="field-label" style={{ marginTop: 18 }}>Plumas rojas</p>
          <div style={{ display: "flex", gap: 4 }}>
            {Array.from({ length: 5 }).map((_, i) => <Feather key={i} filled={i < feathers} />)}
          </div>

          <div style={{ marginTop: 20, padding: 16, borderRadius: 18, background: unlocked ? "var(--crema)" : "var(--crema-osc)", opacity: unlocked ? 1 : 0.7 }}>
            <p style={{ fontFamily: "'Baloo 2', sans-serif", color: "var(--ciruela)", margin: "0 0 8px" }}>
              {unlocked ? "Juramento del Guardián" : "Juramento bloqueado 🔒"}
            </p>
            {unlocked ? (
              progress.juramentoAceptado ? (
                <p className="body-text" style={{ fontStyle: "italic" }}>
                  “Prometo escuchar mis emociones, cuidar mis palabras y mi corazón, pedir ayuda cuando la necesite
                  y utilizar mis superpoderes con amor. ¡Soy Guardián de las Emociones!” ✓
                </p>
              ) : (
                <>
                  <p className="body-text" style={{ fontStyle: "italic" }}>
                    “Prometo escuchar mis emociones, cuidar mis palabras y mi corazón, pedir ayuda cuando la necesite
                    y utilizar mis superpoderes con amor. ¡Soy Guardián de las Emociones!”
                  </p>
                  <BigButton color="var(--dorado)" onClick={acceptOath}>Aceptar el juramento</BigButton>
                </>
              )
            ) : (
              <p className="body-text">Completa las 5 misiones y la aventura “La nube Trueno” para desbloquearlo.</p>
            )}
          </div>

          {progress.juramentoAceptado && (
            <div style={{ marginTop: 14 }}>
              <BigButton color="var(--turquesa)" onClick={() => navigate("/certificado")}>Ver mi certificado</BigButton>
            </div>
          )}

          <div style={{ marginTop: 10 }}>
            <button
              onClick={handleReset}
              style={{ background: "none", border: "none", color: "var(--ciruela-clara)", fontFamily: "'Nunito', sans-serif", fontSize: 13, textDecoration: "underline", cursor: "pointer" }}
            >
              Cambiar de explorador
            </button>
          </div>
        </div>
      </div>
      <BottomNav />
    </>
  );
}

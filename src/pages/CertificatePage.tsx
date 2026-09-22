import { useNavigate } from "react-router-dom";
import Alberto from "../components/Alberto";
import BigButton from "../components/BigButton";
import { useProgress } from "../hooks/useProgress";

export default function CertificatePage() {
  const { progress } = useProgress();
  const navigate = useNavigate();
  const name = progress.nombre ?? "Explorador";

  return (
    <div style={{ padding: "22px 18px 90px" }}>
      <div style={{ background: "var(--crema)", border: "3px solid var(--dorado)", borderRadius: 24, padding: 28, textAlign: "center", boxShadow: "0 10px 28px rgba(62,31,69,0.14)" }}>
        <Alberto size={70} />
        <h2 style={{ fontFamily: "'Baloo 2', sans-serif", color: "var(--ciruela)", fontSize: 22, margin: "12px 0 4px" }}>
          Certificado de Guardián Emocional
        </h2>
        <p style={{ fontFamily: "'Nunito', sans-serif", color: "var(--ciruela-clara)" }}>Se otorga con orgullo a</p>
        <p style={{ fontFamily: "'Baloo 2', sans-serif", fontSize: 26, color: "var(--rojo)", margin: "6px 0" }}>{name}</p>
        <p style={{ fontFamily: "'Nunito', sans-serif", color: "var(--ciruela)", fontSize: 14 }}>
          por completar las cinco misiones y convertirse en Guardián de las Emociones, guiado por Alberto Einstein
          en el Laboratorio de las Emociones.
        </p>
        <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 12, color: "var(--ciruela-clara)", marginTop: 18 }}>
          Una creación de Raquel Casas
        </p>
      </div>
      <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
        <BigButton color="var(--ciruela-clara)" onClick={() => navigate("/pasaporte")}>Volver al pasaporte</BigButton>
        <BigButton color="var(--dorado)" onClick={() => window.print()}>Imprimir</BigButton>
      </div>
    </div>
  );
}

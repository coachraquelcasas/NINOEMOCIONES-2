import { useState } from "react";
import BadgeIcon from "../components/BadgeIcon";
import BigButton from "../components/BigButton";
import BottomNav from "../components/BottomNav";
import Feather from "../components/Feather";
import Modal from "../components/Modal";
import { useContent } from "../hooks/useContent";
import { useProgress } from "../hooks/useProgress";

export default function MissionsPage() {
  const { guardians } = useContent();
  const { progress, completeMission } = useProgress();
  const [openId, setOpenId] = useState<string | null>(null);
  const [choice, setChoice] = useState<number | null>(null);

  const guardian = guardians.find((g) => g.id === openId) ?? null;
  const feathers = progress.misionesCompletadas.length;

  function close() {
    setOpenId(null);
    setChoice(null);
  }

  return (
    <>
      <div style={{ padding: "22px 18px 90px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 className="section-title">Misiones de los Guardianes</h2>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Feather filled /> <span style={{ fontFamily: "'Baloo 2', sans-serif", color: "var(--rojo)" }}>{feathers}</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 14 }}>
          {guardians.map((g) => {
            const done = progress.misionesCompletadas.includes(g.id);
            return (
              <button
                key={g.id}
                onClick={() => setOpenId(g.id)}
                style={{
                  display: "flex", alignItems: "center", gap: 14, textAlign: "left",
                  background: "#fff", border: `2px solid ${done ? g.color : "var(--crema-osc)"}`,
                  borderRadius: 20, padding: 14, cursor: "pointer",
                }}
              >
                <BadgeIcon guardian={g} earned={done} />
                <div>
                  <p style={{ fontFamily: "'Baloo 2', sans-serif", color: "var(--ciruela)", margin: 0, fontSize: 17 }}>{g.nombre}</p>
                  <p style={{ fontFamily: "'Nunito', sans-serif", color: "var(--ciruela-clara)", margin: 0, fontSize: 13 }}>
                    Superpoder: {g.poder} {done && "· ¡Completada!"}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {guardian && (
        <Modal onClose={close}>
          <p className="field-label">Misión del {guardian.nombre}</p>
          <p className="body-text">{guardian.situacion}</p>

          {choice === null ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 12 }}>
              {guardian.opciones.map((op, i) => (
                <button key={i} onClick={() => setChoice(i)} className="option-btn">{op}</button>
              ))}
            </div>
          ) : choice === guardian.correcta ? (
            <div style={{ marginTop: 14 }}>
              <p className="body-text" style={{ color: "var(--turquesa)", fontWeight: 700 }}>¡Elección consciente! 🎉</p>
              <p className="body-text">{guardian.aprendizaje}</p>
              <div style={{ display: "flex", justifyContent: "center", margin: "14px 0" }}>
                <BadgeIcon guardian={guardian} earned />
              </div>
              <BigButton color={guardian.color} onClick={() => { completeMission(guardian.id); close(); }}>
                Guardar pluma e insignia
              </BigButton>
            </div>
          ) : (
            <div style={{ marginTop: 14 }}>
              <p className="body-text" style={{ color: "var(--rojo)" }}>
                Casi. Alberto cree que hay una opción aún más consciente. ¿Quieres intentarlo de nuevo?
              </p>
              <BigButton color="var(--ciruela-clara)" onClick={() => setChoice(null)}>Intentar otra vez</BigButton>
            </div>
          )}
        </Modal>
      )}

      <BottomNav />
    </>
  );
}

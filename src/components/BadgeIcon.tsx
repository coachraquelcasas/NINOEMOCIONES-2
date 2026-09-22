import type { Guardian } from "../types";

export default function BadgeIcon({ guardian, earned }: { guardian: Guardian; earned: boolean }) {
  return (
    <div
      style={{
        width: 64, height: 64, borderRadius: "50%",
        background: earned ? guardian.color : "var(--crema-osc)",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: earned ? `0 6px 14px ${guardian.color}55` : "none",
        border: `2px solid ${earned ? guardian.color : "#E3D5BE"}`,
        opacity: earned ? 1 : 0.55, transition: "all .3s",
      }}
      role="img"
      aria-label={`Insignia de ${guardian.nombre}${earned ? ", obtenida" : ", pendiente"}`}
    >
      <span style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 700, color: earned ? "#fff" : "var(--ciruela)", fontSize: 12, textAlign: "center" }}>
        {guardian.nombre.split(" ")[0]}
      </span>
    </div>
  );
}

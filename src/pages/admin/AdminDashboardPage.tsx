import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";
import { useAdminAuth } from "../../hooks/useAdminAuth";
import { useContent } from "../../hooks/useContent";
import type { Emotion, Guardian, AdventureScene } from "../../types";

type Tab = "emociones" | "misiones" | "aventura";

export default function AdminDashboardPage() {
  const { signOut } = useAdminAuth();
  const { emotions, guardians, scenes, reload } = useContent();
  const [tab, setTab] = useState<Tab>("emociones");
  const [status, setStatus] = useState<string | null>(null);
  const navigate = useNavigate();

  async function handleSignOut() {
    await signOut();
    navigate("/admin/login");
  }

  async function saveEmotion(e: Emotion) {
    setStatus(null);
    const { error } = await supabase!.from("emotions").update({
      nombre: e.nombre, mensaje: e.mensaje, tecnica: e.tecnica, frase: e.frase, color: e.color,
    }).eq("id", e.id);
    setStatus(error ? `Error: ${error.message}` : "Guardado ✓");
    reload();
  }

  async function saveGuardian(g: Guardian) {
    setStatus(null);
    const { error } = await supabase!.from("guardians").update({
      nombre: g.nombre, poder: g.poder, situacion: g.situacion,
      opciones: g.opciones, correcta: g.correcta, aprendizaje: g.aprendizaje, color: g.color,
    }).eq("id", g.id);
    setStatus(error ? `Error: ${error.message}` : "Guardado ✓");
    reload();
  }

  async function saveScene(s: AdventureScene) {
    setStatus(null);
    const { error } = await supabase!.from("adventure_scenes").update({
      titulo: s.titulo, texto: s.texto, pregunta: s.pregunta,
      opciones: s.opciones, correcta: s.correcta, aprendizaje: s.aprendizaje,
    }).eq("id", s.id);
    setStatus(error ? `Error: ${error.message}` : "Guardado ✓");
    reload();
  }

  return (
    <div style={{ padding: "20px 18px 60px", maxWidth: 700, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ fontFamily: "'Baloo 2', sans-serif", color: "var(--ciruela)", fontSize: 22 }}>
          Editar contenido
        </h1>
        <button onClick={handleSignOut} style={{ background: "none", border: "none", color: "var(--ciruela-clara)", textDecoration: "underline", cursor: "pointer", fontFamily: "'Nunito', sans-serif" }}>
          Cerrar sesión
        </button>
      </div>

      <div style={{ display: "flex", gap: 8, margin: "16px 0" }}>
        {(["emociones", "misiones", "aventura"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              padding: "8px 16px", borderRadius: 12, border: "none", cursor: "pointer",
              fontFamily: "'Nunito', sans-serif", fontWeight: 700,
              background: tab === t ? "var(--ciruela)" : "var(--crema-osc)",
              color: tab === t ? "#fff" : "var(--ciruela)",
            }}
          >
            {t === "emociones" ? "Emociones" : t === "misiones" ? "Guardianes y misiones" : "Aventura"}
          </button>
        ))}
      </div>

      {status && <p className="body-text" style={{ color: status.startsWith("Error") ? "var(--rojo)" : "var(--turquesa)" }}>{status}</p>}

      {tab === "emociones" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {emotions.map((e) => (
            <EmotionForm key={e.id} emotion={e} onSave={saveEmotion} />
          ))}
        </div>
      )}

      {tab === "misiones" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {guardians.map((g) => (
            <GuardianForm key={g.id} guardian={g} onSave={saveGuardian} />
          ))}
        </div>
      )}

      {tab === "aventura" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {scenes.map((s) => (
            <SceneForm key={s.id} scene={s} onSave={saveScene} />
          ))}
        </div>
      )}
    </div>
  );
}

function fieldStyle() {
  return { width: "100%", padding: "10px 12px", borderRadius: 12, border: "2px solid var(--crema-osc)", fontFamily: "'Nunito', sans-serif", fontSize: 14, marginTop: 4 } as const;
}

function EmotionForm({ emotion, onSave }: { emotion: Emotion; onSave: (e: Emotion) => void }) {
  const [draft, setDraft] = useState(emotion);
  return (
    <div className="card">
      <p style={{ fontFamily: "'Baloo 2', sans-serif", color: "var(--ciruela)", margin: 0 }}>{emotion.nombre}</p>
      <label className="field-label">Nombre</label>
      <input style={fieldStyle()} value={draft.nombre} onChange={(e) => setDraft({ ...draft, nombre: e.target.value })} />
      <label className="field-label">Mensaje</label>
      <textarea style={{ ...fieldStyle(), minHeight: 60 }} value={draft.mensaje} onChange={(e) => setDraft({ ...draft, mensaje: e.target.value })} />
      <label className="field-label">Técnica</label>
      <textarea style={{ ...fieldStyle(), minHeight: 60 }} value={draft.tecnica} onChange={(e) => setDraft({ ...draft, tecnica: e.target.value })} />
      <label className="field-label">Frase consciente</label>
      <input style={fieldStyle()} value={draft.frase} onChange={(e) => setDraft({ ...draft, frase: e.target.value })} />
      <button onClick={() => onSave(draft)} className="big-button" style={{ background: "var(--turquesa)", marginTop: 12, boxShadow: "0 6px 0 #1E7A71" }}>
        Guardar cambios
      </button>
    </div>
  );
}

function GuardianForm({ guardian, onSave }: { guardian: Guardian; onSave: (g: Guardian) => void }) {
  const [draft, setDraft] = useState(guardian);
  return (
    <div className="card">
      <p style={{ fontFamily: "'Baloo 2', sans-serif", color: "var(--ciruela)", margin: 0 }}>{guardian.nombre} — {guardian.poder}</p>
      <label className="field-label">Situación</label>
      <textarea style={{ ...fieldStyle(), minHeight: 60 }} value={draft.situacion} onChange={(e) => setDraft({ ...draft, situacion: e.target.value })} />
      <label className="field-label">Opciones (una por línea, 3 en total)</label>
      <textarea
        style={{ ...fieldStyle(), minHeight: 80 }}
        value={draft.opciones.join("\n")}
        onChange={(e) => setDraft({ ...draft, opciones: e.target.value.split("\n") })}
      />
      <label className="field-label">Número de la opción correcta (0, 1 o 2)</label>
      <input
        type="number" min={0} max={2}
        style={fieldStyle()}
        value={draft.correcta}
        onChange={(e) => setDraft({ ...draft, correcta: Number(e.target.value) })}
      />
      <label className="field-label">Aprendizaje</label>
      <textarea style={{ ...fieldStyle(), minHeight: 60 }} value={draft.aprendizaje} onChange={(e) => setDraft({ ...draft, aprendizaje: e.target.value })} />
      <button onClick={() => onSave(draft)} className="big-button" style={{ background: "var(--turquesa)", marginTop: 12, boxShadow: "0 6px 0 #1E7A71" }}>
        Guardar cambios
      </button>
    </div>
  );
}

function SceneForm({ scene, onSave }: { scene: AdventureScene; onSave: (s: AdventureScene) => void }) {
  const [draft, setDraft] = useState(scene);
  return (
    <div className="card">
      <p style={{ fontFamily: "'Baloo 2', sans-serif", color: "var(--ciruela)", margin: 0 }}>{scene.titulo}</p>
      <label className="field-label">Texto de la escena</label>
      <textarea style={{ ...fieldStyle(), minHeight: 60 }} value={draft.texto} onChange={(e) => setDraft({ ...draft, texto: e.target.value })} />
      <label className="field-label">Pregunta</label>
      <input style={fieldStyle()} value={draft.pregunta} onChange={(e) => setDraft({ ...draft, pregunta: e.target.value })} />
      <label className="field-label">Opciones (una por línea, 3 en total)</label>
      <textarea
        style={{ ...fieldStyle(), minHeight: 80 }}
        value={draft.opciones.join("\n")}
        onChange={(e) => setDraft({ ...draft, opciones: e.target.value.split("\n") })}
      />
      <label className="field-label">Número de la opción correcta (0, 1 o 2)</label>
      <input
        type="number" min={0} max={2}
        style={fieldStyle()}
        value={draft.correcta}
        onChange={(e) => setDraft({ ...draft, correcta: Number(e.target.value) })}
      />
      <label className="field-label">Aprendizaje</label>
      <textarea style={{ ...fieldStyle(), minHeight: 60 }} value={draft.aprendizaje} onChange={(e) => setDraft({ ...draft, aprendizaje: e.target.value })} />
      <button onClick={() => onSave(draft)} className="big-button" style={{ background: "var(--turquesa)", marginTop: 12, boxShadow: "0 6px 0 #1E7A71" }}>
        Guardar cambios
      </button>
    </div>
  );
}

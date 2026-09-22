import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "../../hooks/useAdminAuth";

export default function AdminLoginPage() {
  const { signIn, configured } = useAdminAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSending(true);
    setError(null);
    const err = await signIn(email, password);
    setSending(false);
    if (err) setError(err);
    else navigate("/admin");
  }

  return (
    <div style={{ padding: "50px 24px", textAlign: "center" }}>
      <h1 style={{ fontFamily: "'Baloo 2', sans-serif", color: "var(--ciruela)", fontSize: 22 }}>
        Acceso de administración
      </h1>
      <p className="body-text">Solo para editar el contenido del Laboratorio de las Emociones.</p>

      {!configured && (
        <p className="body-text" style={{ color: "var(--rojo)" }}>
          Todavía no se configuraron las variables de Supabase (VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY).
        </p>
      )}

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 280, margin: "20px auto 0" }}>
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: "12px 14px", borderRadius: 14, border: "2px solid var(--crema-osc)", fontFamily: "'Nunito', sans-serif", fontSize: 15 }}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: "12px 14px", borderRadius: 14, border: "2px solid var(--crema-osc)", fontFamily: "'Nunito', sans-serif", fontSize: 15 }}
        />
        {error && <p className="body-text" style={{ color: "var(--rojo)" }}>{error}</p>}
        <button
          type="submit"
          disabled={sending}
          className="big-button"
          style={{ background: "var(--ciruela)", boxShadow: "0 6px 0 #2A1530" }}
        >
          {sending ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}

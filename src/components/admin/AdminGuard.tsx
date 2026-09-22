import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAdminAuth } from "../../hooks/useAdminAuth";

export default function AdminGuard({ children }: { children: ReactNode }) {
  const { session, loading, configured } = useAdminAuth();

  if (!configured) return <Navigate to="/admin/login" replace />;
  if (loading) return <div style={{ padding: 40, textAlign: "center" }}>Cargando…</div>;
  if (!session) return <Navigate to="/admin/login" replace />;
  return <>{children}</>;
}

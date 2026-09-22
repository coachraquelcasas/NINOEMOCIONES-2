import { BrowserRouter, useLocation } from "react-router-dom";
import AppRoutes from "./routes";
import { ContentProvider } from "./hooks/useContent";
import { AdminAuthProvider } from "./hooks/useAdminAuth";

function Shell() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  if (isAdmin) {
    return (
      <div style={{ minHeight: "100vh" }}>
        <AppRoutes />
      </div>
    );
  }

  return (
    <div className="app-shell">
      <AppRoutes />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AdminAuthProvider>
        <ContentProvider>
          <Shell />
        </ContentProvider>
      </AdminAuthProvider>
    </BrowserRouter>
  );
}

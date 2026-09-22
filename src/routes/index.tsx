import { Navigate, Route, Routes } from "react-router-dom";
import WelcomePage from "../pages/WelcomePage";
import LabPage from "../pages/LabPage";
import MissionsPage from "../pages/MissionsPage";
import AdventurePage from "../pages/AdventurePage";
import PassportPage from "../pages/PassportPage";
import CertificatePage from "../pages/CertificatePage";
import AdminLoginPage from "../pages/admin/AdminLoginPage";
import AdminDashboardPage from "../pages/admin/AdminDashboardPage";
import AdminGuard from "../components/admin/AdminGuard";
import { useProgress } from "../hooks/useProgress";

function RequireName({ children }: { children: JSX.Element }) {
  const { progress } = useProgress();
  if (!progress.nombre) return <Navigate to="/" replace />;
  return children;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/laboratorio" element={<RequireName><LabPage /></RequireName>} />
      <Route path="/misiones" element={<RequireName><MissionsPage /></RequireName>} />
      <Route path="/aventura" element={<RequireName><AdventurePage /></RequireName>} />
      <Route path="/pasaporte" element={<RequireName><PassportPage /></RequireName>} />
      <Route path="/certificado" element={<RequireName><CertificatePage /></RequireName>} />

      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/admin" element={<AdminGuard><AdminDashboardPage /></AdminGuard>} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

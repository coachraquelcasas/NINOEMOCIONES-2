import { NavLink } from "react-router-dom";

const ITEMS = [
  { to: "/laboratorio", label: "Laboratorio" },
  { to: "/misiones", label: "Misiones" },
  { to: "/aventura", label: "Aventura" },
  { to: "/pasaporte", label: "Pasaporte" },
];

export default function BottomNav() {
  return (
    <nav className="bottom-nav">
      {ITEMS.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}

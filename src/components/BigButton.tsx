import type { ReactNode, CSSProperties } from "react";
import { shade } from "../lib/level";

interface Props {
  children: ReactNode;
  onClick: () => void;
  color?: string;
  style?: CSSProperties;
}

export default function BigButton({ children, onClick, color = "#3E1F45", style }: Props) {
  return (
    <button
      onClick={onClick}
      className="big-button"
      style={{ background: color, boxShadow: `0 6px 0 ${shade(color, -22)}`, ...style }}
    >
      {children}
    </button>
  );
}

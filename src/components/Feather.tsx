export default function Feather({ filled }: { filled: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={filled ? "#E15B4F" : "none"} stroke="#E15B4F" strokeWidth={1.6} aria-hidden="true">
      <path d="M12 2 C6 6 5 14 8 21 C10 16 13 9 12 2 Z" />
    </svg>
  );
}

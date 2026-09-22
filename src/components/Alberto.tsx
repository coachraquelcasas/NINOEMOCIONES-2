interface Props { size?: number }

export default function Alberto({ size = 72 }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" role="img" aria-label="Alberto Einstein, el loro guía">
      <ellipse cx="60" cy="68" rx="34" ry="38" fill="#5C6B6A" />
      <ellipse cx="60" cy="66" rx="26" ry="30" fill="#8A9695" />
      <path d="M60 30 C50 10, 30 8, 24 4 C34 20, 40 30, 46 34 Z" fill="var(--rojo)" />
      <circle cx="49" cy="52" r="6.5" fill="#1B1B1B" />
      <circle cx="51" cy="50" r="2" fill="#fff" />
      <path d="M60 58 L48 66 L60 68 Z" fill="var(--dorado)" />
      <path d="M40 78 C48 88, 72 88, 80 78 C74 96, 46 96, 40 78 Z" fill="var(--rojo)" opacity="0.85" />
      <path d="M22 60 C10 58, 6 72, 16 80 C20 68, 24 64, 30 62 Z" fill="#4B5857" />
    </svg>
  );
}

export function levelFor(missionsCompleted: number): string {
  if (missionsCompleted >= 5) return "Guardián Emocional";
  if (missionsCompleted >= 3) return "Explorador valiente";
  return "Aprendiz curioso";
}

export function shade(hex: string, amt: number): string {
  const n = parseInt(hex.slice(1), 16);
  let r = (n >> 16) + amt;
  let g = ((n >> 8) & 0xff) + amt;
  let b = (n & 0xff) + amt;
  r = Math.max(0, Math.min(255, r));
  g = Math.max(0, Math.min(255, g));
  b = Math.max(0, Math.min(255, b));
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

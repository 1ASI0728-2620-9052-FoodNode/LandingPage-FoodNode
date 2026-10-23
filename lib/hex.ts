export const SQ3 = Math.sqrt(3);

export type Cell = { q: number; r: number; d: number; x: number; y: number };

/** Rejilla hexagonal (pointy-top) con coordenadas axiales, como el indexado H3. */
export function hexCells(radius: number, size: number): Cell[] {
  const cells: Cell[] = [];
  for (let q = -radius; q <= radius; q++) {
    for (let r = Math.max(-radius, -q - radius); r <= Math.min(radius, -q + radius); r++) {
      const d = (Math.abs(q) + Math.abs(r) + Math.abs(q + r)) / 2;
      cells.push({ q, r, d, x: size * SQ3 * (q + r / 2), y: size * 1.5 * r });
    }
  }
  return cells;
}

export function hexPoints(cx: number, cy: number, size: number): string {
  return Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 180) * (60 * i - 30);
    return `${(cx + size * Math.cos(a)).toFixed(1)},${(cy + size * Math.sin(a)).toFixed(1)}`;
  }).join(" ");
}

/** Convierte un punto en pixeles a la celda axial que lo contiene. */
export function pixelToCell(x: number, y: number, size: number): { q: number; r: number } {
  const qf = ((SQ3 / 3) * x - (1 / 3) * y) / size;
  const rf = ((2 / 3) * y) / size;
  let q = Math.round(qf), r = Math.round(rf);
  const s = Math.round(-qf - rf);
  const dq = Math.abs(q - qf), dr = Math.abs(r - rf), ds = Math.abs(s + qf + rf);
  if (dq > dr && dq > ds) q = -r - s;
  else if (dr > ds) r = -q - s;
  return { q, r };
}

export function ringDistance(q: number, r: number): number {
  return (Math.abs(q) + Math.abs(r) + Math.abs(q + r)) / 2;
}

/** Generador pseudoaleatorio determinista (mismo resultado en servidor y cliente). */
export function mulberry(seed: number) {
  let a = seed;
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

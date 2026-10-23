import { hexPoints } from "@/lib/hex";

export function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="-20 -20 40 40" aria-hidden="true">
      <polygon points={hexPoints(0, 0, 19)} fill="#964100" />
      <polygon points={hexPoints(0, 0, 12.5)} fill="none" stroke="#FFF1E8" strokeOpacity=".45" strokeWidth="1.2" />
      <circle cx="0" cy="-1.5" r="4.6" fill="#FFF8F5" />
      <path d="M0 9 L-4.2 2.2 H4.2 Z" fill="#FFF8F5" />
      <circle cx="0" cy="-1.5" r="1.8" fill="#964100" />
    </svg>
  );
}

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2">
      <LogoMark />
      <span className={`font-display text-2xl font-extrabold tracking-tight ${light ? "text-cream" : "text-brown"}`}>Foodly</span>
    </span>
  );
}

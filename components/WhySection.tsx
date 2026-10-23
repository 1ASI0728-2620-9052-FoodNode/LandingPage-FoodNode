"use client";

import { useMemo, useState } from "react";
import { MapPinned, Sparkles, Store } from "lucide-react";
import { hexCells, hexPoints, mulberry, pixelToCell, ringDistance } from "@/lib/hex";
import { useApp } from "./Providers";
import Reveal from "./Reveal";

const S = 34;
const CIRCLE_R = 96;
const HEX_RINGS = 2;

function CompareDemo() {
  const { t } = useApp();
  const [mode, setMode] = useState<"circle" | "hex">("circle");

  const cells = useMemo(() => hexCells(4, S), []);
  const dots = useMemo(() => {
    const rnd = mulberry(77);
    return Array.from({ length: 34 }, (_, i) => {
      const a = rnd() * Math.PI * 2;
      const rad = 28 + Math.sqrt(rnd()) * 150;
      const x = Math.cos(a) * rad, y = Math.sin(a) * rad * 0.92;
      const c = pixelToCell(x, y, S);
      return { i, x, y, chain: rnd() < 0.3, inCircle: Math.hypot(x, y) <= CIRCLE_R, inHex: ringDistance(c.q, c.r) <= HEX_RINGS };
    });
  }, []);

  const selected = dots.filter((d) => !d.chain && (mode === "circle" ? d.inCircle : d.inHex)).length;

  return (
    <div className="rounded-[2rem] border border-line bg-white p-5 shadow-soft sm:p-7">
      <div role="radiogroup" aria-label={t.why.toggleLabel} className="mx-auto mb-4 grid w-full max-w-sm grid-cols-2 rounded-full bg-peach p-1 text-sm font-bold">
        {(["circle", "hex"] as const).map((m) => (
          <button
            key={m}
            role="radio"
            aria-checked={mode === m}
            type="button"
            onClick={() => setMode(m)}
            className={`rounded-full py-2.5 transition-all ${mode === m ? "bg-primary text-white shadow-soft" : "text-brown hover:text-primary"}`}
          >
            {m === "circle" ? t.why.circle : t.why.hexes}
          </button>
        ))}
      </div>

      <svg viewBox="-235 -218 470 436" className="mx-auto block w-full max-w-[520px]" role="img" aria-label={t.why.toggleLabel}>
        {cells.map((c) => {
          const on = mode === "hex" && c.d <= HEX_RINGS;
          return (
            <polygon
              key={`${c.q},${c.r}`}
              points={hexPoints(c.x, c.y, S - 1)}
              fill={on ? "#FFDCC2" : "transparent"}
              stroke="#EBD3C3"
              strokeWidth="1"
              style={{ transition: "fill .5s ease", opacity: mode === "hex" ? 1 : 0.35 }}
            />
          );
        })}
        <circle r={CIRCLE_R} fill="#FFDCC2" fillOpacity={mode === "circle" ? 0.7 : 0} stroke="#964100" strokeOpacity={mode === "circle" ? 1 : 0} strokeWidth="2" strokeDasharray="5 5" style={{ transition: "all .5s ease" }} />
        {dots.map((d) => {
          const sel = mode === "circle" ? d.inCircle : d.inHex;
          return (
            <circle
              key={d.i}
              cx={d.x}
              cy={d.y}
              r={sel && !d.chain ? 8 : 6}
              fill={d.chain ? "#6B4A2B" : sel ? "#5A7D00" : "#C9B3A2"}
              stroke="#fff"
              strokeWidth="2"
              style={{ transition: "all .45s cubic-bezier(.22,1,.36,1)" }}
            />
          );
        })}
        <circle r="9" fill="#492906" />
        <circle r="4" fill="#C8F06E" />
      </svg>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <ul className="flex flex-wrap gap-4 text-xs font-semibold text-brown-soft">
          <li className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-full bg-leaf" />{t.why.legendHuarique}</li>
          <li className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-full bg-brown-soft" />{t.why.legendChain}</li>
          <li className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-full bg-brown ring-2 ring-leaf-light" />{t.why.youHere}</li>
        </ul>
        <p className="text-sm font-bold text-brown" aria-live="polite">
          {t.why.results}: <span className="font-display text-2xl text-leaf">{selected}</span> {t.why.legendHuarique.toLowerCase()}s
        </p>
      </div>
      <p className="mt-3 text-[15px] leading-relaxed text-brown-soft" aria-live="polite">{mode === "circle" ? t.why.circleText : t.why.hexText}</p>
      <p className="mt-1 text-xs text-brown/50">{t.why.illus}</p>
    </div>
  );
}

const ICONS = [MapPinned, Sparkles, Store];

export default function WhySection() {
  const { t } = useApp();
  return (
    <section id="por-que" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="max-w-3xl">
          <h2 className="font-display text-4xl font-extrabold tracking-tight text-brown sm:text-5xl">{t.why.h2}</h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-brown-soft">{t.why.lead}</p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[1.05fr_.95fr] lg:items-start">
          <Reveal><CompareDemo /></Reveal>
          <div className="flex flex-col gap-8">
            {t.why.points.map((p, i) => {
              const Icon = ICONS[i];
              return (
                <Reveal key={p.t} delay={i * 0.08}>
                  <div className="flex gap-4">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-peach text-primary"><Icon size={22} aria-hidden="true" /></span>
                    <div>
                      <h3 className="font-display text-xl font-bold text-brown">{p.t}</h3>
                      <p className="mt-1 leading-relaxed text-brown-soft">{p.d}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        <Reveal className="mt-16 rounded-[2rem] bg-peach p-6 sm:p-8">
          <h3 className="font-display text-xl font-bold text-brown">{t.why.goalsTitle}</h3>
          <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-6 lg:grid-cols-4">
            {t.why.goals.map((g) => (
              <div key={g.n} className="border-l-4 border-leaf-light pl-4">
                <dt className="font-display text-3xl font-extrabold text-primary">{g.n}</dt>
                <dd className="mt-1 text-sm leading-snug text-brown-soft">{g.d}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

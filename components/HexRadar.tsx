"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MapPin } from "lucide-react";
import { hexCells, hexPoints, mulberry } from "@/lib/hex";
import { HUARIQUES } from "@/lib/data";
import { useApp } from "./Providers";

const S = 30;
const RADIUS = 4;

export default function HexRadar() {
  const { t, lang } = useApp();
  const reduce = useReducedMotion();
  const [active, setActive] = useState<string>("0,0");

  const cells = useMemo(() => {
    const rnd = mulberry(2026);
    return hexCells(RADIUS, S).map((c) => {
      const count = c.d === 0 ? 3 : rnd() < 0.34 ? 0 : Math.floor(rnd() * 4) + 1;
      return { ...c, key: `${c.q},${c.r}`, count };
    });
  }, []);

  const current = cells.find((c) => c.key === active) ?? cells[0];
  const sample = HUARIQUES[(Math.abs(current.q * 3 + current.r * 5) + 1) % HUARIQUES.length];
  const label =
    current.d === 0 ? t.hero.yourCell : t.hero.cell.replace("{m}", String(Math.round(current.d * 300)));
  const countText =
    current.count === 0 ? t.hero.countNone : current.count === 1 ? t.hero.countOne : t.hero.count.replace("{n}", String(current.count));

  return (
    <div className="relative rounded-[2rem] bg-brown p-4 shadow-lift sm:p-6">
      <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_50%_45%,rgba(249,115,22,.28),transparent_62%)]" />
      <div className="relative flex items-center justify-between px-1 pb-1">
        <span className="inline-flex items-center gap-2 rounded-full bg-peach/10 px-3 py-1 text-xs font-semibold text-peach">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-leaf-light opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-leaf-light" />
          </span>
          {t.hero.live}
        </span>
        <span className="text-xs text-peach/70">{t.hero.hint}</span>
      </div>

      <svg viewBox="-235 -215 470 430" role="img" aria-label={t.hero.radarAria} className="relative mx-auto block w-full max-w-[520px]">
        {cells.map((c) => {
          const isActive = c.key === active;
          const isYou = c.d === 0;
          const fill = isYou ? "#C8F06E" : c.count ? "#F97316" : "#FFF1E8";
          const op = isYou ? 0.95 : c.count ? 0.14 + c.count * 0.13 : 0.05;
          return (
            <motion.g
              key={c.key}
              initial={reduce ? false : { opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: reduce ? 0 : 0.15 + c.d * 0.11, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
              onMouseEnter={() => setActive(c.key)}
              onClick={() => setActive(c.key)}
              className="cursor-pointer"
            >
              <polygon
                points={hexPoints(c.x, c.y, S - 1.6)}
                fill={fill}
                fillOpacity={op}
                stroke={isActive ? "#C8F06E" : "#FFF1E8"}
                strokeOpacity={isActive ? 1 : 0.2}
                strokeWidth={isActive ? 2.4 : 1}
                style={{ transition: "stroke .2s, stroke-opacity .2s" }}
              />
              {c.count > 0 && !isYou && (
                <text x={c.x} y={c.y + 4.5} textAnchor="middle" fontSize="13" fontWeight="700" fill="#FFF8F5" fillOpacity=".9" pointerEvents="none">
                  {c.count}
                </text>
              )}
            </motion.g>
          );
        })}

        {!reduce && <circle r="200" fill="none" stroke="#C8F06E" strokeWidth="2" className="pulse-ring" pointerEvents="none" />}

        <motion.g
          initial={reduce ? false : { y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.0, type: "spring", stiffness: 260, damping: 14 }}
          pointerEvents="none"
        >
          <circle cx="0" cy="2" r="9" fill="#492906" />
          <circle cx="0" cy="2" r="4" fill="#C8F06E" />
        </motion.g>
      </svg>

      <div className="relative mt-2 rounded-2xl bg-cream/95 p-4 text-brown" aria-live="polite">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl text-xl" style={{ background: sample.tone }} aria-hidden="true">
            {sample.emoji}
          </span>
          <div className="min-w-0 flex-1">
            <p className="flex items-center gap-1.5 text-xs font-semibold text-primary">
              <MapPin size={13} aria-hidden="true" /> {label}
            </p>
            <p className="font-display text-lg font-bold leading-tight">{countText}</p>
            {current.count > 0 && (
              <p className="truncate text-sm text-brown-soft">
                {sample.name} · {sample.dish}
              </p>
            )}
          </div>
        </div>
      </div>
      <span className="sr-only" lang={lang}>{t.hero.radarAria}</span>
    </div>
  );
}

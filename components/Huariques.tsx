"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin, Star, X, UtensilsCrossed } from "lucide-react";
import { HUARIQUES, type CatId } from "@/lib/data";
import { useApp } from "./Providers";
import Reveal from "./Reveal";

export function StatusPill({ open, t }: { open: boolean; t: { open: string; closed: string } }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ${open ? "bg-leaf-light text-[#2f4300]" : "bg-danger/10 text-danger"}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${open ? "bg-leaf" : "bg-danger"}`} />
      {open ? t.open : t.closed}
    </span>
  );
}

export default function Huariques() {
  const { t, lang, query, setQuery } = useApp();
  const [cat, setCat] = useState<CatId | "all">("all");
  const [openOnly, setOpenOnly] = useState(false);

  const list = useMemo(() => {
    const q = query.craving.toLowerCase();
    return HUARIQUES.filter((h) =>
      (cat === "all" || h.cat === cat) &&
      (!openOnly || h.open) &&
      (!query.district || h.district === query.district) &&
      (!q || `${h.name} ${h.dish} ${h.blurb[lang]} ${t.huariques.cats[h.cat]}`.toLowerCase().includes(q))
    );
  }, [cat, openOnly, query, lang, t]);

  const hasQuery = query.craving || query.district;
  const cats = Object.keys(t.huariques.cats) as (CatId | "all")[];
  const resultsText = list.length === 1 ? t.huariques.resultsOne : t.huariques.results.replace("{n}", String(list.length));

  return (
    <section id="huariques" className="scroll-mt-20 bg-peach/60 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="max-w-3xl">
          <h2 className="font-display text-4xl font-extrabold tracking-tight text-brown sm:text-5xl">{t.huariques.h2}</h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-brown-soft">{t.huariques.lead}</p>
        </Reveal>

        <div className="mt-10 flex flex-wrap items-center gap-2" role="group" aria-label={t.huariques.filters}>
          {cats.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={cat === c}
              onClick={() => setCat(c)}
              className={`rounded-full border px-4 py-2 text-sm font-bold transition ${cat === c ? "border-primary bg-primary text-white" : "border-line bg-white text-brown hover:border-primary"}`}
            >
              {t.huariques.cats[c]}
            </button>
          ))}
          <label className="ml-auto flex cursor-pointer items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-brown">
            <input type="checkbox" checked={openOnly} onChange={(e) => setOpenOnly(e.target.checked)} className="h-4 w-4 accent-[#5A7D00]" />
            {t.huariques.openNow}
          </label>
        </div>

        <div className="mt-4 flex min-h-8 flex-wrap items-center gap-3 text-sm text-brown-soft" aria-live="polite">
          <span className="font-semibold">{resultsText}</span>
          {hasQuery && (
            <button type="button" onClick={() => setQuery({ craving: "", district: "" })} className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-bold text-primary">
              {t.huariques.searching}: {query.craving || "—"} {query.district && `${t.huariques.in} ${query.district}`}
              <X size={13} aria-label={t.huariques.clear} />
            </button>
          )}
        </div>

        <motion.ul layout className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {list.map((h, idx) => {
              const feat = idx === 0 && list.length > 2;
              return (
                <motion.li
                  layout
                  key={h.id}
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className={`group flex flex-col overflow-hidden rounded-3xl bg-white shadow-soft transition-shadow hover:shadow-lift ${feat ? "sm:col-span-2" : ""}`}
                >
                  <div className="relative overflow-hidden" style={{ height: feat ? 220 : 160 }}>
                    <img
                      src={h.image}
                      alt={h.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" aria-hidden="true" />
                    {feat && <span className="absolute left-4 top-4 rounded-full bg-brown px-3 py-1 text-xs font-bold text-cream">{t.huariques.featured}</span>}
                    <span className="absolute right-4 top-4"><StatusPill open={h.open} t={t.huariques} /></span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-display text-lg font-bold leading-tight text-brown">{h.name}</h3>
                      <span className="flex shrink-0 items-center gap-1 rounded-lg bg-peach px-2 py-1 text-sm font-bold text-primary"><Star size={13} className="fill-primary" aria-hidden="true" />{h.rating}</span>
                    </div>
                    <p className="mt-1 flex items-center gap-1 text-sm font-semibold text-primary"><UtensilsCrossed size={14} aria-hidden="true" />{h.dish}</p>
                    <p className="mt-2 text-sm leading-relaxed text-brown-soft">{h.blurb[lang]}</p>
                    <div className="mt-auto flex items-end justify-between pt-4">
                      <p className="flex items-center gap-1 text-sm text-brown-soft"><MapPin size={14} aria-hidden="true" />{h.district}, {t.huariques.away.replace("{d}", h.meters >= 1000 ? `${(h.meters / 1000).toFixed(1)} km` : `${h.meters} m`)}</p>
                      <p className="text-sm font-bold text-brown">S/ {h.price[0]}–{h.price[1]}</p>
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </motion.ul>

        {list.length === 0 && (
          <div className="mt-6 rounded-3xl border-2 border-dashed border-line bg-white p-10 text-center">
            <p className="font-display text-xl font-bold text-brown">{t.huariques.emptyT}</p>
            <p className="mx-auto mt-2 max-w-md text-brown-soft">{t.huariques.emptyD}</p>
            <button type="button" onClick={() => { setQuery({ craving: "", district: "" }); setCat("all"); setOpenOnly(false); }} className="mt-5 rounded-full bg-primary px-6 py-3 text-sm font-bold text-white hover:bg-brown">
              {t.huariques.clear}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

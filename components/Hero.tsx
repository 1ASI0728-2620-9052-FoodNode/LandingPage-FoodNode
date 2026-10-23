"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Search, MapPin } from "lucide-react";
import { DISTRICTS } from "@/lib/data";
import { useApp } from "./Providers";

export default function Hero() {
  const { t, setQuery } = useApp();
  const reduce = useReducedMotion();

  const words = t.hero.h1.split(" ");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setQuery({ craving: String(f.get("craving") || "").trim(), district: String(f.get("district") || "") });
    document.getElementById("huariques")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section id="inicio" className="relative overflow-hidden pt-[104px] sm:pt-[120px]">
      <div className="hex-bg pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="relative mx-auto grid grid-cols-1 max-w-7xl items-center gap-10 px-5 pb-16 lg:grid-cols-[1.05fr_.95fr] lg:gap-14 lg:px-8 lg:pb-24">
        <div>
          <h1 className="font-display text-[2.6rem] font-extrabold leading-[1.02] tracking-tight text-brown sm:text-6xl xl:text-[4.4rem]">
            {words.map((w, i) => (
              <span key={`${w}-${i}`}>
              <span className="inline-block overflow-hidden align-bottom">
                <motion.span
                  className="inline-block"
                  initial={reduce ? false : { y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.1 + i * 0.055, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                  {w}
                </motion.span>
              </span>{" "}
              </span>
            ))}
          </h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-brown-soft"
          >
            {t.hero.sub}
          </motion.p>

          <motion.form
            onSubmit={onSubmit}
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="mt-8 grid grid-cols-1 gap-2 rounded-3xl bg-white p-2.5 shadow-lift sm:grid-cols-[1.7fr_1fr_auto] sm:items-end"
            role="search"
          >
            <label className="block rounded-2xl px-4 py-2 focus-within:bg-peach">
              <span className="text-xs font-bold text-primary">{t.hero.craving}</span>
              <input name="craving" type="text" autoComplete="off" placeholder={t.hero.cravingPh} className="mt-0.5 w-full bg-transparent text-base font-medium text-brown placeholder:text-brown/40 focus:outline-none" />
            </label>
            <label className="block rounded-2xl px-4 py-2 focus-within:bg-peach">
              <span className="flex items-center gap-1 text-xs font-bold text-primary"><MapPin size={12} aria-hidden="true" />{t.hero.district}</span>
              <select name="district" defaultValue="" className="mt-0.5 w-full bg-transparent text-base font-medium text-brown focus:outline-none">
                <option value="">{t.hero.allDistricts}</option>
                {DISTRICTS.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            </label>
            <button type="submit" className="flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 text-base font-bold text-white transition hover:bg-brown">
              <Search size={18} aria-hidden="true" /> {t.hero.search}
            </button>
          </motion.form>

          <motion.p initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }} className="mt-4 flex items-center gap-2 text-sm font-medium text-leaf">
            <span className="h-2 w-2 rounded-full bg-leaf" aria-hidden="true" /> {t.hero.note}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto w-full max-w-[560px]"
        >
          <div className="overflow-hidden rounded-[2.5rem] shadow-lift ring-1 ring-black/5">
            <img
              src="/assets/huarique.jpg"
              alt="Huarique auténtico de Lima"
              className="h-full w-full object-cover"
              style={{ aspectRatio: "4/3" }}
            />
          </div>
        </motion.div>
      </div>

      <div className="relative overflow-hidden border-y border-line bg-peach py-3.5" aria-hidden="true">
        <div className="marquee flex w-max gap-10 whitespace-nowrap font-display text-lg font-bold text-primary">
          {[0, 1].map((k) => (
            <div key={k} className="flex gap-10">
              {t.marquee.map((m) => (
                <span key={`${k}-${m}`} className="flex items-center gap-10">{m}<span className="text-leaf">✦</span></span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

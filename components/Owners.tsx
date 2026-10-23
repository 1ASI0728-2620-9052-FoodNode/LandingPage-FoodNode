"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, CircleCheck, Store, X } from "lucide-react";
import { useApp } from "./Providers";
import Reveal from "./Reveal";

type Status = "pending" | "approved" | "rejected";

function AdminPanel() {
  const { t } = useApp();
  const [isOpen, setIsOpen] = useState(true);
  const [price, setPrice] = useState("32");
  const [toast, setToast] = useState<{ ok: boolean; msg: string } | null>(null);
  const [tab, setTab] = useState<Status>("pending");
  const [status, setStatus] = useState<Status[]>(["pending", "pending", "pending"]);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  function save(e: React.FormEvent) {
    e.preventDefault();
    const n = Number(price);
    const ok = Number.isFinite(n) && n > 0;
    setToast({ ok, msg: ok ? t.owners.saved.replace("{p}", n.toFixed(2).replace(/\.00$/, "")) : t.owners.invalid });
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(null), 3500);
  }

  const count = (s: Status) => status.filter((x) => x === s).length;
  const items = t.owners.list.map((r, i) => ({ ...r, i, s: status[i] })).filter((r) => r.s === tab);
  const set = (i: number, s: Status) => setStatus((p) => p.map((x, k) => (k === i ? s : x)));

  return (
    <div className="overflow-hidden rounded-[2rem] border border-line bg-white shadow-lift">
      <div className="flex items-center justify-between bg-primary px-5 py-4 text-white">
        <p className="flex items-center gap-2 font-display text-lg font-bold"><Store size={20} aria-hidden="true" />{t.owners.panel}</p>
        <p className="text-xs text-white/80">{t.owners.panelSub}</p>
      </div>

      <form onSubmit={save} className="grid grid-cols-1 gap-4 border-b border-line p-5 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
        <div>
          <p className="text-xs font-bold text-primary" id="st-l">{t.owners.status}</p>
          <button
            type="button"
            role="switch"
            aria-checked={isOpen}
            aria-labelledby="st-l"
            onClick={() => setIsOpen((o) => !o)}
            className={`mt-1.5 flex w-full items-center justify-between rounded-2xl px-4 py-3 font-bold transition-colors ${isOpen ? "bg-leaf-light text-[#2f4300]" : "bg-danger/10 text-danger"}`}
          >
            {isOpen ? t.owners.isOpen : t.owners.isClosed}
            <span className={`relative h-6 w-11 rounded-full transition-colors ${isOpen ? "bg-leaf" : "bg-danger/60"}`}>
              <motion.span layout transition={{ type: "spring", stiffness: 500, damping: 30 }} className={`absolute top-0.5 h-5 w-5 rounded-full bg-white ${isOpen ? "right-0.5" : "left-0.5"}`} />
            </span>
          </button>
        </div>
        <label className="block">
          <span className="text-xs font-bold text-primary">{t.owners.dish}: {t.owners.dishName}</span>
          <span className="mt-1.5 flex items-center rounded-2xl border-2 border-line bg-cream px-4 focus-within:border-primary">
            <span className="text-sm font-bold text-brown-soft" aria-hidden="true">S/</span>
            <input value={price} onChange={(e) => setPrice(e.target.value)} inputMode="decimal" aria-label={t.owners.price} className="w-full bg-transparent px-2 py-3 font-bold text-brown focus:outline-none" />
          </span>
        </label>
        <button type="submit" className="rounded-2xl bg-primary px-5 py-3.5 font-bold text-white transition hover:bg-brown">{t.owners.save}</button>
        <AnimatePresence>
          {toast && (
            <motion.p
              role="status"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold sm:col-span-3 ${toast.ok ? "bg-leaf-light text-[#2f4300]" : "bg-danger/10 text-danger"}`}
            >
              {toast.ok ? <CircleCheck size={16} /> : <X size={16} />}{toast.msg}
            </motion.p>
          )}
        </AnimatePresence>
      </form>

      <div className="p-5">
        <p className="font-display text-lg font-bold text-brown">{t.owners.reservations}</p>
        <div role="tablist" className="mt-3 grid grid-cols-3 rounded-full bg-peach p-1 text-xs font-bold sm:text-sm">
          {(["pending", "approved", "rejected"] as const).map((s) => (
            <button key={s} role="tab" aria-selected={tab === s} onClick={() => setTab(s)} className={`rounded-full px-2 py-2 transition ${tab === s ? "bg-white text-primary shadow-soft" : "text-brown-soft"}`}>
              {t.owners.tabs[s]} <span className={`ml-1 rounded-full px-1.5 py-0.5 text-[11px] ${s === "pending" ? "bg-flame text-brown" : s === "approved" ? "bg-leaf-light text-[#2f4300]" : "bg-danger/15 text-danger"}`}>{count(s)}</span>
            </button>
          ))}
        </div>

        <ul className="mt-4 min-h-[170px] space-y-3" role="tabpanel">
          <AnimatePresence mode="popLayout" initial={false}>
            {items.map((r) => (
              <motion.li layout key={r.i} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} className="rounded-2xl bg-cream p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-bold text-brown">{r.who} <span className="font-medium text-brown-soft">· {r.n} {t.owners.people}</span></p>
                  <span className="rounded-full bg-peach px-3 py-1 text-xs font-bold text-primary">{r.when}</span>
                </div>
                <p className="mt-1 text-sm text-brown-soft">{r.dish}</p>
                {r.s === "pending" && (
                  <div className="mt-3 flex gap-2">
                    <button onClick={() => set(r.i, "approved")} className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-leaf py-2.5 text-sm font-bold text-white hover:brightness-110"><Check size={16} />{t.owners.approve}</button>
                    <button onClick={() => set(r.i, "rejected")} className="rounded-xl border border-danger/40 px-4 py-2.5 text-sm font-bold text-danger hover:bg-danger/10">{t.owners.reject}</button>
                  </div>
                )}
              </motion.li>
            ))}
          </AnimatePresence>
          {items.length === 0 && <li className="grid h-[150px] place-items-center text-sm text-brown-soft">{t.owners.noRes}</li>}
        </ul>
      </div>
    </div>
  );
}

export default function Owners() {
  const { t, openAuth } = useApp();
  return (
    <section id="duenos" className="scroll-mt-20 bg-peach/60 py-20 sm:py-28">
      <div className="mx-auto grid grid-cols-1 max-w-7xl items-center gap-12 px-5 lg:grid-cols-[.9fr_1.1fr] lg:px-8">
        <Reveal>
          <h2 className="font-display text-4xl font-extrabold tracking-tight text-brown sm:text-5xl">{t.owners.h2}</h2>
          <p className="mt-4 text-xl font-medium text-primary">{t.owners.lead}</p>
          <ul className="mt-8 space-y-4">
            {t.owners.bullets.map((b) => (
              <li key={b} className="flex gap-3 text-lg leading-snug text-brown">
                <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-leaf text-white"><Check size={14} strokeWidth={3} aria-hidden="true" /></span>
                {b}
              </li>
            ))}
          </ul>
          <button type="button" onClick={() => openAuth("register", "owner")} className="mt-9 rounded-full bg-primary px-8 py-4 text-base font-bold text-white shadow-soft transition hover:bg-brown">
            {t.owners.cta}
          </button>
        </Reveal>
        <Reveal delay={0.1}><AdminPanel /></Reveal>
      </div>
    </section>
  );
}

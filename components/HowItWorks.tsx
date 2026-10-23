"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Check, Clock, MapPin, RotateCcw, Star } from "lucide-react";
import { HUARIQUES } from "@/lib/data";
import { useApp } from "./Providers";
import { StatusPill } from "./Huariques";
import Reveal from "./Reveal";

type Msg =
  | { id: number; from: "user"; text: string }
  | { id: number; from: "lia"; text: string; card?: string; status?: "pending" | "approved" };

function MiniCard({ id }: { id: string }) {
  const { t } = useApp();
  const h = HUARIQUES.find((x) => x.id === id)!;
  return (
    <div className="mt-2 flex items-center gap-3 rounded-2xl bg-cream p-3 text-brown">
      <span className="grid h-12 w-12 place-items-center rounded-xl text-2xl" style={{ background: h.tone }} aria-hidden="true">{h.emoji}</span>
      <div className="min-w-0 flex-1">
        <p className="truncate font-display font-bold leading-tight">{h.name}</p>
        <p className="flex items-center gap-2 text-xs text-brown-soft">
          <span className="flex items-center gap-0.5"><Star size={12} className="fill-primary text-primary" />{h.rating}</span>
          <span className="flex items-center gap-0.5"><MapPin size={12} />{h.meters} m</span>
          <span>{h.dish}</span>
        </p>
      </div>
      <StatusPill open={h.open} t={t.huariques} />
    </div>
  );
}

function LiaChat() {
  const { t } = useApp();
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(false);
  const idRef = useRef(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  useEffect(() => { endRef.current?.scrollTo({ top: endRef.current.scrollHeight, behavior: "smooth" }); }, [msgs, typing]);

  const cardId = (k: string) => (k === "ají" ? "h4" : "h1");

  function ask(i: number) {
    if (typing) return;
    const p = t.how.prompts[i];
    const uid = ++idRef.current;
    setMsgs((m) => [...m, { id: uid, from: "user", text: p.chip }]);
    setTyping(true);
    timers.current.push(setTimeout(() => {
      const lid = ++idRef.current;
      const isRes = p.card === "reserva";
      setMsgs((m) => [...m, { id: lid, from: "lia", text: p.reply, card: cardId(p.card), status: isRes ? "pending" : undefined }]);
      setTyping(false);
      if (isRes) {
        timers.current.push(setTimeout(() => {
          setMsgs((m) => [
            ...m.map((x) => (x.id === lid && x.from === "lia" ? { ...x, status: "approved" as const } : x)),
            { id: ++idRef.current, from: "lia", text: t.how.approvedMsg }
          ]);
        }, 2600));
      }
    }, 1100));
  }

  function reset() {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setMsgs([]);
    setTyping(false);
  }

  return (
    <div className="overflow-hidden rounded-[2rem] bg-brown text-cream shadow-lift">
      <div className="flex items-center gap-3 border-b border-cream/10 px-5 py-4">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-leaf-light text-brown"><Bot size={22} aria-hidden="true" /></span>
        <div className="flex-1">
          <p className="font-display font-bold leading-tight">{t.how.chatTitle}</p>
          <p className="text-xs text-peach/70">{t.how.chatSub}</p>
        </div>
        {msgs.length > 0 && (
          <button type="button" onClick={reset} className="flex items-center gap-1.5 rounded-full bg-cream/10 px-3 py-1.5 text-xs font-semibold hover:bg-cream/20">
            <RotateCcw size={13} aria-hidden="true" /> {t.how.reset}
          </button>
        )}
      </div>

      <div ref={endRef} className="h-[340px] space-y-3 overflow-y-auto px-5 py-4" aria-live="polite">
        {msgs.length === 0 && !typing && <p className="grid h-full place-items-center text-center text-sm text-peach/70">{t.how.empty}</p>}
        <AnimatePresence initial={false}>
          {msgs.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={m.from === "user" ? "flex justify-end" : "flex justify-start"}
            >
              <div className={`max-w-[88%] rounded-2xl px-4 py-2.5 text-[15px] leading-snug ${m.from === "user" ? "rounded-br-md bg-primary text-white" : "rounded-bl-md bg-peach/95 text-brown"}`}>
                {m.text}
                {m.from === "lia" && m.card && <MiniCard id={m.card} />}
                {m.from === "lia" && m.status && (
                  <motion.p
                    key={m.status}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={`mt-2 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${m.status === "pending" ? "bg-flame text-brown" : "bg-leaf-light text-[#2f4300]"}`}
                  >
                    {m.status === "pending" ? <Clock size={13} /> : <Check size={13} />}
                    {t.how.reservation}: {m.status === "pending" ? t.how.pending : t.how.approved}
                  </motion.p>
                )}
              </div>
            </motion.div>
          ))}
          {typing && (
            <motion.div key="typing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex justify-start">
              <div className="flex gap-1 rounded-2xl rounded-bl-md bg-peach/95 px-4 py-3" role="status" aria-label={t.how.typing}>
                {[0, 1, 2].map((d) => <span key={d} className="typing-dot h-2 w-2 rounded-full bg-primary" style={{ animationDelay: `${d * 0.15}s` }} />)}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex flex-wrap gap-2 border-t border-cream/10 p-4" role="group" aria-label={t.how.inputAria}>
        {t.how.prompts.map((p, i) => (
          <button key={p.chip} type="button" disabled={typing} onClick={() => ask(i)} className="rounded-full border border-cream/25 px-4 py-2 text-sm font-semibold text-cream transition hover:border-leaf-light hover:bg-leaf-light hover:text-brown disabled:opacity-50">
            {p.chip}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function HowItWorks() {
  const { t } = useApp();
  return (
    <section id="como-funciona" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="max-w-3xl">
          <h2 className="font-display text-4xl font-extrabold tracking-tight text-brown sm:text-5xl">{t.how.h2}</h2>
          <p className="mt-4 text-lg text-brown-soft">{t.how.lead}</p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1fr] lg:items-start">
          <ol className="relative space-y-8">
            <span className="absolute bottom-3 left-[19px] top-3 w-0.5 bg-line" aria-hidden="true" />
            {t.how.steps.map((s, i) => (
              <Reveal key={s.t} delay={i * 0.07}>
                <li className="relative flex gap-5">
                  <span className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary font-display text-lg font-extrabold text-white ring-4 ring-cream">{i + 1}</span>
                  <div className="pt-1">
                    <h3 className="font-display text-xl font-bold text-brown">{s.t}</h3>
                    <p className="mt-1 max-w-md leading-relaxed text-brown-soft">{s.d}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
          <Reveal><LiaChat /></Reveal>
        </div>
      </div>
    </section>
  );
}

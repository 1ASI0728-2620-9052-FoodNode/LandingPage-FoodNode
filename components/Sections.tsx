"use client";

import { Quote } from "lucide-react";
import { useApp } from "./Providers";
import { Logo } from "./Logo";
import Reveal from "./Reveal";

export function Stories() {
  const { t } = useApp();
  return (
    <section id="historias" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="max-w-3xl">
          <h2 className="font-display text-4xl font-extrabold tracking-tight text-brown sm:text-5xl">{t.stories.h2}</h2>
          <p className="mt-4 text-lg leading-relaxed text-brown-soft">{t.stories.lead}</p>
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {t.stories.items.map((s, i) => (
            <Reveal key={s.t} delay={i * 0.1}>
              <article className={`relative h-full overflow-hidden rounded-[2rem] p-8 sm:p-10 ${i === 0 ? "bg-primary text-white" : "bg-leaf-light text-brown"}`}>
                <Quote size={64} className="absolute -right-2 -top-2 opacity-15" aria-hidden="true" />
                <p className={`text-sm font-bold ${i === 0 ? "text-peach" : "text-leaf"}`}>{s.who}</p>
                <p className="mt-3 font-display text-2xl font-extrabold leading-tight sm:text-3xl">{s.t}</p>
                <p className={`mt-4 text-lg leading-relaxed ${i === 0 ? "text-white/90" : "text-brown/85"}`}>{s.d}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Features data (sin jerga técnica) ── */
const FEATURES_ES = [
  { icon: "📍", title: "Encuentra lo que tienes cerca", desc: "Ve en segundos qué huariques hay a pocas cuadras de donde estás, con foto, precio y si están abiertos ahora." },
  { icon: "🤖", title: "Pregúntale a Lía", desc: "Escríbele como si fuera una amiga. Dile 'algo picante y barato' y ella te recomienda el lugar perfecto." },
  { icon: "📅", title: "Reserva en el chat", desc: "Pide tu mesa directamente desde la conversación con Lía y el dueño te confirma en minutos." },
  { icon: "🗺️", title: "Mapa en tiempo real", desc: "Mira los restaurantes en el mapa y sigue la ruta para llegar sin perderte." },
  { icon: "⭐", title: "Sin publicidad pagada", desc: "Lo que aparece primero es lo más cercano a ti, no lo que pagó más por salir primero." },
  { icon: "🏪", title: "Para dueños de huariques", desc: "Sube tu carta, actualiza precios y gestiona reservas desde un panel simple, sin necesitar ayuda técnica." },
];

const FEATURES_EN = [
  { icon: "📍", title: "Find what's nearby", desc: "See in seconds which huariques are a few blocks away, with photo, price and whether they are open now." },
  { icon: "🤖", title: "Ask Lía", desc: "Message her like a friend. Say 'something spicy and cheap' and she recommends the perfect spot." },
  { icon: "📅", title: "Book in the chat", desc: "Request your table directly from the conversation with Lía and the owner confirms in minutes." },
  { icon: "🗺️", title: "Real-time map", desc: "See restaurants on the map and follow the route to get there without getting lost." },
  { icon: "⭐", title: "No paid ads", desc: "What appears first is what is closest to you, not what paid the most to show up first." },
  { icon: "🏪", title: "For huarique owners", desc: "Upload your menu, update prices and manage bookings from a simple panel, no tech help needed." },
];

const TONES = ["#964100", "#5A7D00", "#492906", "#B85A12", "#6B4A2B", "#5A7D00"];

export function About() {
  const { t, lang } = useApp();
  const features = lang === "es" ? FEATURES_ES : FEATURES_EN;

  return (
    <section id="nosotros" className="scroll-mt-20 bg-peach/60 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">

        {/* ── Quiénes somos ── */}
        <Reveal className="max-w-3xl">
          <h2 className="font-display text-4xl font-extrabold tracking-tight text-brown sm:text-5xl">{t.about.h2}</h2>
          <p className="mt-5 text-lg leading-relaxed text-brown">{t.about.p1}</p>
          <p className="mt-4 text-lg leading-relaxed text-brown-soft">{t.about.p2}</p>
        </Reveal>

        {/* ── Misión y Visión ── */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <Reveal>
            <div className="flex h-full flex-col gap-4 rounded-3xl bg-primary p-8 text-white shadow-lift">
              <span className="text-5xl" aria-hidden="true">🎯</span>
              <p className="font-display text-2xl font-extrabold">{t.about.mission}</p>
              <p className="text-lg leading-relaxed text-white/90">{t.about.missionD}</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex h-full flex-col gap-4 rounded-3xl bg-brown p-8 text-cream shadow-lift">
              <span className="text-5xl" aria-hidden="true">🌟</span>
              <p className="font-display text-2xl font-extrabold text-leaf-light">{t.about.vision}</p>
              <p className="text-lg leading-relaxed text-cream/90">{t.about.visionD}</p>
            </div>
          </Reveal>
        </div>

        {/* ── Funcionalidades ── */}
        <Reveal className="mt-16">
          <p className="font-display text-2xl font-bold text-brown">
            {lang === "es" ? "¿Qué puedes hacer con Foodly?" : "What can you do with Foodly?"}
          </p>
          <p className="mt-2 text-lg text-brown-soft">
            {lang === "es"
              ? "Todo lo que necesitas para encontrar y disfrutar la mejor comida cerca de ti."
              : "Everything you need to find and enjoy the best food near you."}
          </p>
        </Reveal>
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.07}>
              <div className="flex gap-4 rounded-3xl bg-white p-6 shadow-soft transition duration-200 hover:-translate-y-1 hover:shadow-lift">
                <span className="shrink-0 text-4xl leading-none" aria-hidden="true">{f.icon}</span>
                <div>
                  <p className="font-display font-bold text-brown">{f.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-brown-soft">{f.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ── Equipo ── */}
        <Reveal className="mt-16">
          <p className="font-display text-2xl font-bold text-brown">{t.about.team}</p>
          <ul className="mt-6 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {t.about.people.map((p, i) => (
              <li key={p.n} className="flex items-center gap-4">
                <span
                  className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl font-display text-lg font-extrabold text-white"
                  style={{ background: TONES[i] }}
                  aria-hidden="true"
                >
                  {p.n.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                </span>
                <div>
                  <p className="font-display font-bold text-brown">{p.n}</p>
                  <p className="text-sm leading-snug text-brown-soft">{p.r}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

export function FinalCta() {
  const { t, openAuth } = useApp();
  return (
    <section className="px-5 py-20 sm:py-24 lg:px-8">
      <Reveal className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] bg-primary px-6 py-16 text-center text-white sm:px-12">
        <div className="hex-bg-light pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
        <h2 className="relative mx-auto max-w-3xl font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">{t.cta.h2}</h2>
        <p className="relative mx-auto mt-4 max-w-xl text-lg text-white/85">{t.cta.p}</p>
        <div className="relative mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <button type="button" onClick={() => openAuth("register", "explorer")} className="rounded-full bg-leaf-light px-8 py-4 font-bold text-brown transition hover:scale-105">{t.cta.a}</button>
          <button type="button" onClick={() => openAuth("register", "owner")} className="rounded-full border-2 border-white/60 px-8 py-4 font-bold text-white transition hover:bg-white hover:text-primary">{t.cta.b}</button>
        </div>
      </Reveal>
    </section>
  );
}

export function Footer() {
  const { t } = useApp();
  return (
    <footer className="bg-brown text-cream">
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.2fr_2fr]">
          <div>
            <Logo light />
            <p className="mt-3 max-w-xs text-cream/70">{t.footer.tagline}</p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {t.footer.cols.map((c) => (
              <nav key={c.t} aria-label={c.t}>
                <p className="font-display font-bold text-leaf-light">{c.t}</p>
                <ul className="mt-3 space-y-2 text-sm">
                  {c.l.map((l) => (<li key={l}><a href="#" className="text-cream/75 hover:text-white hover:underline">{l}</a></li>))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
        <p className="mt-12 border-t border-cream/15 pt-6 text-xs text-cream/60">© 2026 Foodly by FoodNode. {t.footer.uni}</p>
      </div>
    </footer>
  );
}

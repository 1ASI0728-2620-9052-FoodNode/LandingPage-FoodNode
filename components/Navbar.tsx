"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useApp } from "./Providers";
import { Logo } from "./Logo";

export function LangSwitch() {
  const { lang, setLang, t } = useApp();
  return (
    <div role="group" aria-label={t.nav.langGroup} className="inline-flex rounded-full border border-line bg-white p-0.5 text-xs font-bold">
      {(["es", "en"] as const).map((l) => (
        <button
          key={l}
          type="button"
          aria-pressed={lang === l}
          onClick={() => setLang(l)}
          className={`rounded-full px-2.5 py-1 transition-colors ${lang === l ? "bg-primary text-white" : "text-brown hover:bg-peach"}`}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export default function Navbar() {
  const { t, openAuth } = useApp();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${scrolled ? "bg-cream/90 shadow-soft backdrop-blur-md" : "bg-transparent"}`}>
      <nav aria-label={t.nav.main} className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-5 lg:px-8">
        <a href="#inicio" aria-label={t.nav.home} className="rounded-lg"><Logo /></a>

        <ul className="hidden items-center gap-1 lg:flex">
          {t.nav.links.map((l) => (
            <li key={l.id}>
              <a href={`#${l.id}`} className="rounded-full px-3.5 py-2 text-sm font-semibold text-brown transition-colors hover:bg-peach hover:text-primary">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <LangSwitch />
          <button type="button" onClick={() => openAuth("login")} className="hidden rounded-full px-4 py-2 text-sm font-semibold text-brown hover:bg-peach sm:block">
            {t.nav.login}
          </button>
          <button type="button" onClick={() => openAuth("register")} className="hidden rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-soft transition hover:bg-brown sm:block">
            {t.nav.signup}
          </button>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full bg-peach text-brown lg:hidden"
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-line bg-cream lg:hidden"
          >
            <ul className="flex flex-col gap-1 p-4">
              {t.nav.links.map((l) => (
                <li key={l.id}>
                  <a href={`#${l.id}`} onClick={() => setOpen(false)} className="block rounded-xl px-4 py-3 text-base font-semibold text-brown hover:bg-peach">
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="mt-2 flex gap-2">
                <button type="button" onClick={() => { setOpen(false); openAuth("login"); }} className="flex-1 rounded-full border border-line bg-white py-3 font-semibold text-brown">{t.nav.login}</button>
                <button type="button" onClick={() => { setOpen(false); openAuth("register"); }} className="flex-1 rounded-full bg-primary py-3 font-bold text-white">{t.nav.signup}</button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

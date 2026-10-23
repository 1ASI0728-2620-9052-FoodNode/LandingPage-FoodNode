"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { dict, type Dict, type Lang } from "@/lib/i18n";

export type AuthMode = "register" | "login";
export type Role = "explorer" | "owner";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Dict;
  auth: { open: boolean; mode: AuthMode; role: Role };
  openAuth: (mode?: AuthMode, role?: Role) => void;
  closeAuth: () => void;
  query: { craving: string; district: string };
  setQuery: (q: { craving: string; district: string }) => void;
};

const AppCtx = createContext<Ctx | null>(null);

export function Providers({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("es");
  const [auth, setAuth] = useState<Ctx["auth"]>({ open: false, mode: "register", role: "explorer" });
  const [query, setQuery] = useState({ craving: "", district: "" });

  // Cambio de idioma instantáneo, sin recargar (RNF-04)
  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    document.documentElement.lang = l === "es" ? "es-419" : "en-US";
    try { localStorage.setItem("foodly-lang", l); } catch {}
  }, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("foodly-lang") as Lang | null;
      if (saved === "es" || saved === "en") setLang(saved);
      else if (navigator.language?.toLowerCase().startsWith("en")) setLang("en");
    } catch {}
  }, [setLang]);

  const openAuth = useCallback((mode: AuthMode = "register", role: Role = "explorer") => setAuth({ open: true, mode, role }), []);
  const closeAuth = useCallback(() => setAuth((a) => ({ ...a, open: false })), []);

  const value = useMemo(
    () => ({ lang, setLang, t: dict[lang], auth, openAuth, closeAuth, query, setQuery }),
    [lang, setLang, auth, openAuth, closeAuth, query]
  );
  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>;
}

export function useApp() {
  const c = useContext(AppCtx);
  if (!c) throw new Error("useApp must be used inside <Providers>");
  return c;
}

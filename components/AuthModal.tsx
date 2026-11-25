"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CircleCheck, X } from "lucide-react";
import { useApp, type AuthMode, type Role } from "./Providers";
import { IAM_ROLE, IamError, login, register, type IamErrorKind } from "@/lib/iamClient";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// IAM: 8 a 72 caracteres, con al menos una letra y un número.
const PASS = /^(?=.*[A-Za-z])(?=.*\d).{8,72}$/;
// IAM: 3 a 30 caracteres entre letras, números y guion bajo.
const USERNAME = /^[A-Za-z0-9_]{3,30}$/;

type FieldKey = "name" | "username" | "email" | "password";

/** Tipo de fallo de IAM -> clave del mensaje traducido en t.auth. */
const ERROR_TEXT = {
  invalid: "errInvalid",
  unauthorized: "errUnauthorized",
  forbidden: "errForbidden",
  conflict: "errConflict",
  tooMany: "errTooMany",
  server: "errServer",
  network: "errNetwork",
  config: "errConfig"
} as const satisfies Record<IamErrorKind, string>;

export default function AuthModal() {
  const { t, auth, closeAuth, openAuth, setSession } = useApp();
  const { open, mode, role } = auth;
  const [form, setForm] = useState({ name: "", username: "", email: "", password: "" });
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const alertRef = useRef<HTMLParagraphElement>(null);
  // Identifica la petición vigente: la respuesta de una anterior (modal cerrado o reabierto) se ignora.
  const requestId = useRef(0);
  const discardPendingRequest = useCallback(() => { requestId.current++; }, []);

  // Reiniciar al abrir, devolver el foco al cerrar, bloquear scroll
  useEffect(() => {
    if (!open) return;
    lastFocus.current = document.activeElement as HTMLElement;
    setErrors({}); setFormError(null); setSubmitting(false); setDone(null);
    discardPendingRequest();
    document.body.style.overflow = "hidden";
    const id = setTimeout(() => dialogRef.current?.querySelector<HTMLElement>("input, button")?.focus(), 60);
    return () => {
      clearTimeout(id);
      discardPendingRequest();
      setForm((f) => ({ ...f, password: "" }));
      document.body.style.overflow = "";
      lastFocus.current?.focus();
    };
  }, [open, discardPendingRequest]);

  // Al cambiar entre registro e inicio de sesión, el error del servidor ya no aplica
  useEffect(() => { setFormError(null); }, [mode]);

  // Esc para cerrar y focus trap
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return closeAuth();
      if (e.key !== "Tab" || !dialogRef.current) return;
      const f = Array.from(dialogRef.current.querySelectorAll<HTMLElement>("button, input, a[href]")).filter((x) => !x.hasAttribute("disabled"));
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, closeAuth]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    const err: typeof errors = {};
    const name = form.name.trim();
    const username = form.username.trim();
    const email = form.email.trim();
    if (mode === "register" && (name.length < 2 || name.length > 150)) err.name = t.auth.errName;
    if (mode === "register" && !USERNAME.test(username)) err.username = t.auth.errUsername;
    if (!EMAIL.test(email)) err.email = t.auth.errEmail;
    if (!PASS.test(form.password)) err.password = t.auth.errPass;
    setErrors(err);
    setFormError(null);
    if (Object.keys(err).length) {
      requestAnimationFrame(() => dialogRef.current?.querySelector<HTMLElement>("[aria-invalid='true']")?.focus());
      return;
    }

    const id = ++requestId.current;
    setSubmitting(true);
    try {
      const result = mode === "register"
        ? await register({ name, username, email, password: form.password, role: IAM_ROLE[role] })
        : await login({ email, password: form.password });
      if (id !== requestId.current) return;
      setSession(result); // solo en memoria: nada de localStorage
      setForm((f) => ({ ...f, password: "" }));
      setDone(mode === "register" ? t.auth.okD.replace("{n}", name.split(" ")[0]) : t.auth.okLogin);
    } catch (error) {
      if (id !== requestId.current) return;
      const kind: IamErrorKind = error instanceof IamError ? error.kind : "server";
      setFormError(t.auth[ERROR_TEXT[kind]]);
      // El foco pasa al aviso para que el lector de pantalla lo anuncie y el teclado no se pierda
      requestAnimationFrame(() => alertRef.current?.focus());
    } finally {
      if (id === requestId.current) setSubmitting(false);
    }
  }

  const field = (key: FieldKey, label: string, type: string, hint?: string) => (
    <div>
      <label htmlFor={`f-${key}`} className="text-sm font-bold text-brown">{label}</label>
      <input
        id={`f-${key}`}
        type={type}
        value={form[key]}
        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
        aria-invalid={!!errors[key]}
        aria-describedby={errors[key] ? `e-${key}` : hint ? `h-${key}` : undefined}
        autoComplete={key === "name" ? "name" : key === "username" ? "username" : key === "email" ? "email" : mode === "login" ? "current-password" : "new-password"}
        className={`mt-1 w-full rounded-xl border-2 bg-cream px-4 py-3 font-medium text-brown focus:border-primary focus:outline-none ${errors[key] ? "border-danger" : "border-line"}`}
      />
      {errors[key] ? <p id={`e-${key}`} className="mt-1 text-sm font-semibold text-danger">{errors[key]}</p> : hint ? <p id={`h-${key}`} className="mt-1 text-xs text-brown-soft">{hint}</p> : null}
    </div>
  );

  const roles: Role[] = ["explorer", "owner"];

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-brown/60 p-4 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(e) => e.target === e.currentTarget && closeAuth()}>
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="auth-title"
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
            className="relative my-auto w-full max-w-md rounded-[2rem] bg-white p-7 shadow-lift"
          >
            <button type="button" onClick={closeAuth} aria-label={t.auth.close} className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-peach text-brown hover:bg-primary hover:text-white"><X size={18} /></button>

            {done ? (
              <div className="py-6 text-center" role="status">
                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, damping: 15 }} className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-leaf-light text-leaf"><CircleCheck size={34} /></motion.span>
                <h2 id="auth-title" className="mt-4 font-display text-2xl font-extrabold text-brown">{mode === "register" ? t.auth.okT : t.auth.loginT}</h2>
                <p className="mt-2 text-brown-soft">{done}</p>
                <button type="button" onClick={closeAuth} className="mt-6 w-full rounded-full bg-primary py-3.5 font-bold text-white hover:bg-brown">{t.auth.done}</button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate aria-busy={submitting} className="space-y-4">
                <div className="pr-10">
                  <h2 id="auth-title" className="font-display text-2xl font-extrabold text-brown">{mode === "register" ? t.auth.registerT : t.auth.loginT}</h2>
                  <p className="mt-1 text-brown-soft">{mode === "register" ? t.auth.registerSub : t.auth.loginSub}</p>
                </div>

                {mode === "register" && (
                  <fieldset>
                    <legend className="mb-1 text-sm font-bold text-brown">{t.auth.role}</legend>
                    <div className="grid grid-cols-2 gap-2">
                      {roles.map((r) => (
                        <label key={r} className={`cursor-pointer rounded-xl border-2 px-3 py-3 text-center text-sm font-bold transition ${role === r ? "border-primary bg-peach text-primary" : "border-line text-brown-soft hover:border-primary/50"}`}>
                          <input type="radio" name="role" value={r} checked={role === r} onChange={() => openAuth("register", r)} className="sr-only" />
                          {t.auth[r]}
                        </label>
                      ))}
                    </div>
                  </fieldset>
                )}

                {Object.keys(errors).length > 0 && (
                  <p role="alert" className="rounded-xl bg-danger/10 px-4 py-2.5 text-sm font-bold text-danger">{t.auth.errTitle}</p>
                )}
                {formError && (
                  <p ref={alertRef} role="alert" tabIndex={-1} className="rounded-xl bg-danger/10 px-4 py-2.5 text-sm font-bold text-danger focus:outline-none focus-visible:ring-2 focus-visible:ring-danger">{formError}</p>
                )}

                {mode === "register" && field("name", t.auth.name, "text")}
                {mode === "register" && field("username", t.auth.username, "text", t.auth.usernameHint)}
                {field("email", t.auth.email, "email")}
                {field("password", t.auth.password, "password", mode === "register" ? t.auth.passHint : undefined)}

                {/* aria-disabled (no disabled) para que el botón conserve el foco mientras se envía */}
                <button type="submit" aria-disabled={submitting} className={`w-full rounded-full bg-primary py-3.5 text-base font-bold text-white shadow-soft transition hover:bg-brown ${submitting ? "cursor-wait opacity-70" : ""}`}>
                  {submitting ? t.auth.submitting : mode === "register" ? t.auth.submitReg : t.auth.submitLogin}
                </button>
                <button type="button" onClick={() => openAuth(mode === "register" ? "login" : "register", role)} className="w-full text-center text-sm font-semibold text-primary hover:underline">
                  {mode === "register" ? t.auth.toLogin : t.auth.toRegister}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

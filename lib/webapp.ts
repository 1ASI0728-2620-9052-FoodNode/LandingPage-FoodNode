/**
 * Foodly Web App (Foodly-WebApp). "Iniciar sesión" and "Explorar platos" send visitors there.
 * NEXT_PUBLIC_WEBAPP_URL is public (it is inlined at build time): never put secrets in it.
 */
export const WEBAPP_URL = (process.env.NEXT_PUBLIC_WEBAPP_URL || "http://localhost:5173").replace(/\/+$/, "");

export const webappUrl = (path = "/") => `${WEBAPP_URL}${path.startsWith("/") ? path : `/${path}`}`;

export const EXPLORE_LABEL = { es: "Explorar platos", en: "Explore dishes" } as const;

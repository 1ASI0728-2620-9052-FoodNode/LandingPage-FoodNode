/**
 * Cliente mínimo del servicio de identidad (IAM) de Foodly, a través del gateway.
 * La URL base sale de NEXT_PUBLIC_API_BASE_URL (p. ej. http://localhost:8000).
 * No guarda nada: quien llama decide dónde conservar el token (aquí, solo en memoria).
 */

export type IamRole = "GASTRONOMIC_EXPLORER" | "HUARIQUE_OWNER";

/** Rol elegido en el formulario -> rol que entiende IAM. */
export const IAM_ROLE = {
  explorer: "GASTRONOMIC_EXPLORER",
  owner: "HUARIQUE_OWNER"
} as const satisfies Record<"explorer" | "owner", IamRole>;

export type RegisterInput = {
  name: string;
  email: string;
  username: string;
  password: string;
  role: IamRole;
};

export type LoginInput = { email: string; password: string };

/** Respuesta de /iam/auth/register y /iam/auth/login. */
export type AuthResult = {
  token: string;
  tokenType: string;
  expiresAt: string;
  userId: string;
  name: string;
  role: IamRole;
};

/** Tipo de fallo, independiente del idioma: la interfaz lo traduce. */
export type IamErrorKind =
  | "invalid" // 400: datos rechazados por IAM
  | "unauthorized" // 401: credenciales incorrectas
  | "forbidden" // 403: acceso denegado
  | "conflict" // 409: correo o usuario ya registrados
  | "tooMany" // 429: límite de peticiones del gateway
  | "server" // 5xx, respuesta inesperada u otro estado
  | "network" // sin conexión, CORS o tiempo agotado
  | "config"; // falta NEXT_PUBLIC_API_BASE_URL

export class IamError extends Error {
  readonly kind: IamErrorKind;
  readonly status?: number;

  constructor(kind: IamErrorKind, status?: number) {
    super(`IAM request failed: ${kind}${status ? ` (${status})` : ""}`);
    this.name = "IamError";
    this.kind = kind;
    this.status = status;
  }
}

const TIMEOUT_MS = 15_000;

function kindFor(status: number): IamErrorKind {
  switch (status) {
    case 400: return "invalid";
    case 401: return "unauthorized";
    case 403: return "forbidden";
    case 409: return "conflict";
    case 429: return "tooMany";
    default: return "server";
  }
}

function isAuthResult(value: unknown): value is AuthResult {
  const v = value as Partial<AuthResult> | null;
  return !!v && typeof v.token === "string" && v.token.length > 0 && typeof v.userId === "string";
}

async function post(path: string, body: unknown): Promise<AuthResult> {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL?.trim().replace(/\/+$/, "");
  if (!base) throw new IamError("config");

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  let response: Response;
  try {
    response = await fetch(`${base}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(body),
      credentials: "omit",
      cache: "no-store",
      signal: controller.signal
    });
  } catch {
    throw new IamError("network");
  } finally {
    clearTimeout(timer);
  }

  if (!response.ok) throw new IamError(kindFor(response.status), response.status);

  let data: unknown;
  try {
    data = await response.json();
  } catch {
    throw new IamError("server", response.status);
  }
  if (!isAuthResult(data)) throw new IamError("server", response.status);
  return data;
}

/** POST /iam/auth/register. Devuelve ya la sesión (token incluido). */
export function register(input: RegisterInput): Promise<AuthResult> {
  const { name, email, username, password, role } = input;
  return post("/iam/auth/register", { name, email, username, password, role });
}

/** POST /iam/auth/login. */
export function login(input: LoginInput): Promise<AuthResult> {
  const { email, password } = input;
  return post("/iam/auth/login", { email, password });
}

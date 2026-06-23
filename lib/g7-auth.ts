export type G7Role = "admin" | "chef" | "worker";

export type G7Session = {
  clientId: string;
  username: string;
  role: G7Role;
  exp: number;
};

export const G7_SESSION_COOKIE = "g7_session";

export const PROTECTED_PILOT_PATHS = [
  "/genius-kitchen",
  "/pilot-onboarding",
  "/pilot-intake",
  "/client-activation",
  "/production-tasks",
  "/worker-task",
  "/kitchen",
  "/recipe-studio",
  "/command",
  "/approval",
  "/inventory",
  "/workforce",
];

const SESSION_HOURS = 8;

function getSessionSecret() {
  const secret = process.env.G7_SESSION_SECRET;

  if (!secret && process.env.NODE_ENV === "production") {
    throw new Error("G7_SESSION_SECRET is required in production.");
  }

  return secret || "dev-only-g7-session-secret-change-me";
}

function bytesToBase64Url(bytes: Uint8Array) {
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return btoa(binary)
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replaceAll("=", "");
}

function base64UrlToBytes(input: string) {
  const base64 = input.replaceAll("-", "+").replaceAll("_", "/");
  const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);

  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }

  return bytes;
}

function encodeJson(value: unknown) {
  const json = JSON.stringify(value);
  return bytesToBase64Url(new TextEncoder().encode(json));
}

function decodeJson<T>(value: string): T {
  const bytes = base64UrlToBytes(value);
  const json = new TextDecoder().decode(bytes);
  return JSON.parse(json) as T;
}

async function hmac(input: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(getSessionSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(input)
  );

  return bytesToBase64Url(new Uint8Array(signature));
}

function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;

  let result = 0;
  for (let i = 0; i < a.length; i += 1) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }

  return result === 0;
}

function isRole(value: unknown): value is G7Role {
  return value === "admin" || value === "chef" || value === "worker";
}

export function getRoleHome(role: G7Role) {
  if (role === "worker") return "/worker-task";
  if (role === "chef") return "/production-tasks";
  return "/genius-kitchen";
}

export function isProtectedPilotPath(pathname: string) {
  return PROTECTED_PILOT_PATHS.some((path) => {
    return pathname === path || pathname.startsWith(`${path}/`);
  });
}

export function isPathAllowedForRole(pathname: string, role: G7Role) {
  if (role === "admin") return true;

  if (role === "chef") {
    return (
      pathname.startsWith("/production-tasks") ||
      pathname.startsWith("/worker-task") ||
      pathname.startsWith("/kitchen") ||
      pathname.startsWith("/pilot-intake")
    );
  }

  return pathname.startsWith("/worker-task");
}

export async function createSessionToken(input: Omit<G7Session, "exp">) {
  const session: G7Session = {
    ...input,
    exp: Date.now() + SESSION_HOURS * 60 * 60 * 1000,
  };

  const payload = encodeJson(session);
  const signature = await hmac(payload);

  return `${payload}.${signature}`;
}

export async function verifySessionToken(token?: string | null) {
  if (!token) return null;

  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;

  const expectedSignature = await hmac(payload);
  if (!safeEqual(signature, expectedSignature)) return null;

  try {
    const session = decodeJson<G7Session>(payload);

    if (!session.clientId || !session.username || !isRole(session.role)) return null;
    if (!session.exp || session.exp < Date.now()) return null;

    return session;
  } catch {
    return null;
  }
}

type PilotUser = {
  clientId: string;
  username: string;
  password: string;
  role: G7Role;
};

function getPilotUsers(): PilotUser[] {
  const prodClientId = process.env.G7_PILOT_CLIENT_ID;

  if (prodClientId) {
    const users: PilotUser[] = [
      {
        clientId: prodClientId,
        username: process.env.G7_PILOT_ADMIN_USER || "",
        password: process.env.G7_PILOT_ADMIN_PASSWORD || "",
        role: "admin",
      },
      {
        clientId: prodClientId,
        username: process.env.G7_PILOT_CHEF_USER || "",
        password: process.env.G7_PILOT_CHEF_PASSWORD || "",
        role: "chef",
      },
      {
        clientId: prodClientId,
        username: process.env.G7_PILOT_WORKER_USER || "",
        password: process.env.G7_PILOT_WORKER_PASSWORD || "",
        role: "worker",
      },
    ];

    return users.filter((user) => user.username && user.password);
  }

  if (process.env.NODE_ENV !== "production") {
    return [
      {
        clientId: "founding-pilot-001",
        username: "admin@g7pilot.local",
        password: "G7-Admin-2026!",
        role: "admin",
      },
      {
        clientId: "founding-pilot-001",
        username: "chef@g7pilot.local",
        password: "G7-Chef-2026!",
        role: "chef",
      },
      {
        clientId: "founding-pilot-001",
        username: "worker@g7pilot.local",
        password: "G7-Worker-2026!",
        role: "worker",
      },
    ];
  }

  return [];
}

export function findPilotUser(clientId: string, username: string, password: string) {
  const normalizedClientId = clientId.trim();
  const normalizedUsername = username.trim().toLowerCase();

  return getPilotUsers().find((user) => {
    return (
      user.clientId === normalizedClientId &&
      user.username.toLowerCase() === normalizedUsername &&
      user.password === password
    );
  });
}

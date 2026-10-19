import { createHmac, timingSafeEqual } from "node:crypto";
import { allSlugs } from "@/lib/catalog";

export const ENTITLEMENT_COOKIE = "attune_library";

type LibraryPayload = {
  slugs: string[];
  customerId?: string;
  email?: string;
};

function secret(): string {
  return process.env.STRIPE_SECRET_KEY || process.env.ENTITLEMENT_SECRET || "attune-dev-library";
}

function sign(body: string): string {
  return createHmac("sha256", secret()).update(body).digest("base64url");
}

export function encodeLibrary(payload: LibraryPayload): string {
  const unique = [...new Set(payload.slugs.filter((slug) => allSlugs().includes(slug)))];
  const body = Buffer.from(
    JSON.stringify({ ...payload, slugs: unique }),
    "utf8",
  ).toString("base64url");
  return `${body}.${sign(body)}`;
}

export function decodeLibrary(token: string | undefined | null): LibraryPayload {
  if (!token) return { slugs: [] };
  const [body, mac] = token.split(".");
  if (!body || !mac) return { slugs: [] };
  const expected = sign(body);
  const a = Buffer.from(mac);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return { slugs: [] };
  try {
    const parsed = JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as LibraryPayload;
    return {
      slugs: (parsed.slugs || []).filter((slug) => allSlugs().includes(slug)),
      customerId: parsed.customerId,
      email: parsed.email,
    };
  } catch {
    return { slugs: [] };
  }
}

export function mergeLibrary(current: LibraryPayload, next: LibraryPayload): LibraryPayload {
  return {
    slugs: [...new Set([...current.slugs, ...next.slugs])],
    customerId: next.customerId || current.customerId,
    email: next.email || current.email,
  };
}

export function libraryCookie(token: string): string {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  return `${ENTITLEMENT_COOKIE}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=15552000${secure}`;
}

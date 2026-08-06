// Prisma client for this tenant site — the PERMANENT backup leg of the BDI
// submission architecture (tenant site -> Prisma -> Resend -> Supabase mirror).
//
// WHY getPrisma() RETURNS null INSTEAD OF THROWING
// ------------------------------------------------
// `new PrismaClient()` throws at construction when DATABASE_URL is unset, and a
// throw at module scope takes the whole route down with a 500. Solenergy's
// Vercel project DOES have DATABASE_URL + DIRECT_URL (set 87d ago, verified
// 2026-08-06 via `vercel env ls --project solenergy`), but they had never been
// used: this repo had no `prisma/` directory and no `@prisma/client` import
// anywhere, so the org has ZERO rows in every Prisma table. Preview branches and
// local checkouts still run without them, and the routes must survive that —
// they simply mirror to BDI, which is what the site attempted before.
//
// The client is cached on globalThis in EVERY environment, not just dev.
// Serverless invocations reuse a warm module, and a fresh PrismaClient per
// invocation is how a pooled Postgres runs out of connections.
import { PrismaClient } from "@prisma/client";

const g = globalThis as typeof globalThis & { __bdiPrisma?: PrismaClient };

export function getPrisma(): PrismaClient | null {
  if (!process.env.DATABASE_URL) return null;
  if (!g.__bdiPrisma) {
    try {
      g.__bdiPrisma = new PrismaClient();
    } catch (e) {
      console.error("prisma: client init failed:", e instanceof Error ? e.message : e);
      return null;
    }
  }
  return g.__bdiPrisma;
}

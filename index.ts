import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) throw new Error("DATABASE_URL is required. Set it to a persistent PostgreSQL connection string.");

const globalForDb = globalThis as typeof globalThis & { __interviewAcePool?: Pool };
const isLocal = /localhost|127\.0\.0\.1/.test(databaseUrl);

// A small reusable pool works both in a long-running Node server and on Vercel/Railway.
// Hosted providers such as Neon/Supabase require TLS; local PostgreSQL does not.
export const pool = globalForDb.__interviewAcePool ?? new Pool({
  connectionString: databaseUrl,
  ssl: isLocal ? undefined : { rejectUnauthorized: false },
  max: Number(process.env.DB_POOL_MAX || 5),
  idleTimeoutMillis: 20_000,
  connectionTimeoutMillis: 10_000,
  allowExitOnIdle: true,
});

if (process.env.NODE_ENV !== "production") globalForDb.__interviewAcePool = pool;
export const db = drizzle(pool);

import { mkdirSync } from "node:fs";
import { dirname } from "node:path";

import Database from "better-sqlite3";
import { drizzle, type BetterSQLite3Database } from "drizzle-orm/better-sqlite3";

import { getServerConfig } from "./config.server";
import * as schema from "./db/schema";

// Server-only DB client (the .server suffix keeps it out of the client bundle).
// Memoizes one connection per process; reads DATABASE_URL via getServerConfig()
// INSIDE the function (env binds per-request on edge runtimes — never module scope).

let _db: BetterSQLite3Database<typeof schema> | undefined;

export function getDb(): BetterSQLite3Database<typeof schema> {
  if (_db) return _db;
  const { databaseUrl } = getServerConfig();
  const file = databaseUrl.replace(/^file:/, "");
  if (file !== ":memory:") mkdirSync(dirname(file), { recursive: true });
  const sqlite = new Database(file);
  sqlite.pragma("journal_mode = WAL");
  sqlite.pragma("foreign_keys = ON");
  _db = drizzle(sqlite, { schema });
  return _db;
}

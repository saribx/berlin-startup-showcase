import { defineConfig } from "drizzle-kit";

// CLI-only config (drizzle-kit generate/migrate). Reading process.env at module
// scope is fine here — this runs as a node CLI, not in the request runtime.
const url = (process.env.DATABASE_URL ?? "file:./data/app.db").replace(/^file:/, "");

export default defineConfig({
  dialect: "sqlite",
  schema: "./src/lib/db/schema.ts",
  out: "./drizzle",
  dbCredentials: { url },
});

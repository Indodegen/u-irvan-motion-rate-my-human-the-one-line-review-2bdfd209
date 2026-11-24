import { readFileSync, copyFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const text = readFileSync(join(here, "entry.txt"), "utf8");
if (text.length < 1 || text.length > 200 || text.trim().length === 0) {
  throw new Error(`entry.txt must be 1-200 characters, got ${text.length}`);
}
const body = text.replace(/\r?\n$/, "");
if (body.includes("\n") || body.includes("\r")) {
  throw new Error("entry.txt must be exactly one line (no newline in the middle)");
}
const out = process.env.MAKEFUN_OUTPUT_DIR ?? join(here, "out");
mkdirSync(out, { recursive: true });
copyFileSync(join(here, "entry.txt"), join(out, "entry.txt"));

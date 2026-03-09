import test from "node:test";
import assert from "node:assert/strict";

import { corsOptions, resolveAllowedOrigins } from "../config/cors.js";

test("resolveAllowedOrigins returns defaults when env missing", () => {
  const origins = resolveAllowedOrigins("");
  assert.ok(origins.includes("http://localhost:5173"));
  assert.ok(origins.includes("https://mkadifference.com"));
});

test("resolveAllowedOrigins parses comma-separated env", () => {
  const origins = resolveAllowedOrigins("https://a.com, https://b.com");
  assert.deepEqual(origins, ["https://a.com", "https://b.com"]);
});

test("corsOptions allows configured origin and blocks unknown origin", async () => {
  process.env.ALLOWED_ORIGINS = "https://allowed.example";

  let allowedErr = null;
  let allowedOk = null;
  await corsOptions.origin("https://allowed.example", (err, ok) => {
    allowedErr = err;
    allowedOk = ok;
  });
  assert.equal(allowedErr, null);
  assert.equal(allowedOk, true);

  let blockedErr = null;
  await corsOptions.origin("https://blocked.example", (err) => {
    blockedErr = err;
  });
  assert.ok(blockedErr instanceof Error);
});

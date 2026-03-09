import test from "node:test";
import assert from "node:assert/strict";

import { MAX_SKIP, toSafeSkip } from "../utils/validators.js";

test("toSafeSkip normalizes invalid values to 0", () => {
  assert.equal(toSafeSkip(undefined), 0);
  assert.equal(toSafeSkip(-1), 0);
  assert.equal(toSafeSkip("abc"), 0);
});

test("toSafeSkip floors valid values and clamps to max", () => {
  assert.equal(toSafeSkip(12.9), 12);
  assert.equal(toSafeSkip(MAX_SKIP + 100), MAX_SKIP);
  assert.equal(toSafeSkip(250, 100), 100);
});

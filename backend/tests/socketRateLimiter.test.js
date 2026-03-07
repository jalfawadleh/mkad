import test from "node:test";
import assert from "node:assert/strict";

import {
  createSocketEventLimiter,
  socketPrincipal,
} from "../middleware/socketRateLimiter.js";

test("socketPrincipal combines sender and ip", () => {
  const key = socketPrincipal({
    message: { sender: { _id: "507f1f77bcf86cd799439011" } },
    handshake: { address: "127.0.0.1" },
  });

  assert.equal(key, "507f1f77bcf86cd799439011:127.0.0.1");
});

test("socket limiter allows events under threshold", () => {
  const limiter = createSocketEventLimiter({
    limits: { join: { windowMs: 60_000, max: 2, baseBlockMs: 1_000 } },
  });

  const t0 = 1_000;
  assert.equal(limiter.consume({ key: "u1:ip1", event: "join", now: t0 }).allowed, true);
  assert.equal(
    limiter.consume({ key: "u1:ip1", event: "join", now: t0 + 1 }).allowed,
    true,
  );
});

test("socket limiter blocks after threshold with retry", () => {
  const limiter = createSocketEventLimiter({
    limits: { join: { windowMs: 60_000, max: 1, baseBlockMs: 1_000 } },
  });

  const t0 = 1_000;
  assert.equal(limiter.consume({ key: "u1:ip1", event: "join", now: t0 }).allowed, true);

  const blocked = limiter.consume({ key: "u1:ip1", event: "join", now: t0 + 10 });
  assert.equal(blocked.allowed, false);
  assert.equal(blocked.retryAfterMs > 0, true);
});

test("socket limiter increases penalty for repeated violations", () => {
  const limiter = createSocketEventLimiter({
    limits: { conversation: { windowMs: 60_000, max: 1, baseBlockMs: 1_000 } },
  });

  const key = "u1:ip1";
  const t0 = 1_000;

  limiter.consume({ key, event: "conversation", now: t0 });
  const firstBlock = limiter.consume({ key, event: "conversation", now: t0 + 1 });
  assert.equal(firstBlock.allowed, false);

  const t1 = t0 + firstBlock.retryAfterMs + 1;
  limiter.consume({ key, event: "conversation", now: t1 });
  const secondBlock = limiter.consume({ key, event: "conversation", now: t1 + 1 });

  assert.equal(secondBlock.allowed, false);
  assert.equal(secondBlock.retryAfterMs > firstBlock.retryAfterMs, true);
});

test("socket limiter isolates keys and events", () => {
  const limiter = createSocketEventLimiter({
    limits: {
      join: { windowMs: 60_000, max: 1, baseBlockMs: 1_000 },
      leave: { windowMs: 60_000, max: 1, baseBlockMs: 1_000 },
    },
  });

  const t0 = 1_000;
  limiter.consume({ key: "u1:ip1", event: "join", now: t0 });
  const joinBlocked = limiter.consume({ key: "u1:ip1", event: "join", now: t0 + 1 });
  const leaveAllowed = limiter.consume({ key: "u1:ip1", event: "leave", now: t0 + 2 });
  const otherUserAllowed = limiter.consume({ key: "u2:ip1", event: "join", now: t0 + 2 });

  assert.equal(joinBlocked.allowed, false);
  assert.equal(leaveAllowed.allowed, true);
  assert.equal(otherUserAllowed.allowed, true);
});

const defaultLimits = {
  join: { windowMs: 60_000, max: 20, baseBlockMs: 3_000 },
  conversation: { windowMs: 60_000, max: 90, baseBlockMs: 5_000 },
  leave: { windowMs: 60_000, max: 30, baseBlockMs: 2_000 },
};

const createSocketEventLimiter = ({
  limits = defaultLimits,
  maxPenaltyMultiplier = 5,
  staleAfterMs = 30 * 60_000,
} = {}) => {
  const buckets = new Map();

  const consume = ({ key, event, now = Date.now() }) => {
    const limit = limits[event];
    if (!limit) return { allowed: true, retryAfterMs: 0 };

    const bucketKey = `${key}:${event}`;
    let bucket = buckets.get(bucketKey);
    if (!bucket) {
      bucket = {
        windowStartedAt: now,
        count: 0,
        blockedUntil: 0,
        violations: 0,
        lastSeenAt: now,
      };
      buckets.set(bucketKey, bucket);
    }

    bucket.lastSeenAt = now;
    if (now < bucket.blockedUntil) {
      return { allowed: false, retryAfterMs: bucket.blockedUntil - now };
    }

    if (now - bucket.windowStartedAt >= limit.windowMs) {
      bucket.windowStartedAt = now;
      bucket.count = 0;
      // Decay penalties over time when the client behaves.
      if (bucket.violations > 0) bucket.violations -= 1;
    }

    bucket.count += 1;
    if (bucket.count <= limit.max) return { allowed: true, retryAfterMs: 0 };

    bucket.violations += 1;
    const multiplier = Math.min(bucket.violations, maxPenaltyMultiplier);
    const penaltyMs = limit.baseBlockMs * multiplier;
    bucket.blockedUntil = now + penaltyMs;

    return { allowed: false, retryAfterMs: penaltyMs };
  };

  const cleanup = (now = Date.now()) => {
    for (const [key, bucket] of buckets.entries()) {
      if (now - bucket.lastSeenAt > staleAfterMs && now >= bucket.blockedUntil) {
        buckets.delete(key);
      }
    }
  };

  const size = () => buckets.size;

  return { consume, cleanup, size };
};

const socketPrincipal = (socket) => {
  const sender = socket?.message?.sender?._id;
  const senderId = sender?.toString ? sender.toString() : "unknown-user";
  const ip = socket?.handshake?.address ?? "unknown-ip";
  return `${senderId}:${ip}`;
};

export { createSocketEventLimiter, socketPrincipal };

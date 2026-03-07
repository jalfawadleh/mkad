import RateLimit from "express-rate-limit";
import { incrementMetric } from "./metricsMiddleware.js";

const asLimiter = (windowMs, max, message) =>
  RateLimit({
    windowMs,
    max,
    standardHeaders: true,
    legacyHeaders: false,
    message,
    handler: (req, res) => {
      incrementMetric("rateLimitHits");
      res.status(429).json({ message });
    },
  });

const globalLimiter = asLimiter(
  60 * 1000,
  120,
  "Too many requests, please try again shortly.",
);

const authLimiter = asLimiter(
  15 * 60 * 1000,
  30,
  "Too many authentication requests, try again in 15 minutes.",
);

const writeLimiter = asLimiter(
  60 * 1000,
  60,
  "Too many write requests, please slow down.",
);

const readHeavyLimiter = asLimiter(
  60 * 1000,
  90,
  "Too many requests for this endpoint, please try again in a minute.",
);

const realtimeLimiter = asLimiter(
  60 * 1000,
  180,
  "Messaging rate limit reached, retry in a minute.",
);

export {
  authLimiter,
  globalLimiter,
  readHeavyLimiter,
  realtimeLimiter,
  writeLimiter,
};

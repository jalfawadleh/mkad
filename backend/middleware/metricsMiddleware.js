const metrics = {
  startedAt: new Date().toISOString(),
  httpRequests: 0,
  httpErrors: 0,
  rateLimitHits: 0,
  socketEvents: 0,
  socketRateLimitHits: 0,
};

const incrementMetric = (name, by = 1) => {
  if (Object.hasOwn(metrics, name)) metrics[name] += by;
};

const metricsMiddleware = (req, res, next) => {
  incrementMetric("httpRequests");
  res.on("finish", () => {
    if (res.statusCode >= 400) incrementMetric("httpErrors");
  });
  next();
};

const getMetricsSnapshot = () => ({
  ...metrics,
  uptimeSeconds: Math.floor(process.uptime()),
});

export { getMetricsSnapshot, incrementMetric, metricsMiddleware };

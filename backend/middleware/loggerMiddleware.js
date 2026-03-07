import crypto from "crypto";

const loggerMiddleware = (req, res, next) => {
  const startedAt = Date.now();
  const requestId = req.headers["x-request-id"] || crypto.randomUUID();
  req.requestId = requestId;
  res.setHeader("x-request-id", requestId);

  res.on("finish", () => {
    const entry = {
      ts: new Date().toISOString(),
      level: res.statusCode >= 500 ? "error" : "info",
      requestId,
      method: req.method,
      path: req.originalUrl,
      status: res.statusCode,
      durationMs: Date.now() - startedAt,
      remoteAddress: req.ip,
    };
    console.log(JSON.stringify(entry));
  });

  next();
};

export { loggerMiddleware };

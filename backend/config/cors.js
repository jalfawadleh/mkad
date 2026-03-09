const defaultAllowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://mkadifference.com",
];

const splitOrigins = (value) =>
  value
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);

const resolveAllowedOrigins = (envValue = process.env.ALLOWED_ORIGINS) => {
  if (!envValue) return defaultAllowedOrigins;
  return splitOrigins(envValue);
};

const corsOptions = {
  origin(origin, callback) {
    const allowed = resolveAllowedOrigins();
    // Allow non-browser clients (no origin header), e.g. curl/postman.
    if (!origin || allowed.includes(origin)) {
      callback(null, true);
      return;
    }
    callback(new Error("CORS origin not allowed"));
  },
};

export { corsOptions, defaultAllowedOrigins, resolveAllowedOrigins };

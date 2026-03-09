import mongoose from "mongoose";

const hasText = (value) => typeof value === "string" && value.trim().length > 0;

const MAX_SKIP = 500;

const toSafeSkip = (value, max = MAX_SKIP) => {
  const n = Number(value);
  if (!Number.isFinite(n) || n < 0) return 0;
  return Math.min(Math.floor(n), max);
};

const isValidId = (value) => mongoose.isValidObjectId(value);

export { MAX_SKIP, hasText, isValidId, toSafeSkip };

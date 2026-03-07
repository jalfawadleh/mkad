import mongoose from "mongoose";

const hasText = (value) => typeof value === "string" && value.trim().length > 0;

const toSafeSkip = (value) => {
  const n = Number(value);
  if (!Number.isFinite(n) || n < 0) return 0;
  return Math.floor(n);
};

const isValidId = (value) => mongoose.isValidObjectId(value);

export { hasText, isValidId, toSafeSkip };

import { isValidId } from "../utils/validators.js";

const readByPath = (obj, path) =>
  path.split(".").reduce((acc, key) => (acc == null ? undefined : acc[key]), obj);

const validators = {
  requiredString: (value) =>
    typeof value === "string" && value.trim().length > 0
      ? null
      : "must be a non-empty string",
  objectId: (value) => (isValidId(value) ? null : "must be a valid ObjectId"),
  optionalNonNegativeInteger: (value) => {
    if (value === undefined || value === null || value === "") return null;
    const n = Number(value);
    return Number.isFinite(n) && n >= 0 ? null : "must be a non-negative number";
  },
  optionalString: (value) =>
    value === undefined || value === null || typeof value === "string"
      ? null
      : "must be a string",
  optionalBooleanish: (value) => {
    if (value === undefined || value === null) return null;
    if (typeof value === "boolean") return null;
    if (value === "true" || value === "false") return null;
    return "must be boolean or 'true'/'false'";
  },
  optionalNumber: (value) => {
    if (value === undefined || value === null || value === "") return null;
    const n = Number(value);
    return Number.isFinite(n) ? null : "must be numeric";
  },
  requiredNumber: (value) => {
    const n = Number(value);
    return Number.isFinite(n) ? null : "must be numeric";
  },
};

const validateSource = (source, schema) => (req, res, next) => {
  const data = req[source] ?? {};

  for (const [path, rule] of Object.entries(schema)) {
    const value = readByPath(data, path);
    const error = rule(value);
    if (error) {
      res.status(400);
      next(new Error(`Invalid ${source}.${path}: ${error}`));
      return;
    }
  }

  next();
};

const validateBody = (schema) => validateSource("body", schema);
const validateParams = (schema) => validateSource("params", schema);

const enforceAllowedBodyKeys = (allowedKeys = []) => (req, res, next) => {
  const keys = Object.keys(req.body ?? {});
  const disallowed = keys.filter((k) => !allowedKeys.includes(k));
  if (disallowed.length > 0) {
    res.status(400);
    next(new Error(`Unexpected body fields: ${disallowed.join(", ")}`));
    return;
  }
  next();
};

export { enforceAllowedBodyKeys, validateBody, validateParams, validators };

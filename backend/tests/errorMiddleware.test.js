import test from "node:test";
import assert from "node:assert/strict";

import { errorHandler, notFound } from "../middleware/errorMiddleware.js";

const createRes = () => {
  const res = { statusCode: 200, payload: null };
  res.status = (code) => {
    res.statusCode = code;
    return res;
  };
  res.json = (body) => {
    res.payload = body;
    return res;
  };
  return res;
};

test("notFound forwards 404 error", () => {
  const req = { originalUrl: "/missing" };
  const res = createRes();
  let nextErr = null;

  notFound(req, res, (err) => {
    nextErr = err ?? null;
  });

  assert.equal(res.statusCode, 404);
  assert.match(String(nextErr?.message), /Not Found - \/missing/);
});

test("errorHandler returns standardized payload", () => {
  const req = { requestId: "req-1" };
  const res = createRes();
  res.statusCode = 400;

  errorHandler(new Error("Bad input"), req, res, () => {});

  assert.equal(res.statusCode, 400);
  assert.equal(res.payload.message, "Bad input");
  assert.equal(res.payload.code, "bad_request");
  assert.equal(res.payload.requestId, "req-1");
  assert.equal(typeof res.payload.stack, "string");
});

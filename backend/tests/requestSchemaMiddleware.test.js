import test from "node:test";
import assert from "node:assert/strict";

import {
  enforceAllowedBodyKeys,
  validateBody,
  validateParams,
  validators,
} from "../middleware/requestSchemaMiddleware.js";

const createRes = () => {
  const res = { statusCode: 200 };
  res.status = (code) => {
    res.statusCode = code;
    return res;
  };
  return res;
};

test("validateBody accepts valid payload", () => {
  const middleware = validateBody({
    username: validators.requiredString,
    recipientId: validators.objectId,
    skip: validators.optionalNonNegativeInteger,
  });

  const req = {
    body: {
      username: "alice",
      recipientId: "507f1f77bcf86cd799439011",
      skip: 0,
    },
  };
  const res = createRes();
  let nextErr = null;
  let nextCalled = false;

  middleware(req, res, (err) => {
    nextErr = err ?? null;
    nextCalled = true;
  });

  assert.equal(nextErr, null);
  assert.equal(nextCalled, true);
  assert.equal(res.statusCode, 200);
});

test("validateBody rejects invalid nested body field", () => {
  const middleware = validateBody({ "recipient._id": validators.objectId });

  const req = { body: { recipient: { _id: "bad-id" } } };
  const res = createRes();
  let nextErr = null;

  middleware(req, res, (err) => {
    nextErr = err ?? null;
  });

  assert.equal(res.statusCode, 400);
  assert.match(String(nextErr?.message), /Invalid body.recipient\._id/);
});

test("validateParams rejects missing required param", () => {
  const middleware = validateParams({ id: validators.objectId });

  const req = { params: {} };
  const res = createRes();
  let nextErr = null;

  middleware(req, res, (err) => {
    nextErr = err ?? null;
  });

  assert.equal(res.statusCode, 400);
  assert.match(String(nextErr?.message), /Invalid params.id/);
});

test("enforceAllowedBodyKeys accepts known keys and rejects extras", () => {
  const middleware = enforceAllowedBodyKeys(["id", "name"]);

  const validReq = { body: { id: "1", name: "Alice" } };
  const validRes = createRes();
  let validErr = null;
  middleware(validReq, validRes, (err) => {
    validErr = err ?? null;
  });
  assert.equal(validErr, null);

  const invalidReq = { body: { id: "1", role: "admin" } };
  const invalidRes = createRes();
  let invalidErr = null;
  middleware(invalidReq, invalidRes, (err) => {
    invalidErr = err ?? null;
  });
  assert.equal(invalidRes.statusCode, 400);
  assert.match(String(invalidErr?.message), /Unexpected body fields: role/);
});

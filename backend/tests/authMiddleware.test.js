import test from "node:test";
import assert from "node:assert/strict";
import jwt from "jsonwebtoken";

import User from "../models/modelUsers.js";
import { parseAuthToken, protect } from "../middleware/authMiddleware.js";

const createRes = () => {
  const res = {
    statusCode: 200,
    body: null,
  };
  res.status = (code) => {
    res.statusCode = code;
    return res;
  };
  res.json = (body) => {
    res.body = body;
    return res;
  };
  return res;
};

test("protect returns unauthorized when token is missing", async () => {
  process.env.JWT_SECRET = "test-secret";
  const req = { headers: {} };
  const res = createRes();
  let nextErr = null;

  await protect(req, res, (err) => {
    nextErr = err ?? null;
  });

  assert.equal(res.statusCode, 401);
  assert.ok(nextErr instanceof Error);
  assert.equal(nextErr.message, "Not authorized, no token");
});

test("protect attaches user and continues with a valid token", async () => {
  process.env.JWT_SECRET = "test-secret";
  const token = jwt.sign({ id: "507f1f77bcf86cd799439011" }, "test-secret");
  const user = { _id: "507f1f77bcf86cd799439011", name: "Alice" };

  const originalFindById = User.findById;
  User.findById = () => ({
    select: async () => user,
  });

  const req = { headers: { authorization: token } };
  const res = createRes();
  let nextErr = "not-called";

  try {
    await protect(req, res, (err) => {
      nextErr = err ?? null;
    });
  } finally {
    User.findById = originalFindById;
  }

  assert.deepEqual(req.user, user);
  assert.equal(nextErr, null);
  assert.equal(res.statusCode, 200);
});

test("protect accepts Bearer token format", async () => {
  process.env.JWT_SECRET = "test-secret";
  const token = jwt.sign({ id: "507f1f77bcf86cd799439011" }, "test-secret");
  const user = { _id: "507f1f77bcf86cd799439011", name: "Alice" };

  const originalFindById = User.findById;
  User.findById = () => ({
    select: async () => user,
  });

  const req = { headers: { authorization: `Bearer ${token}` } };
  const res = createRes();
  let nextErr = "not-called";

  try {
    await protect(req, res, (err) => {
      nextErr = err ?? null;
    });
  } finally {
    User.findById = originalFindById;
  }

  assert.deepEqual(req.user, user);
  assert.equal(nextErr, null);
  assert.equal(res.statusCode, 200);
});

test("parseAuthToken parses raw and Bearer formats", () => {
  assert.equal(parseAuthToken("abc"), "abc");
  assert.equal(parseAuthToken("Bearer xyz"), "xyz");
  assert.equal(parseAuthToken(" bearer xyz "), "xyz");
  assert.equal(parseAuthToken(""), null);
  assert.equal(parseAuthToken(null), null);
});

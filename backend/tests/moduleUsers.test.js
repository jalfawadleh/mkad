import test from "node:test";
import assert from "node:assert/strict";

import Users from "../models/modelUsers.js";
import usersRouter from "../modules/moduleUsers.js";

const loginHandler = usersRouter.stack.find(
  (layer) => layer.route?.path === "/login" && layer.route.methods?.post,
).route.stack.filter((layer) => layer.method === "post").at(-1).handle;

const createRes = () => {
  const res = {
    statusCode: 200,
    payload: null,
    text: null,
  };
  res.status = (code) => {
    res.statusCode = code;
    return res;
  };
  res.json = (body) => {
    res.payload = body;
    return res;
  };
  res.send = (body) => {
    res.text = body;
    return res;
  };
  return res;
};

test("POST /api/users/login logs in with valid credentials", async () => {
  const originalFindOne = Users.findOne;
  const userRecord = {
    _id: "507f1f77bcf86cd799439011",
    name: "Alice",
    type: "member",
    lng: 1,
    lat: 2,
    darkmode: true,
    matchPassword: async () => true,
    generateToken: async () => "token-123",
  };
  Users.findOne = async ({ username }) =>
    username === "aliceuser" ? userRecord : null;

  try {
    const req = { body: { username: "aliceuser", password: "password123" } };
    const res = createRes();
    let nextErr = null;

    await loginHandler(req, res, (err) => {
      nextErr = err ?? null;
    });

    assert.equal(nextErr, null);
    assert.equal(res.statusCode, 200);
    assert.equal(res.payload.name, "Alice");
    assert.equal(res.payload.token, "token-123");
  } finally {
    Users.findOne = originalFindOne;
  }
});

test("POST /api/users/login rejects invalid credentials", async () => {
  const originalFindOne = Users.findOne;
  Users.findOne = async () => null;

  try {
    const req = { body: { username: "wronguser", password: "wrongpass" } };
    const res = createRes();
    let nextErr = null;

    await loginHandler(req, res, (err) => {
      nextErr = err ?? null;
    });

    assert.equal(nextErr, null);
    assert.equal(res.statusCode, 401);
    assert.match(String(res.text), /Invalid username or password/);
  } finally {
    Users.findOne = originalFindOne;
  }
});

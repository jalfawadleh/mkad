import test from "node:test";
import assert from "node:assert/strict";

import contactsRouter from "../modules/moduleContacts.js";
import messagesRouter from "../modules/modulMessages.js";
import updatesRouter from "../modules/moduleUpdates.js";

import Updates from "../models/modelUpdates.js";

const getRouteMethodHandler = (router, routePath, method) => {
  const layer = router.stack.find(
    (l) => l.route?.path === routePath && l.route.methods?.[method],
  );
  const handlers = (layer?.route?.stack ?? []).filter((h) => h.method === method);
  return handlers.at(-1)?.handle;
};

const createRes = () => {
  const res = { statusCode: 200, payload: null, text: null };
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

test("POST /api/contacts rejects invalid member id", async () => {
  const handler = getRouteMethodHandler(contactsRouter, "/", "post");
  assert.equal(typeof handler, "function");

  const req = { body: { _id: "bad-id" }, user: { _id: "507f1f77bcf86cd799439011" } };
  const res = createRes();
  let nextErr = null;

  await handler(req, res, (err) => {
    nextErr = err ?? null;
  });

  assert.equal(res.statusCode, 400);
  assert.match(String(nextErr?.message), /Invalid member id/);
});

test("POST /api/contacts rejects self contact requests", async () => {
  const handler = getRouteMethodHandler(contactsRouter, "/", "post");
  assert.equal(typeof handler, "function");

  const selfId = "507f1f77bcf86cd799439011";
  const req = { body: { _id: selfId }, user: { _id: selfId } };
  const res = createRes();
  let nextErr = null;

  await handler(req, res, (err) => {
    nextErr = err ?? null;
  });

  assert.equal(res.statusCode, 400);
  assert.match(String(nextErr?.message), /cannot add yourself/i);
});

test("POST /api/messages rejects invalid recipient id", async () => {
  const handler = getRouteMethodHandler(messagesRouter, "/", "post");
  assert.equal(typeof handler, "function");

  const req = { body: { _id: "bad-id", skip: 0 }, user: { _id: "507f1f77bcf86cd799439011" } };
  const res = createRes();
  let nextErr = null;

  await handler(req, res, (err) => {
    nextErr = err ?? null;
  });

  assert.equal(res.statusCode, 400);
  assert.match(String(nextErr?.message), /Invalid recipient id/);
});

test("DELETE /api/updates scopes deletion to authenticated recipient", async () => {
  const handler = getRouteMethodHandler(updatesRouter, "/:id", "delete");
  assert.equal(typeof handler, "function");

  const originalDeleteOne = Updates.deleteOne;
  let capturedQuery = null;
  Updates.deleteOne = async (query) => {
    capturedQuery = query;
    return { deletedCount: 1 };
  };

  try {
    const req = {
      params: { id: "507f1f77bcf86cd799439021" },
      user: { _id: "507f1f77bcf86cd799439011" },
    };
    const res = createRes();

    await handler(req, res, (err) => {
      if (err) throw err;
    });

    assert.deepEqual(capturedQuery, {
      _id: "507f1f77bcf86cd799439021",
      "recipient._id": "507f1f77bcf86cd799439011",
    });
    assert.equal(res.statusCode, 204);
  } finally {
    Updates.deleteOne = originalDeleteOne;
  }
});

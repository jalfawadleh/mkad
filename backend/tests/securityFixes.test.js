import test from "node:test";
import assert from "node:assert/strict";

import usersRouter from "../modules/moduleUsers.js";
import updatesRouter from "../modules/moduleUpdates.js";
import membersRouter from "../modules/moduleMembers.js";
import mapRouter from "../modules/moduleMap.js";
import { saveMessage } from "../modules/modulMessages.js";

import Users from "../models/modelUsers.js";
import Updates from "../models/modelUpdates.js";
import Members from "../models/modelUsers.js";
import Activities from "../models/modelActivities.js";
import Messages from "../models/modelMessages.js";

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

test("POST /api/users rejects mismatched confirmPassword", async () => {
  const handler = getRouteMethodHandler(usersRouter, "/", "post");
  assert.equal(typeof handler, "function");

  const originalFindOne = Users.findOne;
  Users.findOne = async () => null;

  try {
    const req = {
      body: {
        username: "user12345",
        password: "password1",
        confirmPassword: "password2",
        name: "Test User",
        code: "bad-code",
      },
    };
    const res = createRes();
    let nextErr = null;

    await handler(req, res, (err) => {
      nextErr = err ?? null;
    });

    assert.equal(res.statusCode, 400);
    assert.match(String(res.text ?? nextErr?.message ?? ""), /passwords do not match/i);
  } finally {
    Users.findOne = originalFindOne;
  }
});

test("PUT /api/users rejects mismatched confirmPassword when password provided", async () => {
  const handler = getRouteMethodHandler(usersRouter, "/", "put");
  assert.equal(typeof handler, "function");

  const originalFindById = Users.findById;
  Users.findById = async () => ({
    username: "alice",
    email: "a@example.com",
    matchPassword: async () => true,
    save: async () => {},
  });

  try {
    const req = {
      body: {
        currentPassword: "valid",
        password: "newpass",
        confirmPassword: "mismatch",
      },
      user: { _id: "auth-user-id" },
    };
    const res = createRes();
    let nextErr = null;

    await handler(req, res, (err) => {
      nextErr = err ?? null;
    });

    assert.equal(res.statusCode, 400);
    assert.match(String(nextErr?.message ?? ""), /passwords do not match/i);
  } finally {
    Users.findById = originalFindById;
  }
});

test("POST /api/updates sets sender from authenticated user", async () => {
  const handler = getRouteMethodHandler(updatesRouter, "/", "post");
  assert.equal(typeof handler, "function");

  const originalCreate = Updates.create;
  let captured = null;
  Updates.create = async (payload) => {
    captured = payload;
    return { ...payload, _id: "update-1" };
  };

  try {
    const req = {
      body: {
        sender: { _id: "spoofed", type: "admin", name: "Evil" },
        recipient: { _id: "507f1f77bcf86cd799439011" },
        type: "contact",
        content: "Hi",
        read: true,
        archived: true,
      },
      user: { _id: "507f1f77bcf86cd799439012", type: "member", name: "Alice" },
    };
    const res = createRes();

    await handler(req, res, (err) => {
      if (err) throw err;
    });

    assert.equal(captured.sender._id, req.user._id);
    assert.equal(captured.sender.type, req.user.type);
    assert.equal(captured.sender.name, req.user.name);
    assert.equal(captured.recipient._id, req.body.recipient._id);
    assert.equal(captured.read, undefined);
    assert.equal(captured.archived, undefined);
  } finally {
    Updates.create = originalCreate;
  }
});

test("PUT /api/members ignores contacts mutations", async () => {
  const handler = getRouteMethodHandler(membersRouter, "/", "put");
  assert.equal(typeof handler, "function");

  const originalFindById = Members.findById;
  const originalContacts = [{ _id: "c1", name: "Original", approved: true }];
  const member = {
    name: "Old",
    contacts: JSON.parse(JSON.stringify(originalContacts)),
    save: async () => {},
  };
  Members.findById = async () => member;

  try {
    const req = {
      body: {
        name: "New",
        contacts: [{ _id: "c2", name: "Injected", approved: true }],
      },
      user: { _id: "member-1" },
    };
    const res = createRes();

    await handler(req, res, (err) => {
      if (err) throw err;
    });

    assert.deepEqual(member.contacts, originalContacts);
  } finally {
    Members.findById = originalFindById;
  }
});

test("GET /api/members hides hidden profiles from non-contacts", async () => {
  const handler = getRouteMethodHandler(membersRouter, "/:id", "get");
  assert.equal(typeof handler, "function");

  const originalFindById = Members.findById;
  const originalActivitiesFind = Activities.find;
  Members.findById = async () => ({
    _id: { equals: (value) => value === "507f1f77bcf86cd799439021" },
    name: "Hidden",
    hidden: true,
    contacts: [],
    organisations: [],
    members: [],
  });
  Activities.find = () => ({ select: async () => [] });

  try {
    const req = {
      params: { id: "507f1f77bcf86cd799439021" },
      user: { _id: { equals: () => false } },
    };
    const res = createRes();
    let nextErr = null;

    await handler(req, res, (err) => {
      nextErr = err ?? null;
    });

    assert.equal(res.statusCode, 404);
    assert.match(String(nextErr?.message ?? ""), /Member not found/i);
  } finally {
    Members.findById = originalFindById;
    Activities.find = originalActivitiesFind;
  }
});

test("POST /api/map uses MAPCOVERAGE default when missing", async () => {
  const handler = getRouteMethodHandler(mapRouter, "/", "post");
  assert.equal(typeof handler, "function");

  const originalCoverage = process.env.MAPCOVERAGE;
  delete process.env.MAPCOVERAGE;

  const originalMembersFind = Members.find;
  const originalActivitiesFind = Activities.find;
  const memberQueries = [];
  Members.find = async (query) => {
    memberQueries.push(query);
    return [];
  };
  Activities.find = async () => [];

  try {
    const req = { body: { lat: 10, lng: 20 }, user: { _id: "u1" } };
    const res = createRes();

    await handler(req, res, (err) => {
      if (err) throw err;
    });

    assert.equal(memberQueries.length > 0, true);
    const memberQuery = memberQueries[0];
    assert.equal(Array.isArray(memberQuery.$or), true);
    assert.equal(memberQuery.$or.length >= 3, true);
    const expectedLngMin = 20 - 1.5;
    const expectedLngMax = 20 + 1.5;
    const expectedLatMin = 10 - 0.75;
    const expectedLatMax = 10 + 0.75;

    assert.ok(Math.abs(memberQuery.lng.$gte - expectedLngMin) < 1e-9);
    assert.ok(Math.abs(memberQuery.lng.$lt - expectedLngMax) < 1e-9);
    assert.ok(Math.abs(memberQuery.lat.$gte - expectedLatMin) < 1e-9);
    assert.ok(Math.abs(memberQuery.lat.$lt - expectedLatMax) < 1e-9);
  } finally {
    if (originalCoverage === undefined) delete process.env.MAPCOVERAGE;
    else process.env.MAPCOVERAGE = originalCoverage;
    Members.find = originalMembersFind;
    Activities.find = originalActivitiesFind;
  }
});

test("saveMessage surfaces persistence errors", async () => {
  const originalCreate = Messages.create;
  Messages.create = async () => {
    throw new Error("boom");
  };

  try {
    await assert.rejects(saveMessage({}), /boom/);
  } finally {
    Messages.create = originalCreate;
  }
});

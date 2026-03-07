import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

import Users from "../models/modelUsers.js";
import Activities from "../models/modelActivities.js";

import usersRouter from "../modules/moduleUsers.js";
import activitiesRouter from "../modules/moduleActivities.js";
import organisationsRouter from "../modules/moduleOrganisations.js";

import users from "../modules/moduleUsers.js";
import members from "../modules/moduleMembers.js";
import activities from "../modules/moduleActivities.js";
import organisations from "../modules/moduleOrganisations.js";
import messages from "../modules/modulMessages.js";
import contacts from "../modules/moduleContacts.js";
import updates from "../modules/moduleUpdates.js";
import invites from "../modules/moduleInvites.js";
import search from "../modules/moduleSearch.js";
import map from "../modules/moduleMap.js";

const routers = [
  { base: "/api/users", router: users },
  { base: "/api/members", router: members },
  { base: "/api/activities", router: activities },
  { base: "/api/organisations", router: organisations },
  { base: "/api/messages", router: messages },
  { base: "/api/contacts", router: contacts },
  { base: "/api/updates", router: updates },
  { base: "/api/invites", router: invites },
  { base: "/api/search", router: search },
  { base: "/api/map", router: map },
];

const normalizePath = (p) =>
  p === "/" ? "/" : p.replace(/\/+/g, "/").replace(/\/$/, "") || "/";

const routeMatches = (contractPath, backendPath) => {
  const a = normalizePath(contractPath).split("/");
  const b = normalizePath(backendPath).split("/");
  if (a.length !== b.length) return false;
  return a.every((seg, i) => seg === b[i] || seg.startsWith(":") || b[i].startsWith(":"));
};

const routesFromRouter = (base, router) => {
  const out = [];
  for (const layer of router.stack) {
    if (!layer.route) continue;
    const routePath = normalizePath(layer.route.path);
    const fullPath = normalizePath(`${base}${routePath === "/" ? "/" : routePath}`);
    for (const method of Object.keys(layer.route.methods)) {
      out.push({ method, path: fullPath });
    }
  }
  return out;
};

const walkFiles = (dir) => {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const out = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walkFiles(full));
    else if (/\.(js|jsx|ts|tsx)$/.test(entry.name)) out.push(full);
  }
  return out;
};

const extractAxiosContracts = (code) => {
  const contracts = [];
  const regex = /axios\s*\.\s*(get|post|put|delete)\s*\(\s*([`'"])(.*?)\2/gs;
  let match;

  while ((match = regex.exec(code)) !== null) {
    const method = match[1].toLowerCase();
    let rawPath = match[3].trim();
    const trailing = code.slice(regex.lastIndex, regex.lastIndex + 12);

    if (!rawPath) continue;
    if (/^https?:\/\//i.test(rawPath)) continue;

    // Convert template placeholders to params for route matching.
    rawPath = rawPath.replace(/\$\{[^}]+\}/g, ":param");

    if (!rawPath.startsWith("/")) rawPath = `/${rawPath}`;

    // Handle calls like axios.get("/path/" + id)
    if (/^\s*\+/.test(trailing)) rawPath = `${rawPath}:param`;

    contracts.push({ method, path: normalizePath(`/api${rawPath}`) });
  }

  return contracts;
};

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

test("frontend axios API calls are supported by backend routes", () => {
  const frontendRoot = path.resolve(process.cwd(), "../frontend/src");
  const files = walkFiles(frontendRoot);
  const contracts = files.flatMap((file) =>
    extractAxiosContracts(fs.readFileSync(file, "utf8")),
  );

  const backendRoutes = routers.flatMap(({ base, router }) =>
    routesFromRouter(base, router),
  );

  const missing = [];
  for (const contract of contracts) {
    const found = backendRoutes.some(
      (route) =>
        route.method === contract.method && routeMatches(contract.path, route.path),
    );
    if (!found) missing.push(contract);
  }

  assert.equal(missing.length, 0, `Missing backend routes: ${JSON.stringify(missing)}`);
});

test("PUT /api/users uses authenticated user id instead of body id", async () => {
  const putHandler = getRouteMethodHandler(usersRouter, "/", "put");
  assert.equal(typeof putHandler, "function");

  const originalFindById = Users.findById;
  let capturedId;
  Users.findById = async (id) => {
    capturedId = id;
    return {
      username: "alice",
      email: "a@example.com",
      matchPassword: async () => true,
      save: async () => {},
    };
  };

  try {
    const req = {
      body: {
        _id: "body-id-should-not-be-used",
        currentPassword: "valid",
        username: "alice2",
      },
      user: { _id: "auth-user-id" },
    };
    const res = createRes();

    await putHandler(req, res, (err) => {
      if (err) throw err;
    });

    assert.equal(capturedId, "auth-user-id");
    assert.equal(res.payload, true);
  } finally {
    Users.findById = originalFindById;
  }
});

test("PUT /api/activities restricts updates to creator", async () => {
  const putHandler = getRouteMethodHandler(activitiesRouter, "/", "put");
  assert.equal(typeof putHandler, "function");

  const originalFindOne = Activities.findOne;
  let query = null;
  Activities.findOne = async (q) => {
    query = q;
    return {
      save: async () => {},
    };
  };

  try {
    const req = {
      body: { _id: "activity-1" },
      user: { _id: "owner-1" },
    };
    const res = createRes();

    await putHandler(req, res, (err) => {
      if (err) throw err;
    });

    assert.deepEqual(query, { _id: "activity-1", "createdBy._id": "owner-1" });
  } finally {
    Activities.findOne = originalFindOne;
  }
});

test("DELETE /api/activities returns 204 only when a row is deleted", async () => {
  const deleteHandler = getRouteMethodHandler(activitiesRouter, "/:id", "delete");
  assert.equal(typeof deleteHandler, "function");

  const originalDeleteOne = Activities.deleteOne;
  Activities.deleteOne = async () => ({ deletedCount: 1 });

  try {
    const req = { params: { id: "activity-1" }, user: { _id: "owner-1" } };
    const res = createRes();

    await deleteHandler(req, res, (err) => {
      if (err) throw err;
    });

    assert.equal(res.statusCode, 204);
  } finally {
    Activities.deleteOne = originalDeleteOne;
  }
});

test("/api/organisations resolves /members before dynamic /:id", () => {
  const routeLayers = organisationsRouter.stack.filter((l) => l.route);
  const paths = routeLayers.map((l) => l.route.path);

  const membersIndex = paths.findIndex((p) => p === "/members");
  const firstDynamicIndex = paths.findIndex((p) => p === "/:id");

  assert.notEqual(membersIndex, -1);
  assert.notEqual(firstDynamicIndex, -1);
  assert.equal(membersIndex < firstDynamicIndex, true);
});

import test from "node:test";
import assert from "node:assert/strict";

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

const frontendContracts = [
  { method: "post", path: "/api/users/login" },
  { method: "post", path: "/api/users/" },
  { method: "put", path: "/api/users/" },
  { method: "delete", path: "/api/users/" },
  { method: "get", path: "/api/members/count" },
  { method: "put", path: "/api/members/" },
  { method: "get", path: "/api/members/:id" },
  { method: "get", path: "/api/activities/" },
  { method: "get", path: "/api/activities/managed" },
  { method: "get", path: "/api/activities/:id" },
  { method: "get", path: "/api/activities/join/:id" },
  { method: "post", path: "/api/activities/" },
  { method: "put", path: "/api/activities/" },
  { method: "delete", path: "/api/activities/:id" },
  { method: "get", path: "/api/organisations/:id" },
  { method: "post", path: "/api/organisations/join" },
  { method: "post", path: "/api/organisations/approve" },
  { method: "delete", path: "/api/organisations/:id" },
  { method: "post", path: "/api/messages/" },
  { method: "post", path: "/api/messages/discussion" },
  { method: "post", path: "/api/contacts/" },
  { method: "get", path: "/api/contacts/" },
  { method: "delete", path: "/api/contacts/:id" },
  { method: "post", path: "/api/contacts/approve" },
  { method: "get", path: "/api/updates/" },
  { method: "delete", path: "/api/updates/:id" },
  { method: "get", path: "/api/invites/" },
  { method: "get", path: "/api/invites/invitelink" },
  { method: "get", path: "/api/invites/passwordlink/:id" },
  { method: "post", path: "/api/search/" },
  { method: "post", path: "/api/map/" },
];

const normalizePath = (path) =>
  path === "/" ? "/" : path.replace(/\/+/g, "/").replace(/\/$/, "") || "/";

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

const routeMatches = (contractPath, backendPath) => {
  const a = normalizePath(contractPath).split("/");
  const b = normalizePath(backendPath).split("/");
  if (a.length !== b.length) return false;
  return a.every((seg, i) => seg === b[i] || seg.startsWith(":") || b[i].startsWith(":"));
};

test("frontend API contract is fully supported by backend routes", () => {
  const backendRoutes = routers.flatMap(({ base, router }) =>
    routesFromRouter(base, router),
  );

  for (const contract of frontendContracts) {
    const found = backendRoutes.some(
      (route) =>
        route.method === contract.method && routeMatches(contract.path, route.path),
    );

    assert.equal(
      found,
      true,
      `Missing backend route for ${contract.method.toUpperCase()} ${contract.path}`,
    );
  }
});

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const backendModule = (name) =>
  fs.readFileSync(path.resolve(process.cwd(), `modules/${name}`), "utf8");

const containsAll = (source, fields) =>
  fields.every(
    (field) =>
      source.includes(`${field}:`) ||
      source.includes(`"${field}"`) ||
      source.includes(`'${field}'`),
  );

test("member response includes fields consumed by frontend Member/Profile", () => {
  const code = backendModule("moduleMembers.js");
  const required = [
    "_id",
    "name",
    "type",
    "description",
    "languages",
    "interests",
    "lat",
    "lng",
    "darkmode",
    "hidden",
    "contacts",
    "help",
    "organisations",
    "members",
    "activities",
  ];
  assert.equal(containsAll(code, required), true);
});

test("organisation response includes fields consumed by frontend Organization", () => {
  const code = backendModule("moduleOrganisations.js");
  const required = [
    "_id",
    "name",
    "type",
    "description",
    "languages",
    "interests",
    "help",
    "members",
    "contacts",
    "darkmode",
    "hidden",
    "lat",
    "lng",
    "activities",
  ];
  assert.equal(containsAll(code, required), true);
});

test("activity response includes fields consumed by frontend ManageActivity/Activity", () => {
  const code = backendModule("moduleActivities.js");
  const required = [
    "name",
    "startOn",
    "endOn",
    "description",
    "languages",
    "interests",
    "hidden",
    "lat",
    "lng",
    "online",
    "help",
    "createdBy",
    "members",
  ];
  assert.equal(containsAll(code, required), true);
});

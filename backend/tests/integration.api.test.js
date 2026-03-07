import test from "node:test";
import assert from "node:assert/strict";
import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

import usersRouter from "../modules/moduleUsers.js";
import membersRouter from "../modules/moduleMembers.js";
import Users from "../models/modelUsers.js";
import { errorHandler, notFound } from "../middleware/errorMiddleware.js";

let supertest;
let MongoMemoryServer;
let hasIntegrationDeps = true;

try {
  ({ default: supertest } = await import("supertest"));
  ({ MongoMemoryServer } = await import("mongodb-memory-server"));
} catch {
  hasIntegrationDeps = false;
}

const requireIntegrationDeps = process.env.REQUIRE_INTEGRATION_DEPS === "true";

const buildApp = () => {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/api/users", usersRouter);
  app.use("/api/members", membersRouter);
  app.use(notFound);
  app.use(errorHandler);
  return app;
};

test(
  "integration: join + login + profile update flow",
  { skip: !hasIntegrationDeps && !requireIntegrationDeps },
  async () => {
    if (!hasIntegrationDeps && requireIntegrationDeps) {
      throw new Error(
        "Integration dependencies are missing. Install supertest and mongodb-memory-server.",
      );
    }
    if (!process.env.JWT_SECRET) process.env.JWT_SECRET = "test-secret";

    const mongod = await MongoMemoryServer.create();
    await mongoose.connect(mongod.getUri(), { dbName: "mkad_test" });

    try {
      const app = buildApp();
      const request = supertest(app);

      const inviter = await Users.create({
        username: "inviter01",
        password: "password123",
        name: "MKaDifference",
        inviter: new mongoose.Types.ObjectId(),
        type: "organisation",
      });

      const invitationCode = jwt.sign(
        { inviter: inviter._id.toString(), type: "invitation" },
        process.env.JWT_SECRET,
        { expiresIn: "1d" },
      );

      const joinRes = await request.post("/api/users").send({
        username: "newmember",
        password: "password123",
        name: "New Member",
        code: invitationCode,
      });

      assert.equal(joinRes.status, 201);

      const loginRes = await request.post("/api/users/login").send({
        username: "newmember",
        password: "password123",
      });

      assert.equal(loginRes.status, 200);
      const token = loginRes.body.token;
      const userId = loginRes.body._id;
      assert.equal(typeof token, "string");

      const profilePayload = {
        _id: userId,
        name: "Updated Member",
        description: "desc",
        languages: [],
        interests: [],
        darkmode: true,
        hidden: false,
        lat: 37.7,
        lng: -122.4,
        help: [],
        contacts: [],
        organisations: [],
        members: [],
      };

      const putRes = await request
        .put("/api/members")
        .set("Authorization", token)
        .send(profilePayload);

      assert.equal(putRes.status, 200);
      assert.equal(putRes.body, true);

      const getRes = await request
        .get(`/api/members/${userId}`)
        .set("Authorization", token);

      assert.equal(getRes.status, 200);
      assert.equal(getRes.body.name, "Updated Member");
    } finally {
      await mongoose.connection.dropDatabase();
      await mongoose.disconnect();
      await mongod.stop();
    }
  },
);

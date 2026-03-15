import express from "express";
import { createServer } from "http";
import mongoose from "mongoose";

import cors from "cors";
import helmet from "helmet";
import compression from "compression";

import path from "path";
import dotenv from "dotenv";
import { corsOptions } from "./config/cors.js";
import connectDB from "./config/db.js";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import { requireDbReady } from "./middleware/dbReadyMiddleware.js";
import { loggerMiddleware } from "./middleware/loggerMiddleware.js";
import { requireBearerToken } from "./middleware/authMiddleware.js";
import {
  getMetricsSnapshot,
  metricsMiddleware,
} from "./middleware/metricsMiddleware.js";
import {
  authLimiter,
  globalLimiter,
  readHeavyLimiter,
  realtimeLimiter,
  writeLimiter,
} from "./middleware/rateLimiters.js";
import users from "./modules/moduleUsers.js";
import members from "./modules/moduleMembers.js";
import activities from "./modules/moduleActivities.js";
import organisations from "./modules/moduleOrganisations.js";
import search from "./modules/moduleSearch.js";
import map from "./modules/moduleMap.js";
import messages from "./modules/modulMessages.js";

import contacts from "./modules/moduleContacts.js";
import updates from "./modules/moduleUpdates.js";

import invites from "./modules/moduleInvites.js";
import { setupSocket } from "./socket/setupSocket.js";

dotenv.config();

const __dirname = path.resolve();

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(compression());
app.use(globalLimiter);
app.use(loggerMiddleware);
app.use(metricsMiddleware);

app.get("/healthz", (req, res) => {
  res.status(200).json({ status: "ok", now: new Date().toISOString() });
});

app.get("/readyz", (req, res) => {
  const dbReady =
    mongoose.connection.readyState === 1 && Boolean(process.env.JWT_SECRET);
  if (dbReady) res.status(200).json({ status: "ready" });
  else res.status(503).json({ status: "not-ready" });
});

// Protect metrics so internal stats are not publicly exposed.
app.get("/metrics", requireBearerToken, (req, res) => {
  res.status(200).json(getMetricsSnapshot());
});

// Disable default CSP to supply a custom policy that permits OpenStreetMap assets.
app.use(
  helmet({
    contentSecurityPolicy: false,
  }),
);
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https://*.openstreetmap.org"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      connectSrc: [
        "'self'",
        "https://nominatim.openstreetmap.org",
        "https://mkadifference.com",
      ],
      frameAncestors: ["'none'"],
      baseUri: ["'self'"],
      objectSrc: ["'none'"],
    },
  }),
);

app.use("/api", requireDbReady);

// trust proxy so express-rate-limit can use X-Forwarded-For safely
app.set('trust proxy', 1); // or `true` / `'loopback'`

app.use(
  "/api/users",
  authLimiter,
  users,
);

app.use("/api/search", readHeavyLimiter, search);
app.use("/api/map", readHeavyLimiter, map);
app.use("/api/members", members);
app.use("/api/activities", writeLimiter, activities);
app.use("/api/organisations", writeLimiter, organisations);
app.use("/api/messages", realtimeLimiter, messages);
app.use("/api/contacts", writeLimiter, contacts);
app.use("/api/updates", writeLimiter, updates);
app.use("/api/invites", authLimiter, invites);

app.use(express.static(path.join(__dirname, "../frontend/dist")));
app.get("/", (req, res) =>
  res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html")),
);

app.use(notFound);
app.use(errorHandler);

// Socket.IO handlers live in their own module to keep server bootstrap readable.
const server = createServer(app);
setupSocket(server);

// starting the socket.io and express servers on the same port
server.listen(process.env.PORT, () =>
  console.log(`Server started on port ${process.env.PORT}`),
);

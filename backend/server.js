import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";

import cors from "cors";
import helmet from "helmet";
import compression from "compression";

import path from "path";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import { authSender } from "./middleware/authMiddleware.js";
import { requireDbReady } from "./middleware/dbReadyMiddleware.js";
import { loggerMiddleware } from "./middleware/loggerMiddleware.js";
import {
  getMetricsSnapshot,
  incrementMetric,
  metricsMiddleware,
} from "./middleware/metricsMiddleware.js";
import {
  authLimiter,
  globalLimiter,
  readHeavyLimiter,
  realtimeLimiter,
  writeLimiter,
} from "./middleware/rateLimiters.js";
import {
  createSocketEventLimiter,
  socketPrincipal,
} from "./middleware/socketRateLimiter.js";
import {
  socketErrorPayload,
  validateConversationEvent,
  validateDiscussionEvent,
  validateMessagingEvent,
} from "./middleware/socketMessagePolicy.js";

import users from "./modules/moduleUsers.js";
import members from "./modules/moduleMembers.js";
import activities from "./modules/moduleActivities.js";
import organisations from "./modules/moduleOrganisations.js";
import search from "./modules/moduleSearch.js";
import map from "./modules/moduleMap.js";
import messages from "./modules/modulMessages.js";

import { saveMessage } from "./modules/modulMessages.js";
import contacts from "./modules/moduleContacts.js";
import updates from "./modules/moduleUpdates.js";

import invites from "./modules/moduleInvites.js";

dotenv.config();

const __dirname = path.resolve();

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
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

app.get("/metrics", (req, res) => {
  res.status(200).json(getMetricsSnapshot());
});

// allow sources to openstreetmap
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https://*.openstreetmap.org"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      connectSrc: [
        "'self'",
        "https://nominatim.openstreetmap.org",
        "https://mkadifference.com",
      ],
    },
  }),
);

app.use("/api", requireDbReady);

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

// socket code ############################################
// https://socket.io/docs/v4/server-socket-instance/

const server = createServer(app);

const io = new Server(server, { transports: ["websocket"] });

io.engine.use(helmet());
const socketEventLimiter = createSocketEventLimiter();

// Authorization middleware to append the user as well
io.use(authSender);
// io.engine.use(RateLimit({ windowMs: 1 * 60 * 1000, max: 10 }));

io.on("connection", async (socket) => {
  const replyAck = (ack, payload) => {
    if (typeof ack === "function") ack(payload);
  };

  const allowSocketEvent = (eventName) => {
    const verdict = socketEventLimiter.consume({
      key: socketPrincipal(socket),
      event: eventName,
    });
    if (!verdict.allowed) {
      incrementMetric("socketRateLimitHits");
      socket.emit("rate_limit", {
        event: eventName,
        retryAfterMs: verdict.retryAfterMs,
      });
      return { allowed: false, retryAfterMs: verdict.retryAfterMs };
    }
    return { allowed: true, retryAfterMs: 0 };
  };

  const enforceSocketRate = (eventName, ack) => {
    const verdict = allowSocketEvent(eventName);
    if (!verdict.allowed) {
      replyAck(ack, {
        ok: false,
        error: "rate_limited",
        retryAfterMs: verdict.retryAfterMs,
      });
      return false;
    }
    return true;
  };

  // once a member has requested Messaging another member

  socket.on("joinMessaging", async (m, ack) => {
    if (!enforceSocketRate("join", ack)) return;
    const validation = await validateMessagingEvent(socket, m);
    if (!validation.ok) {
      socket.emit("socket_error", socketErrorPayload(validation.reason));
      replyAck(ack, { ok: false, error: validation.reason });
      return;
    }
    // add sender details from authentication
    // then save vomplete message to DB
    socket.message = await saveMessage({
      ...validation.message,
      content: "Joined",
    });

    const conversationId = generateConversationId(socket.message);

    // announce the member has joined the messaging
    io.sockets.in(conversationId).emit("conversation", socket.message);

    // join member to 2 rooms one for the sender another for the recepient
    socket.join(conversationId);
    replyAck(ack, { ok: true, event: "joinMessaging" });
  });

  socket.on("joinDiscussion", async (m, ack) => {
    if (!enforceSocketRate("join", ack)) return;
    const validation = validateDiscussionEvent(socket, m);
    if (!validation.ok) {
      socket.emit("socket_error", socketErrorPayload(validation.reason));
      replyAck(ack, { ok: false, error: validation.reason });
      return;
    }
    // add sender details from authentication
    // then save vomplete message to DB
    socket.message = await saveMessage({
      ...validation.message,
      content: "Joined",
    });

    const conversationId = generateConversationId(socket.message);

    // announce the member has joined the messaging
    io.sockets.in(conversationId).emit("conversation", socket.message);

    // join member to 2 rooms one for the sender another for the recepient
    socket.join(conversationId);
    replyAck(ack, { ok: true, event: "joinDiscussion" });
  });

  // on receiving a message send a message to both members in the messaging
  socket.on("conversation", async (m, ack) => {
    if (!enforceSocketRate("conversation", ack)) return;
    const validation = await validateConversationEvent(socket, m);
    if (!validation.ok) {
      socket.emit("socket_error", socketErrorPayload(validation.reason));
      replyAck(ack, { ok: false, error: validation.reason });
      return;
    }
    // add sender details from authentication
    // then save vomplete message to DB
    socket.message = await saveMessage({
      ...validation.message,
    });
    const conversationId = generateConversationId(socket.message);
    // announce the member has joined the messaging
    io.sockets.in(conversationId).emit("conversation", socket.message);
    replyAck(ack, { ok: true, event: "conversation", id: socket.message?._id });
  });

  // on member leave messaging
  socket.on("leaveMessaging", async (m, ack) => {
    if (!enforceSocketRate("leave", ack)) return;
    const validation = await validateMessagingEvent(socket, m);
    if (!validation.ok) {
      socket.emit("socket_error", socketErrorPayload(validation.reason));
      replyAck(ack, { ok: false, error: validation.reason });
      return;
    }
    // add sender details from authentication
    // then save vomplete message to DB
    socket.message = await saveMessage({
      ...validation.message,
      content: "Left",
    });

    const conversationId = generateConversationId(socket.message);

    // annnounce member leaving the messaging
    io.sockets.in(conversationId).emit("conversation", socket.message);

    // member leave the room
    socket.leave(conversationId);
    replyAck(ack, { ok: true, event: "leaveMessaging" });
  });

  socket.on("leaveDiscussion", async (m, ack) => {
    if (!enforceSocketRate("leave", ack)) return;
    const validation = validateDiscussionEvent(socket, m);
    if (!validation.ok) {
      socket.emit("socket_error", socketErrorPayload(validation.reason));
      replyAck(ack, { ok: false, error: validation.reason });
      return;
    }
    // add sender details from authentication
    // then save vomplete message to DB
    socket.message = await saveMessage({
      ...validation.message,
      content: "Left",
    });

    const conversationId = generateConversationId(socket.message);

    // annnounce member leaving the messaging
    io.sockets.in(conversationId).emit("conversation", socket.message);

    // member leave the room
    socket.leave(conversationId);
    replyAck(ack, { ok: true, event: "leaveDiscussion" });
  });

  // on member disconnect
  socket.on("disconnect", async (reason) => {});

  // // on member disconnecting
  socket.on("disconnecting", async (reason) => {});

  // Opportunistic cleanup to avoid unbounded in-memory limiter growth.
  if (Math.random() < 0.1) socketEventLimiter.cleanup();
});

const generateConversationId = (message) => {
  const sender = message.sender._id.toString();
  const recipient = message.recipient._id.toString();
  const recipientType = message.recipient.type.toString();

  if (message.recipient.type.toString() === "member")
    return sender > recipient
      ? `${sender}:${recipient}`
      : `${recipient}:${sender}`;
  else return `${recipientType}:${recipient}`;
};

// starting the socket.io and express servers on the same port
server.listen(process.env.PORT, () =>
  console.log(`Server started on port ${process.env.PORT}`),
);

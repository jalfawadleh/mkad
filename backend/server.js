import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import RateLimit from "express-rate-limit";

import path from "path";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import { authSender } from "./middleware/authMiddleware.js";

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
app.use(RateLimit({ max: 30 })); // max 30requests/m

// allow sources to openstreetmap
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https://*.openstreetmap.org"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      connectSrc: [
        "'self'",
        "https://nominatim.openstreetmap.org",
        "https://mkadifference.com",
      ],
    },
  })
);

app.use("/api/users", RateLimit({ max: 3 }), users);
app.use("/api/search", search);
app.use("/api/map", map);
app.use("/api/members", members);
app.use("/api/activities", activities);
app.use("/api/organisations", organisations);
app.use("/api/messages", messages);
app.use("/api/contacts", contacts);
app.use("/api/updates", updates);
app.use("/api/invites", invites);

app.use(express.static(path.join(__dirname, "../frontend/dist")));
app.get("*", (req, res) =>
  res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"))
);

app.use(notFound);
app.use(errorHandler);

// socket code ############################################
// https://socket.io/docs/v4/server-socket-instance/

const server = createServer(app);

const origin =
  process.env.NODE_ENV === "production"
    ? "https://mkadifference.com"
    : "http://localhost:3000";

const io = new Server(server, { cors: { origin } });

io.engine.use(helmet());

// Authorization middleware to append the user as well
io.use(authSender);
// io.engine.use(RateLimit({ windowMs: 1 * 60 * 1000, max: 10 }));

io.on("connection", async (socket) => {
  // once a member has requested Messaging another member

  socket.on("joinMessaging", async (m) => {
    // add sender details from authentication
    // then save vomplete message to DB
    socket.message = await saveMessage({
      ...m,
      ...socket.message,
      content: "Joined",
    });

    const conversationId = generateConversationId(socket.message);

    // announce the member has joined the messaging
    io.sockets.in(conversationId).emit("conversation", socket.message);

    // join member to 2 rooms one for the sender another for the recepient
    socket.join(conversationId);
  });

  socket.on("joinDiscussion", async (m) => {
    // add sender details from authentication
    // then save vomplete message to DB
    socket.message = await saveMessage({
      ...m,
      ...socket.message,
      content: "Joined",
    });

    const conversationId = generateConversationId(socket.message);

    // announce the member has joined the messaging
    io.sockets.in(conversationId).emit("conversation", socket.message);

    // join member to 2 rooms one for the sender another for the recepient
    socket.join(conversationId);
  });

  // on receiving a message send a message to both members in the messaging
  socket.on("conversation", async (m) => {
    // add sender details from authentication
    // then save vomplete message to DB
    socket.message = await saveMessage({
      ...m,
      ...socket.message,
    });
    const conversationId = generateConversationId(socket.message);
    // announce the member has joined the messaging
    io.sockets.in(conversationId).emit("conversation", socket.message);
  });

  // on member leave messaging
  socket.on("leaveMessaging", async (m) => {
    // add sender details from authentication
    // then save vomplete message to DB
    socket.message = await saveMessage({
      ...m,
      ...socket.message,
      content: "Left",
    });

    const conversationId = generateConversationId(socket.message);

    // annnounce member leaving the messaging
    io.sockets.in(conversationId).emit("conversation", socket.message);

    // member leave the room
    socket.leave(conversationId);
  });

  socket.on("leaveDiscussion", async (m) => {
    // add sender details from authentication
    // then save vomplete message to DB
    socket.message = await saveMessage({
      ...m,
      ...socket.message,
      content: "Left",
    });

    const conversationId = generateConversationId(socket.message);

    // annnounce member leaving the messaging
    io.sockets.in(conversationId).emit("conversation", socket.message);

    // member leave the room
    socket.leave(conversationId);
  });

  // on member disconnect
  socket.on("disconnect", async (reason) => {});

  // // on member disconnecting
  socket.on("disconnecting", async (reason) => {});
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
  console.log(`Server started on port ${process.env.PORT}`)
);

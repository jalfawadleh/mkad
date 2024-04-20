import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";

import path from "path";
import rfs from "rotating-file-stream";
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

import { joinDiscussion, leaveDiscussion } from "./modules/modulDiscussion.js";
import { saveMessage } from "./modules/modulMessages.js";
import { getConversationId } from "./modules/modulConversation.js";

dotenv.config();

const port = process.env.PORT || 3011;
const __dirname = path.resolve();

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(compression());

// setup the logger and create a rotating write stream
app.use(
  morgan("combined", {
    stream: rfs.createStream("access.log", {
      interval: "1d", // rotate daily
      path: path.join(__dirname, "logs"),
    }),
  })
);

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
        "https://demo.mkadifference.com",
      ],
    },
  })
);

app.use("/api/users", users);
app.use("/api/members", members);
app.use("/api/activities", activities);
app.use("/api/organisations", organisations);
app.use("/api/search", search);
app.use("/api/map", map);

app.use(express.static(path.join(__dirname, "../frontend/dist")));
app.get("/", (req, res) =>
  res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"))
);

app.use(notFound);
app.use(errorHandler);

// socket code ############################################

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://demo.mkadifference.com",
    methods: ["GET", "POST"],
    transports: ["websocket", "polling"],
    allowedHeaders: ["authorization"],
    credentials: true,
  },
  allowEIO3: true,
});

// setup the logger and create a rotating write stream
io.engine.use(
  morgan("combined", {
    stream: rfs.createStream("access.log", {
      interval: "1d", // rotate daily
      path: path.join(__dirname, "logs"),
    }),
  })
);

io.engine.use(helmet());

// Authorization middleware to append the user as well
io.use(authSender);

let discussionId = "";
let conversationId = "";
let sender = "";

io.on("connection", (socket) => {
  /* Messaging Code */

  // once a member has requested Messaging another member
  socket.on("joinConversation", async (m) => {
    // add member details from socket authentication to the message
    socket.message = { ...m, ...socket.message, content: "joined" };

    // save message in DB
    socket.message = await saveMessage(socket.message);

    conversationId = await getConversationId(socket.message);

    // join member to 2 rooms one for the sender another for the recepient
    socket.join(conversationId);

    // announce the member has joined the messaging
    io.sockets.in(conversationId).emit("message", socket.message);
  });

  // on receiving a message send a message to both members in the messaging
  socket.on("message", async (m) => {
    // add member details from socket authentication to the message
    socket.message = { ...m, ...socket.message };

    // save message in DB
    socket.message = await saveMessage(socket.message);

    // announce the member has joined to discussion
    io.sockets.in(conversationId).emit("message", socket.message);
  });

  // on member leave messaging
  socket.on("leaveConversation", async (m) => {
    // add member details from socket authentication to the message
    socket.message = { ...m, ...socket.message, content: "left" };

    // save message in DB
    socket.message = await saveMessage(socket.message);

    // member leave the room
    socket.leave(conversationId);

    // annnounce member leaving the messaging
    io.sockets.in(conversationId).emit("message", socket.message);
  });

  /* Discussion Code */

  // once a member has requested to join a discussion
  socket.on("joinDiscussion", async (m) => {
    // add member details from socket authentication to the message.sender
    socket.message = { ...m, ...socket.message, content: "joined" };

    // save message in DB
    socket.message = await saveMessage(socket.message);

    //store the discussion
    discussionId =
      socket.message.recipient.type +
      ":" +
      socket.message.recipient._id.toString;

    // Add member to the discussion
    socket.join(discussionId);

    // announce the member has joined to discussion
    io.sockets.in(discussionId).emit("discussion", socket.message);

    // Add member to the discussion in DB
    socket.members = await joinDiscussion(socket.message);

    io.sockets.in(discussionId).emit("members", socket.members);
  });

  // on receiving a message send a message to the members in the discussion
  socket.on("discussion", async (m) => {
    // add member details from socket authentication to the message
    socket.message = { ...m, ...socket.message };

    // save message in DB
    socket.message = await saveMessage(socket.message);

    // send the message to all members in the discussion
    io.sockets.in(discussionId).emit("discussion", socket.message);
  });

  // on member leave the discussion
  socket.on("leaveDiscussion", async (m) => {
    // add member details from socket authentication to the message
    socket.message = { ...m, ...socket.message, content: "left" };

    // announce the member has joined to discussion
    io.sockets.in(discussionId).emit("discussion", socket.message);

    // member remove from discussion
    socket.members = await leaveDiscussion(socket.message);
    io.sockets.in(discussionId).emit("members", socket.members);

    // member leave the discussion
    socket.leave(discussionId);

    // save message in DB
    socket.message = await saveMessage(socket.message);
  });

  // on member disconnect
  socket.on("disconnect", async (reason) => {
    // set The member to be online
    socket.message.content = "left";
    socket.leave(conversationId);
    io.sockets.in(conversationId).emit("message", socket.message);
  });
});

// starting the socket.io and express servers on the same port
server.listen(port, () => console.log(`Server started on port ${port}`));

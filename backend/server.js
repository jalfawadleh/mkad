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
// app.use(
//   morgan("combined", {
//     stream: rfs.createStream("access.log", {
//       interval: "1d", // rotate daily
//       path: path.join(__dirname, "logs"),
//     }),
//   })
// );

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
// https://socket.io/docs/v4/server-socket-instance/

const server = createServer(app);
const origin =
  process.env.NODE_ENV === "production"
    ? "https://demo.mkadifference.com"
    : "http://localhost:3000";
const io = new Server(server, { cors: { origin } });

io.engine.use(helmet());

// Authorization middleware to append the user as well
io.use(authSender);

let discussionId = "";
let conversationId = "";

io.on("connection", async (socket) => {
  /* Messaging Code */
  // Log only in production
  process.env.NODE_ENV != "production" &&
    console.log(
      Date.now(),
      "\tsocket.id:",
      socket.id,
      "connection\n",
      socket.message
    );

  // once a member has requested Messaging another member
  socket.on("joinConversation", async (m) => {
    // add member details from socket authentication to the message
    socket.message = { ...m, ...socket.message, content: "joined" };

    conversationId =
      socket.message.sender._id.toString() >
      socket.message.recipient._id.toString()
        ? socket.message.sender._id.toString()
        : socket.message.recipient._id.toString();

    // join member to 2 rooms one for the sender another for the recepient
    socket.join(conversationId);

    // announce the member has joined the messaging
    io.sockets.in(conversationId).emit("conversation", socket.message);

    // save message in DB
    socket.message = await saveMessage(socket.message);

    // Log only in production
    process.env.NODE_ENV != "production" &&
      console.log(
        Date.now(),
        "\tsocket.id:",
        socket.id,
        "joinConversation\n",
        socket.message
      );
  });

  // on receiving a message send a message to both members in the messaging
  socket.on("conversation", async (m) => {
    // add member details from socket authentication to the message
    socket.message = { ...m, ...socket.message };

    // announce the member has joined to discussion
    io.sockets.in(conversationId).emit("conversation", socket.message);

    // save message in DB
    socket.message = await saveMessage(socket.message);

    // Log only in production
    process.env.NODE_ENV != "production" &&
      console.log(
        Date.now(),
        "\tsocket.id:",
        socket.id,
        "conversation\n",
        socket.message
      );
  });

  // on member leave messaging
  socket.on("leaveConversation", async (m) => {
    // add member details from socket authentication to the message
    socket.message = { ...m, ...socket.message, content: "left" };

    // member leave the room
    socket.leave(conversationId);

    // annnounce member leaving the messaging
    io.sockets.in(conversationId).emit("conversation", socket.message);

    // save message in DB
    socket.message = await saveMessage(socket.message);

    // Log only in production
    process.env.NODE_ENV != "production" &&
      console.log(
        Date.now(),
        "\tsocket.id:",
        socket.id,
        "leaveConversation\n",
        socket.message
      );
  });

  /* Discussion Code */

  // once a member has requested to join a discussion
  socket.on("joinDiscussion", async (m) => {
    // add member details from socket authentication to the message.sender
    socket.message = { ...m, ...socket.message, content: "joined" };

    //store the discussion
    discussionId =
      socket.message.recipient.type +
      ":" +
      socket.message.recipient._id.toString();

    // Add member to the discussion
    socket.join(discussionId);

    // announce the member has joined to discussion
    io.sockets.in(discussionId).emit("discussion", socket.message);

    // Add member to the discussion in DB
    socket.members = await joinDiscussion(socket.message);

    io.sockets.in(discussionId).emit("members", socket.members);

    // save message in DB
    socket.message = await saveMessage(socket.message);
  });

  // on receiving a message send a message to the members in the discussion
  socket.on("discussion", async (m) => {
    // add member details from socket authentication to the message
    socket.message = { ...m, ...socket.message };

    // send the message to all members in the discussion
    io.sockets.in(discussionId).emit("discussion", socket.message);

    // save message in DB
    socket.message = await saveMessage(socket.message);
  });

  // on member leave the discussion
  socket.on("leaveDiscussion", async (m) => {
    // add member details from socket authentication to the message
    socket.message = { ...m, ...socket.message, content: "left" };

    // member leave the discussion
    socket.leave(discussionId);

    // save message in DB
    socket.message = await saveMessage(socket.message);

    // announce the member has joined to discussion
    io.sockets.in(discussionId).emit("discussion", socket.message);

    // member remove from discussion
    socket.members = await leaveDiscussion(socket.message);
    io.sockets.in(discussionId).emit("members", socket.members);
  });

  // on member disconnect
  socket.on("disconnect", async (reason) => {
    // Log only in production
    process.env.NODE_ENV != "production" &&
      console.log(
        Date.now(),
        "\tsocket.id:",
        socket.id,
        "disconnect\n",
        "\n--------------------------"
      );
    // set The member to be online
    socket.disconnect();
  });

  // // on member disconnecting
  // socket.on("disconnecting", async (reason) => {
  //   // set The member to be online
  //   socket.disconnect();
  // });
});

// starting the socket.io and express servers on the same port
server.listen(port, () => console.log(`Server started on port ${port}`));

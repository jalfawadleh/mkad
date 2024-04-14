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

import users from "./modules/moduleUsers.js";
import members from "./modules/moduleMembers.js";
import activities from "./modules/moduleActivities.js";
import organisations from "./modules/moduleOrganisations.js";
import search from "./modules/moduleSearch.js";
import map from "./modules/moduleMap.js";
import { protectSocket } from "./middleware/authMiddleware.js";

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
app.get("*", (req, res) =>
  res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"))
);

app.use(notFound);
app.use(errorHandler);
// socket code ############################################

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://demo.mkadifference.com/",
    methods: ["GET", "POST"],
    transports: ["websocket", "polling"],
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

// Authorization middleware to append the user as well
io.use(protectSocket);
io.engine.use(helmet());

let type = "";
let id = "";

// socket code ############################################
io.on("connection", (socket) => {
  // console.log(`user: ${socket.user.name} communicated`);

  // once a member has requested to join a room
  socket.on("join", (t, i) => {
    type = t;
    id = i;
    // Add member to the room
    socket.join(type + "|" + id);
    // send a message to room members that user joined
    io.sockets.in(type + "|" + id).emit("message", {
      content: "Joined",
      name: socket.user.name,
      _id: socket.user._id,
    });
  });

  // on receiving a message send a message to the members in the room
  socket.on("message", (message) => {
    io.sockets.in(type + "|" + id).emit("message", message);
  });

  // on member disconnect and leave the room
  socket.on("disconnect", (reason) => {
    // member leave the room
    socket.leave(type + "|" + id);
    // advertise the member had left the room
    io.sockets.in(type + "|" + id).emit("message", {
      content: "Left",
      name: socket.user.name,
      _id: socket.user._id,
    });
  });
});

// starting the socket.io and express servers on the same port
server.listen(port, () => console.log(`Server started on port ${port}`));

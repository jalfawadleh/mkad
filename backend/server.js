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
import { protect, protectSocket } from "./middleware/authMiddleware.js";

dotenv.config();
const port = process.env.PORT || 3001;
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
      connectSrc: ["'self'", "https://nominatim.openstreetmap.org"],
    },
  })
);

app.use("/api/users", users);
app.use("/api/members", members);
app.use("/api/activities", activities);
app.use("/api/organisations", organisations);
app.use("/api/search", search);
app.use("/api/map", map);

// app.get("/", (req, res) =>
//   res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"))
// );

app.use(notFound);
app.use(errorHandler);

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
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

io.on("connection", (socket) => {
  console.log(`
connected: 
  socket id: ${socket.id}  
  user name: ${socket.user.name} 
         id: ${socket.user.id}`);

  // upon disconnection
  socket.on("disconnect", (reason) => {
    console.log(`
disconnected: due to ${reason}
  socket id: ${socket.id}  
  user name: ${socket.user.name} 
         id: ${socket.user.id}`);
  });
});

// starting the socket.io and express servers on the same port
server.listen(port, () => console.log(`Server started on port ${port}`));

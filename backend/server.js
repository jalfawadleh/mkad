import path from "path";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
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

dotenv.config();

const port = process.env.PORT || 3001;

connectDB();

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(compression());

const __dirname = path.resolve();

// create a rotating write stream
const accessLogStream = rfs.createStream("access.log", {
  interval: "1d", // rotate daily
  path: path.join(__dirname, "logs"),
});

// setup the logger
app.use(morgan("combined", { stream: accessLogStream }));

// Define the sources to allow
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

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"))
  );
} else {
  // app.get("/", (req, res) => {
  //   res.send("API is running....");
  // });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));

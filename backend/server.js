import path from "path";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";

import dotenv from "dotenv";
dotenv.config();

import connectDB from "./config/db.js";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

import users from "./modules/moduleUsers.js";
import members from "./modules/moduleMembers.js";
import activities from "./modules/moduleActivities.js";
import organisations from "./modules/moduleOrganisations.js";
import search from "./modules/moduleSearch.js";
import map from "./modules/moduleMap.js";

const port = process.env.PORT || 3001;

connectDB();

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(helmet());
app.use(compression());
app.disable("x-powered-by");

const printRequest = (req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    console.log("\nreq -------- --- --- --- --- -- --- --- -");
    console.log("URL: " + req.url);
    console.log("method: " + req.method);
    console.log("params: ");
    console.log(req.params);
    console.log("Body:");
    console.log(req.body);
  }
  next();
};
app.use(printRequest);

app.use("/api/users", users);
app.use("/api/members", members);
app.use("/api/activities", activities);
app.use("/api/organisations", organisations);
app.use("/api/search", search);
app.use("/api/map", map);

if (process.env.NODE_ENV === "production" || true) {
  const __dirname = path.resolve();
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

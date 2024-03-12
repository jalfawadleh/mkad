import path from "path";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

import users from "./modules/moduleUsers.js";
import activities from "./modules/moduleActivities.js";

const port = process.env.PORT || 3001;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

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
app.use("/api/activities", activities);

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));

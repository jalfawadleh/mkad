import Users from "../models/modelUsers.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "..", ".env") });

const connectDB = async () => {
  try {
    const mongoUri =
      process.env.MONGO_URI ?? "mongodb://127.0.0.1/mkadifference";
    const conn = await mongoose.connect(mongoUri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

connectDB();

const addme = async () => {
  const username = process.env.SEED_USERNAME ?? "mkadifference";
  const existing = await Users.findOne({ username });
  if (existing) {
    console.log(`Seed user "${username}" already exists.`);
    return;
  }

  await Users.create({
    username,
    password: process.env.SEED_PASSWORD ?? "mkadifference",
    description: process.env.SEED_DESCRIPTION ?? "mkadifference",
    name: process.env.SEED_NAME ?? "MKaDifference",
    type: process.env.SEED_TYPE ?? "organisation",
    inviter: process.env.SEED_INVITER ?? "6561f8c7a6f0d92a1b123456",
  });

  console.log(`Seed user "${username}" added.`);
};

addme()
  .catch((error) => {
    console.error(error);
  })
  .finally(async () => {
    await mongoose.disconnect();
    process.exit(0);
  });

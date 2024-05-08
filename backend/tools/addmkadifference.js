import Users from "../models/modelUsers.js";
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb://127.0.0.1/mkadifference");
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

connectDB();

const addme = async () => {
  await Users.create({
    username: "mkadifference",
    password: "mkadifference",
    description: "mkadifference",
    name: "MKaDifference",
    type: "organisation",
  });

  console.log("MKaDifference Added");
};

addme();

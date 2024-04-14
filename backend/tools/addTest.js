import Users from "../models/modelUsers.js";
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb://127.0.0.1/mkad");
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

connectDB();

const addme = async () => {
  await Users.create({
    username: "test",
    password: "test",
    discription: "test",
    name: "test",
    email: "test@test.com",
    type: "organisation",
  });

  console.log("test Added");
};

addme();

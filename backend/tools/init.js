import Users from "../models/modelUsers.js";

import { faker } from "@faker-js/faker";

import mongoose from "mongoose";

const populateUsers = async () => {
  const str = faker.string.alpha({ length: { min: 5, max: 10 } });
  await Users.create({
    username: str,
    password: str,
    discription: str,
    name: str,
    email: str,
    type: "member",
    location: {
      lng: faker.location.longitude({ max: 122, min: 110, precision: 5 }),
      lat: faker.location.latitude({ max: 39, min: 36, precision: 5 }),
    },
  });
};

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

const populate = () => {
  try {
    for (let i = 0; i < 50; i++) populateUsers();
  } catch (error) {
    console.log(error);
  }
};

const nIntervId = setInterval(() => populate(), 500);

setTimeout(() => {
  clearInterval(nIntervId);
  process.exit();
}, 50000);

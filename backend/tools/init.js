import Users from "../models/modelUsers.js";
import { palestiniansList } from "./palestiniansList.js";
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

const deleteAll = async () => {
  await Users.deleteMany();
  console.log("All deleted");
};

const addme = async () => {
  await Users.create({
    username: "test",
    password: "test",
    discription: "test",
    name: "test",
    email: "test@test.com",
    type: "member",
  });

  console.log("test Added");
};

const populateUser = async (person) => {
  // [ No.  ID Number     Name                                    Sex     age
  // ["8",  "957071368",  "Suleiman Muhammad Suleiman Al-Astal",  "male", "58"],

  //  USA { lat: '39.19820534889482', lng: '-100.63476562500001' }
  //  EU  { lat: '52.24125614966341', lng: '13.710937500000002' }
  //  SA  { lat: '-19.228176737766248', lng: '-14.23828125' }
  //  AF  { lat: '18.22935133838668', lng: '16.171875000000004' }
  //  CA  { lat: '38.75408327579141', lng: '69.96093750000001' }
  //  EA  { lat: '46.86019101567027', lng: '95.62500000000001' }
  //  AU  { lat: '-19.72534224805787', lng: '122.51953125000001' }

  const personId = parseInt(person[0]);

  const lng =
    Math.random() * 35.23 -
    Math.random() * 35.23 +
    (personId < 1200
      ? -100.63476562500001 // USA
      : personId < 2400
      ? 13.710937500000002 // EU
      : personId < 3600
      ? -14.23828125 // SA
      : personId < 4800
      ? 16.171875000000004 // AF
      : personId < 6000
      ? 69.96093750000001 // CA
      : personId < 7200
      ? 95.62500000000001 // EA
      : 122.51953125000001); // AU
  const lat =
    Math.random() * 35.23 -
    Math.random() * 35.23 +
    (personId < 1200
      ? 39.19820534889482 // USA
      : personId < 2400
      ? 52.24125614966341 // EU
      : personId < 3600
      ? -19.228176737766248 // SA
      : personId < 4800
      ? 18.22935133838668 // AF
      : personId < 6000
      ? 38.75408327579141 // CA
      : personId < 7200
      ? 46.86019101567027 // EA
      : -19.72534224805787); // AU

  const username = "p-no-" + personId;
  const description =
    "ID Number" + personId + " " + person[4] + " Years Old Palestinian Victim";
  const name = person[2];
  const email = username + "@heaven.com";
  const location = { lng, lat };

  await Users.create({
    username,
    password: username,
    description,
    name,
    email,
    type: "member",
    location,
  });
};

console.log("started", Date.now());

deleteAll();
addme();

let no = 0;

const nIntervId = setInterval(() => {
  no++;
  palestiniansList[no]
    ? populateUser(palestiniansList[no])
    : () => {
        console.log("End " + Date.now());
        process.exit(0);
      };
}, 50);

setTimeout(() => {
  clearInterval(nIntervId);
  process.exit(0);
}, 12 * 60 * 1000);

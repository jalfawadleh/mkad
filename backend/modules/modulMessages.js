import asyncHandler from "express-async-handler";
import Messages from "../models/modelMessages.js";

const saveMessage = asyncHandler(async (m) => {
  try {
    const message = await Messages.create(m);
    if (message) return message;
    else throw new Error("Invalid activity data");
  } catch (error) {
    console.log(error);
  }
});

export { saveMessage };

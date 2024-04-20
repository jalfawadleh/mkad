import asyncHandler from "express-async-handler";
import Members from "../models/modelUsers.js";

const setOnline = asyncHandler(async (_id, status) => {
  try {
    const m = await Members.findById({ _id });
    m.online = status;
    m.save();
    return m.online;
  } catch (error) {
    console.log(error);
  }
});

const isOnline = asyncHandler(async (_id) => {
  try {
    const m = await Members.findById({ _id }).select("online");
    return m.online;
  } catch (error) {
    console.log(error);
  }
});

export { setOnline, isOnline };

import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/modelUsers.js";
import Discussions from "../models/modelDiscussion.js";

const authDiscussion = asyncHandler(async (socket, next) => {
  const token = socket.handshake.headers.authorization;

  if (token) {
    try {
      // decode token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // find user
      const user = await User.findById(decoded.id).select("-password");

      // Load user details in message from
      socket.message = {
        sender: { _id: user._id, type: user.type, name: user.name },
      };

      if (socket.message.sender) next();
      else {
        const err = new Error("Not authorized");
        err.data = { content: "token failed" };
        next(err);
      }
    } catch (error) {
      const err = new Error("Not authorized");
      err.data = { content: error };
      next(err);
    }
  } else {
    const err = new Error("Not authorized");
    err.data = { content: "No token" };
    next(err);
  }
});

const saveMessage = asyncHandler(async (m) => {
  const message = await Discussions.create(m);
  if (message) return message;
  else throw new Error("Invalid activity data");
});

export { authDiscussion, saveMessage };

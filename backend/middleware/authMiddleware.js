import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/modelUsers.js";

const protect = asyncHandler(async (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");
      if (req.user) next();
      else {
        res.status(401);
        throw new Error("Not authorized, token failed");
      }
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

const authSender = asyncHandler(async (socket, next) => {
  const token = socket.handshake.auth.token;

  if (token) {
    try {
      // decode token
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);

      // find user
      const sender = await User.findById(decoded.id).select("name type");

      // Load user details in message from
      socket.message = { sender };

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

export { protect, authSender };

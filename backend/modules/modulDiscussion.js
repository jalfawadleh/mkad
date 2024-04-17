import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/modelUsers.js";
import Discussions from "../models/modelDiscussion.js";
import Rooms from "../models/modelRooms.js";
import mongoose from "mongoose";

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

/*
room: {
    _id: { type: Schema.Types.ObjectId },
    type: { type: String },
    name: { type: String },
  },
members: [
  {
    _id: { type: Schema.Types.ObjectId },
    type: { type: String },
    name: { type: String },
  },
],
 */

const joinRoom = asyncHandler(async (m) => {
  const room = await Rooms.findOne({
    "room._id": m.recipient._id,
    "room.name": m.recipient.name,
    "room.type": m.recipient.type,
  }).select("members");

  if (room) {
    room.members = room.members.filter(
      (member) => !member._id.equals(m.sender._id)
    );
    room.members = [...room.members, { ...m.sender }];
    await room.save();
    return room.members;
  } else {
    const newRoom = await Rooms.create({
      room: {
        _id: m.recipient._id,
        name: m.recipient.name,
        type: m.recipient.type,
      },
      members: [
        {
          _id: new mongoose.Types.ObjectId(m.sender._id),
          name: m.sender.name,
          type: m.sender.type,
        },
      ],
    });
    return newRoom.members;
  }
});

const leaveRoom = asyncHandler(async (m) => {
  const room = await Rooms.findOne({
    "room._id": m.recipient._id,
    "room.name": m.recipient.name,
    "room.type": m.recipient.type,
  }).select("members");

  if (room) {
    room.members = room.members.filter(
      (member) => !member._id.equals(m.sender._id)
    );
    await room.save();
    return room.members;
  }
});

export { authDiscussion, saveMessage, joinRoom, leaveRoom };

import express from "express";
import asyncHandler from "express-async-handler";
import { protect } from "../middleware/authMiddleware.js";
import Messages from "../models/modelMessages.js";

/**

{
  sender: {
    _id: { type: Schema.Types.ObjectId },
    type: { type: String },
    name: { type: String },
  },
  recipient: {
    _id: { type: Schema.Types.ObjectId },
    type: { type: String },
    name: { type: String },
  },
  content: String,
  read: { type: Boolean, default: false },
},

 */

export const saveMessage = asyncHandler(async (m) => {
  try {
    const message = await Messages.create(m);
    if (message) return message;
    else throw new Error("Invalid activity data");
  } catch (error) {
    console.log(error);
  }
});

// @desc    Get Messages
// @route   GET /api/messages/
// @access  Private
const getMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Messages.find({
      $or: [
        { "sender._id": req.user._id, "recipient._id": req.body._id },
        { "sender._id": req.body._id, "recipient._id": req.user._id },
      ],
    })
      .sort({ createdAt: 1 })
      .limit(15);
    res.json(messages);
  } catch (error) {
    console.log(error);
  }
});

const messages = express.Router();
messages.post("/", protect, getMessages);
export default messages;

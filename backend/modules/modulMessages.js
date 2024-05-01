import express from "express";
import asyncHandler from "express-async-handler";
import { protect } from "../middleware/authMiddleware.js";
import Messages from "../models/modelMessages.js";
import Updates from "../models/modelUpdates.js";

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
      .sort({ _id: -1 })
      .skip(req.body.skip)
      .limit(20);

    // sending update to the recipient
    const u = {
      sender: { _id: req.user._id, type: "member", name: req.user.name },
      recipient: { _id: req.body._id },
      type: "message",
      content: "Message Received",
    };

    try {
      const found = await Updates.findOne({
        "sender._id": req.user._id,
        "recipient._id": req.body._id,
        type: "message",
      });
      if (!found) await Updates.create(u);
    } catch (error) {
      console.log(error);
    }

    res.json(messages.reverse());
  } catch (error) {
    console.log(error);
  }
});

// @desc    Get Discussion
// @route   GET /api/messages/discussion
// @access  Private
const getDiscussion = asyncHandler(async (req, res) => {
  try {
    const discussion = await Messages.find({
      "recipient._id": req.body._id,
      "recipient.type": req.body.type,
    })
      .sort({ _id: -1 })
      .skip(req.body.skip)
      .limit(20);
    res.json(discussion.reverse());
  } catch (error) {
    console.log(error);
  }
});

const messages = express.Router();
messages.post("/", protect, getMessages);
messages.post("/discussion", protect, getDiscussion);
export default messages;

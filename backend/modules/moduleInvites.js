import express from "express";
import asyncHandler from "express-async-handler";
import { protect } from "../middleware/authMiddleware.js";
import Members from "../models/modelUsers.js";

// @desc    Get Invitees
// @route   GET /api/invitees
// @access  Private
const getInvitees = asyncHandler(async (req, res) => {
  const members = await Members.find({ inviter: req.user._id }, "name");
  if (members) res.status(200).json(members);
  else {
    res.status(404);
    throw new Error("Invitees not found");
  }
});

const invites = express.Router().get("/", protect, getInvitees);
// .get("/invitelink", protect, getInviteLink);
// .get("/passwordlink", protect, getPasswordLink)

export default invites;

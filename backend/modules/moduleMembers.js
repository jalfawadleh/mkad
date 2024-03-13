import express from "express";
import asyncHandler from "express-async-handler";
import { protect } from "../middleware/authMiddleware.js";
import Members from "../models/modelUsers.js";

// @desc    Update Member
// @route   PUT /api/members
// @access  Private
const putMember = asyncHandler(async (req, res) => {
  const member = await Members.findById(req.body._id);

  if (member) {
    // Update profile
    member.name = req.body.name || member.name;
    member.description = req.body.description || member.description;
    member.languages = req.body.languages || member.languages;
    member.help = req.body.help || member.help;
    member.interests = req.body.interests || member.interests;
    member.darkmood = req.body.darkmood || member.darkmood;
    member.hidden = req.body.hidden || member.hidden;
    await member.save();

    res.json(true);
  } else {
    res.status(404);
    throw new Error("Member not found");
  }
});

// @desc    Get Member
// @route   GET /api/members/:id
// @access  Private
const getMember = asyncHandler(async (req, res) => {
  const member = await Members.findById({ _id: req.params.id });

  if (member)
    res.json({
      _id: member._id,
      name: member.name,
      description: member.description,
      languages: member.languages,
      help: member.help,
      interests: member.interests,
      location: member.location,
      darkmood: member.darkmood,
      hidden: member.hidden,
      contacts: member.contacts,
      organisations: member.organisations,
    });
  else {
    res.status(404);
    throw new Error("Member not found");
  }
});

const members = express.Router();

members.put("/", protect, putMember).get("/:id", protect, getMember);

export default members;

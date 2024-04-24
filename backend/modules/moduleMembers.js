import express from "express";
import asyncHandler from "express-async-handler";
import { protect } from "../middleware/authMiddleware.js";
import Members from "../models/modelUsers.js";
import Users from "../models/modelUsers.js";
import Activities from "../models/modelActivities.js";

// @desc    Update Member
// @route   PUT /api/members
// @access  Private
const putMember = asyncHandler(async (req, res) => {
  const member = await Members.findById(req.body._id);

  if (member) {
    // Update profile
    member.name = req.body.name;
    member.description = req.body.description;
    member.languages = req.body.languages;
    member.interests = req.body.interests;
    member.location = req.body.location;
    member.darkmood = req.body.darkmood;
    member.hidden = req.body.hidden;
    member.contacts = req.body.contacts;
    member.helpOffered = req.body.helpOffered;
    member.helpNeeded = req.body.helpNeeded;
    member.help = req.body.help;

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
  const organisations = await Users.find({
    "members._id": req.params.id,
  }).select("name");
  const activities = await Activities.find({
    "members._id": req.params.id,
  }).select("name");

  if (member)
    res.json({
      _id: member._id,
      name: member.name,
      type: member.type,
      description: member.description,
      languages: member.languages,
      interests: member.interests,
      location: member.location,
      darkmood: member.darkmood,
      hidden: member.hidden,
      contacts: member.contacts,
      help: member.help,
      contacts: member.contacts,
      organisations,
      activities,
    });
  else {
    res.status(404);
    throw new Error("Member not found");
  }
});

// @desc    Get Members Count
// @route   GET /api/members/count
// @access  Private
const getMembersCount = asyncHandler(async (req, res) => {
  try {
    const data = await Members.countDocuments({});
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

const members = express.Router();

members
  .put("/", protect, putMember)
  .get("/count", getMembersCount)
  .get("/:id", protect, getMember);

export default members;

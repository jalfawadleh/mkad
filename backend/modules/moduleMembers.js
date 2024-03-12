import express from "express";
import asyncHandler from "express-async-handler";
import { protect } from "../middleware/authMiddleware.js";
import Members from "../models/modelUsers.js";

// @desc    Get All Activities
// @route   GET /api/activities
// @access  Private
const getActivities = asyncHandler(async (req, res) => {
  const activities = await Members.find();
  res.status(200).json(activities);
});

// @desc    Add New Activity
// @route   POST /api/activities
// @access  Public
const postActivity = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  const activity = await Members.create({
    name,
    description,
  });

  if (activity) res.status(201).json({ activity });
  else {
    res.status(400);
    throw new Error("Invalid activity data");
  }
});

// @desc    Update Member
// @route   PUT /api/members
// @access  Private
const putMember = asyncHandler(async (req, res) => {
  const member = await Members.findOneAndUpdate(req.body._id, req.body);

  if (member) res.json(member);
  else {
    res.status(404);
    throw new Error("Activity not found");
  }
});

// @desc    Get Member
// @route   GET /api/members/:id
// @access  Private
const getMember = asyncHandler(async (req, res) => {
  const member = await Members.findById({ _id: req.params.id });

  if (member) res.json(member);
  else {
    res.status(404);
    throw new Error("Member not found");
  }
});

const members = express.Router();

members.route("/:id").get(protect, getMember).put(protect, putMember);

export default members;

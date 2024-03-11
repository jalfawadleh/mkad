import express from "express";
import asyncHandler from "express-async-handler";
import { protect } from "../middleware/authMiddleware.js";
import Activity from "../models/ActivityModel.js";

// @desc    Get All Activities
// @route   GET /api/activities
// @access  Private
const getActivities = asyncHandler(async (req, res) => {
  const activities = await Activity.find();
  res.status(200).json(activities);
});

// @desc    Add New Activity
// @route   POST /api/activities
// @access  Public
const postActivity = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  const activity = await Activity.create({
    name,
    description,
  });

  if (activity) res.status(201).json({ activity });
  else {
    res.status(400);
    throw new Error("Invalid activity data");
  }
});

// @desc    Update Activity
// @route   PUT /api/activities
// @access  Private
const putActivity = asyncHandler(async (req, res) => {
  const activity = await Activity.findOneAndUpdate(req.body._id, req.body);

  if (activity) {
    res.json(activity);
  } else {
    res.status(404);
    throw new Error("Activity not found");
  }
});

// @desc    Get Activity
// @route   GET /api/activities/:id
// @access  Private
const getActivity = asyncHandler(async (req, res) => {
  const activity = await Activity.findById({ _id: req.params.id });

  if (activity) {
    res.json(activity);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Delete Activity
// @route   Delete /api/activities/:id
// @access  Private
const deleteActivity = asyncHandler(async (req, res) => {
  const activity = await Activity.deleteOne({ _id: req.params.id });
  console.log(activity);
  if (activity) {
    res.res.status(204);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const activities = express.Router();

activities
  .route("/")
  .get(protect, getActivities)
  .post(protect, postActivity)
  .put(protect, putActivity);
activities
  .route("/:id")
  .get(protect, getActivity)
  .delete(protect, deleteActivity);

export default activities;

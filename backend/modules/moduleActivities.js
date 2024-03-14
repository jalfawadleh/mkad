import express from "express";
import asyncHandler from "express-async-handler";
import { protect } from "../middleware/authMiddleware.js";
import Activities from "../models/modelActivities.js";

// @desc    Get All Activities
// @route   GET /api/activities
// @access  Private
const getActivities = asyncHandler(async (req, res) => {
  const activities = await Activities.find().select("name");
  res.status(200).json(activities);
});

// @desc    Add New Activity
// @route   POST /api/activities
// @access  Public
const postActivity = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  const activity = await Activities.create({
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
  const activity = await Activities.findById(req.body._id);

  if (activity) {
    activity.name = req.body.name;
    activity.description = req.body.description;
    activity.notes = req.body.notes;
    activity.languages = req.body.languages;
    activity.help = req.body.help;
    activity.interests = req.body.interests;
    activity.hidden = req.body.hidden;

    await activity.save();
    const activities = await Activities.find().select("name");
    res.status(200).json(activities);
  } else {
    res.status(404);
    throw new Error("Activity not found");
  }
});

// @desc    Get Activity
// @route   GET /api/activities/:id
// @access  Private
const getActivity = asyncHandler(async (req, res) => {
  const activity = await Activities.findById({ _id: req.params.id });

  if (activity) res.json(activity);
  else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Delete Activity
// @route   Delete /api/activities/:id
// @access  Private
const deleteActivity = asyncHandler(async (req, res) => {
  const activity = await Activities.deleteOne({ _id: req.params.id });
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

import express from "express";
import asyncHandler from "express-async-handler";
import { protect } from "../middleware/authMiddleware.js";
import Activities from "../models/modelActivities.js";

// @desc    Get All Activities Managed
// @route   GET /api/activities/managed
// @access  Private
const getActivitiesManaged = asyncHandler(async (req, res) => {
  const activities = await Activities.find({
    "createdBy._id": req.user._id,
  }).select("name location type");

  res.status(200).json(activities);
});

// @desc    Get Activities Joined
// @route   GET /api/activities
// @access  Private
const getActivitiesJoined = asyncHandler(async (req, res) => {
  const activities = await Activities.find({
    "members._id": req.user._id,
  }).select("name location type");
  res.status(200).json(activities);
});

// @desc    Get Activity
// @route   GET /api/activities/:id
// @access  Private
const getActivity = asyncHandler(async (req, res) => {
  const activity = await Activities.findById({ _id: req.params.id });

  if (activity) res.json(activity);
  else {
    res.status(404);
    throw new Error("Activity not found");
  }
});

// @desc    Add New Activity
// @route   POST /api/activities
// @access  Public
const postActivity = asyncHandler(async (req, res) => {
  const activity = await Activities.create({
    name: req.body.name,
    startOn: req.body.startOn,
    endOn: req.body.endOn,
    description: req.body.description,
    notes: req.body.notes,
    languages: req.body.languages,
    helpOffered: req.body.helpOffered,
    helpNeeded: req.body.helpNeeded,
    interests: req.body.interests,
    hidden: req.body.hidden,
    location: req.body.location,
    online: req.body.online,
    help: req.body.help,
    createdBy: { _id: req.user._id, name: req.user.name },
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
    activity.startOn = req.body.startOn;
    activity.endOn = req.body.endOn;
    activity.description = req.body.description;
    activity.notes = req.body.notes;
    activity.languages = req.body.languages;
    activity.helpOffered = req.body.helpOffered;
    activity.helpNeeded = req.body.helpNeeded;
    activity.interests = req.body.interests;
    activity.hidden = req.body.hidden;
    activity.location = req.body.location;
    activity.online = req.body.online;
    activity.help = req.body.help;

    await activity.save();
    res.status(200).json({ activity });
  } else {
    res.status(404);
    throw new Error("Activity not found");
  }
});

// @desc    Delete Activity
// @route   Delete /api/activities/:id
// @access  Private
const deleteActivity = asyncHandler(async (req, res) => {
  const activity = await Activities.deleteOne({ _id: req.params.id });

  if (activity) {
    res.res.status(204);
  } else {
    res.status(404);
    throw new Error("Activity not found");
  }
});

// @desc    Update Activity
// @route   PUT /api/activities
// @access  Private
const joinActivity = asyncHandler(async (req, res) => {
  const activity = await Activities.findOne({ _id: req.params.id });

  if (activity) {
    try {
      if (
        activity.members.length != 0 &&
        activity.members.find((m) => m._id.equals(req.user._id))
      )
        activity.members = activity.members.filter(
          (m) => !m._id.equals(req.user._id)
        );
      else activity.members.push({ _id: req.user._id, name: req.user.name });

      await activity.save();
    } catch (e) {
      console.log(e);
      // [Error: Uh oh!]
    }

    res.status(200).json(activity);
  } else {
    res.status(404);
    throw new Error("Activity not found");
  }
});

const activities = express.Router();

activities
  .route("/")
  .get(protect, getActivitiesJoined)
  .post(protect, postActivity)
  .put(protect, putActivity);
activities
  .get("/managed", protect, getActivitiesManaged)
  .get("/join/:id", protect, joinActivity);
activities
  .route("/:id")
  .get(protect, getActivity)
  .delete(protect, deleteActivity);

export default activities;

import express from "express";
import asyncHandler from "express-async-handler";
import { protect } from "../middleware/authMiddleware.js";
import Activities from "../models/modelActivities.js";
import { isValidId } from "../utils/validators.js";
import {
  enforceAllowedBodyKeys,
  validateBody,
  validateParams,
  validators,
} from "../middleware/requestSchemaMiddleware.js";

// @desc    Get All Activities Managed
// @route   GET /api/activities/managed
// @access  Private
const getActivitiesManaged = asyncHandler(async (req, res) => {
  const activities = await Activities.find({
    "createdBy._id": req.user._id,
  }).select("name type lat lng");

  res.status(200).json(activities);
});

// @desc    Get Activities Joined
// @route   GET /api/activities
// @access  Private
const getActivitiesJoined = asyncHandler(async (req, res) => {
  const activities = await Activities.find({
    "members._id": req.user._id,
  }).select("name type lat lng");
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
    lng: req.body.lng,
    lat: req.body.lat,
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
  const activity = await Activities.findOne({
    _id: req.body._id,
    "createdBy._id": req.user._id,
  });

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
    activity.lng = req.body.lng;
    activity.lat = req.body.lat;
    activity.online = req.body.online;
    activity.help = req.body.help;

    await activity.save();
    res.status(200).json({ activity });
  } else {
    res.status(404);
    throw new Error("Activity not found or you are not allowed to edit it");
  }
});

// @desc    Delete Activity
// @route   Delete /api/activities/:id
// @access  Private
const deleteActivity = asyncHandler(async (req, res) => {
  const activity = await Activities.deleteOne({
    _id: req.params.id,
    "createdBy._id": req.user._id,
  });

  if (activity.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(404);
    throw new Error("Activity not found or you are not allowed to delete it");
  }
});

// @desc    Update Activity
// @route   PUT /api/activities
// @access  Private
const joinActivity = asyncHandler(async (req, res) => {
  if (!isValidId(req.params.id)) {
    res.status(400);
    throw new Error("Invalid activity id");
  }
  const activity = await Activities.findOne({ _id: req.params.id });

  if (activity) {
    try {
      if (
        activity.members.length != 0 &&
        activity.members.find((m) => m._id.equals(req.user._id))
      )
        activity.members = activity.members.filter(
          (m) => !m._id.equals(req.user._id),
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
  .post(
    protect,
    enforceAllowedBodyKeys([
      "_id",
      "type",
      "name",
      "startOn",
      "endOn",
      "description",
      "notes",
      "languages",
      "helpOffered",
      "helpNeeded",
      "interests",
      "hidden",
      "lng",
      "lat",
      "online",
      "help",
      "createdBy",
      "members",
      "organisations",
      "archived",
      "icon",
    ]),
    validateBody({
      name: validators.requiredString,
      startOn: validators.optionalString,
      endOn: validators.optionalString,
      description: validators.optionalString,
      hidden: validators.optionalBooleanish,
      lng: validators.optionalNumber,
      lat: validators.optionalNumber,
    }),
    postActivity,
  )
  .put(
    protect,
    enforceAllowedBodyKeys([
      "_id",
      "name",
      "startOn",
      "endOn",
      "description",
      "notes",
      "languages",
      "helpOffered",
      "helpNeeded",
      "interests",
      "hidden",
      "lng",
      "lat",
      "online",
      "help",
      "createdBy",
      "members",
      "organisations",
      "archived",
      "type",
      "icon",
      "createdAt",
      "updatedAt",
      "__v",
    ]),
    validateBody({
      _id: validators.objectId,
      name: validators.optionalString,
      startOn: validators.optionalString,
      endOn: validators.optionalString,
      description: validators.optionalString,
      hidden: validators.optionalBooleanish,
      lng: validators.optionalNumber,
      lat: validators.optionalNumber,
    }),
    putActivity,
  );
activities
  .get("/managed", protect, getActivitiesManaged)
  .get("/join/:id", protect, validateParams({ id: validators.objectId }), joinActivity);
activities
  .route("/:id")
  .get(protect, validateParams({ id: validators.objectId }), getActivity)
  .delete(protect, validateParams({ id: validators.objectId }), deleteActivity);

export default activities;

import express from "express";
import asyncHandler from "express-async-handler";
import { protect } from "../middleware/authMiddleware.js";
import Organisations from "../models/modelUsers.js";
import Activities from "../models/modelActivities.js";

// @desc    Get Organisations Joined
// @route   GET /api/activities
// @access  Private
const getJoined = asyncHandler(async (req, res) => {
  const organisations = await Organisations.find({
    "members._id": req.user._id,
  }).select("name location type");
  res.status(200).json(organisations);
});

// @desc    Get Organisation
// @route   GET /api/activities/:id
// @access  Private
const getItem = asyncHandler(async (req, res) => {
  const organisation = await Organisations.findOne({ _id: req.params.id });
  const activities = await Activities.find({
    "createdBy._id": req.params.id,
  }).select("name location type");

  if (organisation) {
    res.json({
      name: organisation.name,
      type: organisation.type,
      description: organisation.description,
      notes: organisation.notes,
      languages: organisation.languages,
      interests: organisation.interests,
      help: organisation.help,
      members: organisation.members,
      darkmood: organisation.darkmood,
      hidden: organisation.hidden,
      location: organisation.location,
      activities: activities,
    });
  } else {
    res.status(404);
    throw new Error("Organisation not found");
  }
});

// @desc    Join Organisation
// @route   PUT /api/Organisations/join/:id
// @access  Private
const joinItem = asyncHandler(async (req, res) => {
  const organisation = await Organisations.findOne({ _id: req.params.id });
  if (organisation) {
    try {
      if (
        organisation.members.length != 0 &&
        organisation.members.find((m) => m._id.equals(req.user._id))
      )
        organisation.members = organisation.members.filter(
          (m) => !m._id.equals(req.user._id)
        );
      else
        organisation.members.push({ _id: req.user._id, name: req.user.name });

      await organisation.save();
    } catch (e) {
      console.log(e);
      // [Error: Uh oh!]
    }

    res.status(200).json(organisation);
  } else {
    res.status(404);
    throw new Error("Organisation not found");
  }
});

const organisations = express
  .Router()
  .get("/join", protect, getJoined)
  .get("/join/:id", protect, joinItem)
  .get("/:id", protect, getItem);

export default organisations;

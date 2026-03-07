import express from "express";
import asyncHandler from "express-async-handler";
import { protect } from "../middleware/authMiddleware.js";
import Members from "../models/modelUsers.js";
import Activities from "../models/modelActivities.js";
import {
  enforceAllowedBodyKeys,
  validateBody,
  validateParams,
  validators,
} from "../middleware/requestSchemaMiddleware.js";

// @desc    Update Member
// @route   PUT /api/members
// @access  Private
const putMember = asyncHandler(async (req, res) => {
  const member = await Members.findById(req.user._id);

  if (member) {
    // Update profile
    member.name = req.body.name;
    member.description = req.body.description;
    member.languages = req.body.languages;
    member.interests = req.body.interests;
    member.lat = req.body.lat;
    member.lng = req.body.lng;
    member.darkmode = req.body.darkmode;
    member.contacts = req.body.contacts;
    member.hidden = req.body.hidden;
    member.darkmode = req.body.darkmode;
    member.help = req.body.help;
    //    console.log(member);
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
      lat: member.lat,
      lng: member.lng,
      darkmode: member.darkmode,
      hidden: member.hidden,
      contacts: member.contacts,
      help: member.help,
      contacts: member.contacts,
      organisations: member.organisations,
      members: member.members,
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
  .put(
    "/",
    protect,
    enforceAllowedBodyKeys([
      "_id",
      "name",
      "description",
      "languages",
      "interests",
      "lat",
      "lng",
      "darkmode",
      "contacts",
      "hidden",
      "help",
      "organisations",
      "members",
    ]),
    validateBody({
      name: validators.optionalString,
      description: validators.optionalString,
      lat: validators.optionalNumber,
      lng: validators.optionalNumber,
      darkmode: validators.optionalBooleanish,
      hidden: validators.optionalBooleanish,
    }),
    putMember,
  )
  .get("/count", getMembersCount)
  .get("/:id", protect, validateParams({ id: validators.objectId }), getMember);

export default members;

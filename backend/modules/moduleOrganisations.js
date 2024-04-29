import express from "express";
import asyncHandler from "express-async-handler";
import { protect } from "../middleware/authMiddleware.js";
import Organisations from "../models/modelUsers.js";
import Activities from "../models/modelActivities.js";
import Members from "../models/modelUsers.js";

// @desc    Get Members
// @route   GET /api/organisations/members
// @access  Private
const getMembers = asyncHandler(async (req, res) => {
  const organisation = await Organisations.findOne({ _id: req.user._id });
  if (organisation) res.json(organisation.members);
  else {
    res.status(404);
    throw new Error("Organisation not found");
  }
});

// @desc    Get Organisation
// @route   GET /api/organisations/:id
// @access  Private
const getOrganisation = asyncHandler(async (req, res) => {
  const organisation = await Organisations.findOne({ _id: req.params.id });
  const activities = await Activities.find({
    "createdBy._id": req.params.id,
  }).select("name location type");

  if (organisation) {
    res.json({
      _id: organisation._id,
      name: organisation.name,
      type: organisation.type,
      description: organisation.description,
      notes: organisation.notes,
      languages: organisation.languages,
      interests: organisation.interests,
      help: organisation.help,
      members: organisation.members,
      contacts: organisation.contacts,
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

// @desc    Delete Member or organisation
// @route   DELETE /api/organisations/:id
// @access  Private
const del = asyncHandler(async (req, res) => {
  const recipient = await Members.findOne({ _id: req.params.id });
  const sender = await Members.findOne({ _id: req.user._id });

  if (recipient) {
    recipient.members = recipient.members.filter(
      (m) => !(m._id.equals(sender._id) || m._id.equals(recipient._id))
    );
    recipient.organisations = recipient.organisations.filter(
      (m) => !(m._id.equals(sender._id) || m._id.equals(recipient._id))
    );
    sender.members = sender.members.filter(
      (m) => !(m._id.equals(sender._id) || m._id.equals(recipient._id))
    );
    sender.organisations = sender.organisations.filter(
      (m) => !(m._id.equals(sender._id) || m._id.equals(recipient._id))
    );
    await sender.save();
    await recipient.save();
  } else {
    res.status(404);
    throw new Error("member not found");
  }

  res.status(200).json(true);
});

// @desc    Approve Member
// @route   POST /api/organisations/approve
// @access  Private
const approve = asyncHandler(async (req, res) => {
  const member = await Members.findById({ _id: req.body.id });
  const organisation = await Organisations.findById({ _id: req.user._id });

  // Updating sender contacts
  if (member) {
    // remove organisation from sender contacts
    member.organisations = member.organisations.filter(
      (o) => !o._id.equals(organisation._id)
    );
    // Add me approved to sender
    member.organisations.push({
      _id: organisation._id,
      name: organisation.name,
      approved: true,
    });
    await member.save();
  } else {
    res.status(404);
    throw new Error("Member not found");
  }

  // Updating organisation members
  // remove the member from organisation members
  organisation.members = organisation.members.filter(
    (o) => !o._id.equals(member._id)
  );
  organisation.members.push({
    _id: member._id,
    name: member.name,
    approved: true,
  });

  await organisation.save();

  res.status(200).json(true);
});

// @desc    Join Organisation
// @route   PUT /api/organisations/join/:id
// @access  Private
const join = asyncHandler(async (req, res) => {
  const organisation = await Organisations.findOne({ _id: req.body.id });
  const member = await Members.findOne({ _id: req.user._id });
  if (organisation) {
    try {
      organisation.members.push({
        _id: member._id,
        name: member.name,
        approved: false,
      });
      await organisation.save();

      member.organisations.push({
        _id: organisation._id,
        name: organisation.name,
        approved: false,
      });
      await member.save();
    } catch (e) {
      throw new Error("Something went wrong");
    }

    res.status(200).json(organisation.members);
  } else {
    res.status(404);
    throw new Error("Organisation not found");
  }
});

const organisations = express
  .Router()
  .get("/:id", protect, getOrganisation)
  .get("/members", protect, getMembers)
  .post("/join", protect, join)
  .post("/approve", protect, approve)
  .delete("/:id", protect, del);

export default organisations;

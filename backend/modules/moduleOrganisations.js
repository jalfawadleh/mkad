import express from "express";
import asyncHandler from "express-async-handler";
import { protect } from "../middleware/authMiddleware.js";
import Organisations from "../models/modelUsers.js";
import Activities from "../models/modelActivities.js";
import Members from "../models/modelUsers.js";
import { isValidId } from "../utils/validators.js";
import { withOptionalTransaction } from "../utils/transactions.js";
import {
  enforceAllowedBodyKeys,
  validateBody,
  validateParams,
  validators,
} from "../middleware/requestSchemaMiddleware.js";

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
  }).select("name type lat lng");

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
      darkmode: organisation.darkmode,
      hidden: organisation.hidden,
      lat: organisation.lat,
      lng: organisation.lng,
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
  await withOptionalTransaction(async (session) => {
    const sessionOptions = session ? { session } : {};
    const recipient = await Members.findOne(
      { _id: req.params.id },
      null,
      sessionOptions,
    );
    const sender = await Members.findOne(
      { _id: req.user._id },
      null,
      sessionOptions,
    );

    if (!recipient || !sender) {
      res.status(404);
      throw new Error("member not found");
    }

    recipient.members = recipient.members.filter(
      (m) => !(m._id.equals(sender._id) || m._id.equals(recipient._id)),
    );
    recipient.organisations = recipient.organisations.filter(
      (m) => !(m._id.equals(sender._id) || m._id.equals(recipient._id)),
    );
    sender.members = sender.members.filter(
      (m) => !(m._id.equals(sender._id) || m._id.equals(recipient._id)),
    );
    sender.organisations = sender.organisations.filter(
      (m) => !(m._id.equals(sender._id) || m._id.equals(recipient._id)),
    );
    await sender.save(sessionOptions);
    await recipient.save(sessionOptions);
  });

  res.status(200).json(true);
});

// @desc    Approve Member
// @route   POST /api/organisations/approve
// @access  Private
const approve = asyncHandler(async (req, res) => {
  await withOptionalTransaction(async (session) => {
    const sessionOptions = session ? { session } : {};
    const member = await Members.findById(req.body.id, null, sessionOptions);
    const organisation = await Organisations.findById(
      req.user._id,
      null,
      sessionOptions,
    );

    if (!member || !organisation) {
      res.status(404);
      throw new Error("Member not found");
    }

    member.organisations = member.organisations.filter(
      (o) => !o._id.equals(organisation._id),
    );
    member.organisations.push({
      _id: organisation._id,
      name: organisation.name,
      approved: true,
    });
    await member.save(sessionOptions);

    organisation.members = organisation.members.filter(
      (o) => !o._id.equals(member._id),
    );
    organisation.members.push({
      _id: member._id,
      name: member.name,
      approved: true,
    });

    await organisation.save(sessionOptions);
  });

  res.status(200).json(true);
});

// @desc    Join Organisation
// @route   PUT /api/organisations/join/:id
// @access  Private
const join = asyncHandler(async (req, res) => {
  if (!isValidId(req.body.id)) {
    res.status(400);
    throw new Error("Invalid organisation id");
  }
  const members = await withOptionalTransaction(async (session) => {
    const sessionOptions = session ? { session } : {};
    const organisation = await Organisations.findOne(
      { _id: req.body.id },
      null,
      sessionOptions,
    );
    const member = await Members.findOne(
      { _id: req.user._id },
      null,
      sessionOptions,
    );
    if (!organisation || !member) {
      res.status(404);
      throw new Error("Organisation not found");
    }

    if (!organisation.members.some((m) => m._id.equals(member._id))) {
      organisation.members.push({
        _id: member._id,
        name: member.name,
        approved: false,
      });
    }
    await organisation.save(sessionOptions);

    if (!member.organisations.some((o) => o._id.equals(organisation._id))) {
      member.organisations.push({
        _id: organisation._id,
        name: organisation.name,
        approved: false,
      });
    }
    await member.save(sessionOptions);

    return organisation.members;
  });

  res.status(200).json(members);
});

const organisations = express
  .Router()
  .get("/members", protect, getMembers)
  .get("/:id", protect, validateParams({ id: validators.objectId }), getOrganisation)
  .post(
    "/join",
    protect,
    enforceAllowedBodyKeys(["id"]),
    validateBody({ id: validators.objectId }),
    join,
  )
  .post(
    "/approve",
    protect,
    enforceAllowedBodyKeys(["id"]),
    validateBody({ id: validators.objectId }),
    approve,
  )
  .delete("/:id", protect, validateParams({ id: validators.objectId }), del);

export default organisations;

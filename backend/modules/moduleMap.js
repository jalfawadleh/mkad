import express from "express";
import asyncHandler from "express-async-handler";
import { protect } from "../middleware/authMiddleware.js";
import Members from "../models/modelUsers.js";
import Activities from "../models/modelActivities.js";
import {
  enforceAllowedBodyKeys,
  validateBody,
  validators,
} from "../middleware/requestSchemaMiddleware.js";

import dotenv from "dotenv";
dotenv.config();

// @desc    Get Items
// @route   GET /api/map/
// @access  Private
const getItems = asyncHandler(async (req, res) => {
  const fields = "name type lat lng";
  const hidden = false;
  // Visibility: self or approved relationships only (contacts/orgs/approved members).
  const memberVisibility = [
    { _id: req.user._id },
    { contacts: { $elemMatch: { _id: req.user._id, approved: true } } },
    { organisations: { $elemMatch: { _id: req.user._id, approved: true } } },
  ];
  const organisationVisibility = [
    { _id: req.user._id },
    { members: { $elemMatch: { _id: req.user._id, approved: true } } },
  ];
  const activityVisibility = [
    { "members._id": req.user._id },
    { "createdBy._id": req.user._id },
    { "managedBy._id": req.user._id },
  ];

  const members = await Members.find(
    { hidden, type: "member", $or: memberVisibility },
    fields,
  );
  const organisations = await Members.find(
    { hidden: false, type: "organisation", $or: organisationVisibility },
    fields,
  );
  const activities = await Activities.find(
    {
      hidden: false,
      "online.value": false,
      startOn: { $gt: Date.now() },
      $or: activityVisibility,
    },
    fields,
  );
  res.json({ members, activities, organisations });
});

// @desc    Get Items
// @route   GET /api/map/
// @access  Private
const getItemsByLocation = asyncHandler(async (req, res) => {
  const fields = "name type lat lng";
  const hidden = false;

  // Default coverage avoids NaN and prevents empty-map responses.
  const configuredCoverage = Number(process.env.MAPCOVERAGE);
  const coverage =
    Number.isFinite(configuredCoverage) && configuredCoverage > 0
      ? configuredCoverage
      : 1;

  const lngMax = parseFloat(req.body.lng) + coverage * 1.5;
  const lngMin = parseFloat(req.body.lng) - coverage * 1.5;
  const latMax = parseFloat(req.body.lat) + coverage * 0.75;
  const latMin = parseFloat(req.body.lat) - coverage * 0.75;

  // Same visibility rules as above, scoped to the requested map bounds.
  const memberVisibility = [
    { _id: req.user._id },
    { contacts: { $elemMatch: { _id: req.user._id, approved: true } } },
    { organisations: { $elemMatch: { _id: req.user._id, approved: true } } },
  ];
  const organisationVisibility = [
    { _id: req.user._id },
    { members: { $elemMatch: { _id: req.user._id, approved: true } } },
  ];
  const activityVisibility = [
    { "members._id": req.user._id },
    { "createdBy._id": req.user._id },
    { "managedBy._id": req.user._id },
  ];

  const members = await Members.find(
    {
      hidden,
      type: "member",
      $or: memberVisibility,
      lng: { $gte: lngMin, $lt: lngMax },
      lat: { $gte: latMin, $lt: latMax },
    },
    fields,
  );

  const organisations = await Members.find(
    {
      hidden,
      type: "organisation",
      $or: organisationVisibility,
      lng: { $gte: lngMin, $lt: lngMax },
      lat: { $gte: latMin, $lt: latMax },
    },
    fields,
  );
  const activities = await Activities.find(
    {
      hidden,
      type: "activity",
      $or: activityVisibility,
      lng: { $gte: lngMin, $lt: lngMax },
      lat: { $gte: latMin, $lt: latMax },
      startOn: { $gt: Date.now() },
    },
    fields,
  );

  res.json({ members, activities, organisations });
});

const search = express.Router();

search
  .get("/", protect, getItems)
  .post(
    "/",
    protect,
    enforceAllowedBodyKeys(["lat", "lng"]),
    validateBody({
      lat: validators.requiredNumber,
      lng: validators.requiredNumber,
    }),
    getItemsByLocation,
  );

export default search;

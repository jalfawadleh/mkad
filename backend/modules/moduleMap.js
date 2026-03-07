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
  const members = await Members.find({ hidden, type: "member" }, fields);
  const organisations = await Members.find(
    { hidden: false, type: "organisation" },
    fields,
  );
  const activities = await Activities.find(
    { hidden: false, "online.value": false, startOn: { $gt: Date.now() } },
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

  const coverage = parseInt(process.env.MAPCOVERAGE);

  const lngMax = parseFloat(req.body.lng) + coverage * 1.5;
  const lngMin = parseFloat(req.body.lng) - coverage * 1.5;
  const latMax = parseFloat(req.body.lat) + coverage * 0.75;
  const latMin = parseFloat(req.body.lat) - coverage * 0.75;

  const members = await Members.find(
    {
      hidden,
      type: "member",
      lng: { $gte: lngMin, $lt: lngMax },
      lat: { $gte: latMin, $lt: latMax },
    },
    fields,
  );

  const organisations = await Members.find(
    {
      hidden,
      type: "organisation",
      lng: { $gte: lngMin, $lt: lngMax },
      lat: { $gte: latMin, $lt: latMax },
    },
    fields,
  );
  const activities = await Activities.find(
    {
      hidden,
      type: "activity",
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

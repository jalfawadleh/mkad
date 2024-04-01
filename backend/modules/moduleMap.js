import express from "express";
import asyncHandler from "express-async-handler";
import { protect } from "../middleware/authMiddleware.js";
import Members from "../models/modelUsers.js";
import Activities from "../models/modelActivities.js";

import dotenv from "dotenv";
dotenv.config();

// @desc    Get Items
// @route   GET /api/map/
// @access  Private
const getItems = asyncHandler(async (req, res) => {
  const fields = "name type location";
  const hidden = false;
  const members = await Members.find({ hidden, type: "member" }, fields);
  const organisations = await Members.find(
    { hidden, type: "organisation" },
    fields
  );
  const activities = await Activities.find(
    { hidden, type: "activity" },
    fields
  );

  res.json({ members, activities, organisations });
  // res.json([...members]);
});

// @desc    Get Items
// @route   GET /api/map/
// @access  Private
const getItemsByLocation = asyncHandler(async (req, res) => {
  const fields = "name type location";
  const hidden = false;

  const coverage = parseInt(process.env.MAPCOVERAGE);

  const lngMax = parseFloat(req.body.lng) + coverage;
  const lngMin = parseFloat(req.body.lng) - coverage;
  const latMax = parseFloat(req.body.lat) + coverage;
  const latMin = parseFloat(req.body.lat) - coverage;

  const members = await Members.find(
    {
      hidden,
      type: "member",
      "location.lng": { $gte: lngMin, $lt: lngMax },
      "location.lat": { $gte: latMin, $lt: latMax },
    },
    fields
  );

  const organisations = await Members.find(
    {
      hidden,
      type: "organisation",
      "location.lng": { $gte: lngMin, $lt: lngMax },
      "location.lat": { $gte: latMin, $lt: latMax },
    },
    fields
  );
  const activities = await Activities.find(
    {
      hidden,
      type: "activity",
      "location.lng": { $gte: lngMin, $lt: lngMax },
      "location.lat": { $gte: latMin, $lt: latMax },
    },
    fields
  );

  res.json({ members, activities, organisations });
});

const search = express.Router();

search.get("/", protect, getItems).post("/", protect, getItemsByLocation);

export default search;

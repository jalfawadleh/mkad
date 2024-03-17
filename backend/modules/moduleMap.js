import express from "express";
import asyncHandler from "express-async-handler";
import { protect } from "../middleware/authMiddleware.js";
import Members from "../models/modelUsers.js";
import Activities from "../models/modelActivities.js";

// @desc    Get Map Elements
// @route   GET /api/map/
// @access  Private
const getMapElements = asyncHandler(async (req, res) => {
  const members = await Members.find({}, "name type location");
  const activities = await Activities.find({}, "name type location");

  res.json([...members, ...activities]);
});

const search = express.Router();

search.get("/", protect, getMapElements);

export default search;

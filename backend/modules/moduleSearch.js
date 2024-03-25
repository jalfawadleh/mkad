import express from "express";
import asyncHandler from "express-async-handler";
import { protect } from "../middleware/authMiddleware.js";
import Members from "../models/modelUsers.js";
import Activities from "../models/modelActivities.js";

// @desc    Get Search Results
// @route   GET /api/search/:q
// @access  Private
const getResults = asyncHandler(async (req, res) => {
  const members = await Members.find(
    { name: { $regex: ".*" + req.body.text + ".*" }, hidden: false },
    "name type"
  ).limit(5);

  const activities = await Activities.find(
    { name: { $regex: ".*" + req.body.text + ".*" }, hidden: false },
    "name type"
  ).limit(5);

  // console.log(members);
  // console.log(activities);

  res.json([...members, ...activities]);
});

const search = express.Router();

search.post("/", protect, getResults);

export default search;

import express from "express";
import asyncHandler from "express-async-handler";
import { protect } from "../middleware/authMiddleware.js";
import Members from "../models/modelUsers.js";
import Activities from "../models/modelActivities.js";

// @desc    Get Items
// @route   GET /api/map/
// @access  Private
const getItems = asyncHandler(async (req, res) => {
  const members = await Members.find({ hidden: false }, "name type location");
  const activities = await Activities.find(
    { hidden: false },
    "name type location"
  );

  res.json([...members, ...activities]);
  // res.json([...members]);
});

const search = express.Router();

search.get("/", protect, getItems);

export default search;

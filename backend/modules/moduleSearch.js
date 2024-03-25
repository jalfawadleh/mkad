import express from "express";
import asyncHandler from "express-async-handler";
import { protect } from "../middleware/authMiddleware.js";
import Members from "../models/modelUsers.js";
import Activities from "../models/modelActivities.js";

// @desc    Get Search Results
// @route   GET /api/search/:q
// @access  Private
const getResults = asyncHandler(async (req, res) => {
  const results = [];

  if (req.body.text) {
    if (req.body.activities === "true") {
      const activities = await Activities.find(
        {
          name: { $regex: ".*" + req.body.text + ".*", $options: "i" },
          hidden: false,
        },
        "name type location"
      ).limit(10);
      results.push(...activities);
    }
    if (req.body.members === "true") {
      const members = await Members.find(
        {
          name: { $regex: ".*" + req.body.text + ".*", $options: "i" },
          type: "member",
          hidden: false,
        },
        "name type location"
      ).limit(15);
      results.push(...members);
    }

    if (req.body.organisations === "true") {
      const members = await Members.find(
        {
          name: { $regex: ".*" + req.body.text + ".*", $options: "i" },
          type: "organisation",
          hidden: false,
        },
        "name type location"
      ).limit(15);
      results.push(...members);
    }
  } else {
    res.status(404);
    throw new Error("Search input not found");
  }

  res.json(results);
});

const search = express.Router();
search.post("/", protect, getResults);
export default search;

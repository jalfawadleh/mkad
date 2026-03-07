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

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// @desc    Get Search Results
// @route   GET /api/search/:q
// @access  Private
const getResults = asyncHandler(async (req, res) => {
  const results = [];
  const isEnabled = (value) => value === true || value === "true";

  if (req.body.text) {
    const textRegex = { $regex: `.*${escapeRegex(req.body.text)}.*`, $options: "i" };
    if (isEnabled(req.body.activities)) {
      const activities = await Activities.find(
        {
          name: textRegex,
          hidden: false,
        },
        "name type lat lng",
      ).limit(10);
      results.push(...activities);
    }
    if (isEnabled(req.body.members)) {
      const members = await Members.find(
        {
          name: textRegex,
          type: "member",
          hidden: false,
        },
        "name type lat lng",
      ).limit(15);
      results.push(...members);
    }

    if (isEnabled(req.body.organisations)) {
      const members = await Members.find(
        {
          name: textRegex,
          type: "organisation",
          hidden: false,
        },
        "name type lat lng",
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
search.post(
  "/",
  protect,
  enforceAllowedBodyKeys([
    "text",
    "filter",
    "locations",
    "organisations",
    "members",
    "activities",
    "updates",
    "messages",
  ]),
  validateBody({
    text: validators.requiredString,
    filter: validators.optionalBooleanish,
    locations: validators.optionalBooleanish,
    organisations: validators.optionalBooleanish,
    members: validators.optionalBooleanish,
    activities: validators.optionalBooleanish,
    updates: validators.optionalBooleanish,
    messages: validators.optionalBooleanish,
  }),
  getResults,
);
export default search;

import express from "express";
import asyncHandler from "express-async-handler";
import { protect } from "../middleware/authMiddleware.js";
import Items from "../models/modelUsers.js";

// @desc    Get Organisation
// @route   GET /api/activities/:id
// @access  Private
const getItem = asyncHandler(async (req, res) => {
  const item = await Items.findById({ _id: req.params.id });

  if (item) res.json(item);
  else {
    res.status(404);
    throw new Error("Organisation not found");
  }
});

// @desc    Join Organisation
// @route   PUT /api/Organisations/join/:id
// @access  Private
const joinItem = asyncHandler(async (req, res) => {
  const item = await Items.findOne({ _id: req.params.id });
  if (item) {
    try {
      if (
        item.members.length != 0 &&
        item.members.find((m) => m._id.equals(req.user._id))
      )
        item.members = item.members.filter((m) => !m._id.equals(req.user._id));
      else item.members.push({ _id: req.user._id, name: req.user.name });

      await item.save();
    } catch (e) {
      console.log(e);
      // [Error: Uh oh!]
    }

    res.status(200).json(item);
  } else {
    res.status(404);
    throw new Error("Organisation not found");
  }
});

const items = express.Router();
items.route("/:id").get(protect, getItem);
items.route("/join/:id").get(protect, joinItem);

export default items;

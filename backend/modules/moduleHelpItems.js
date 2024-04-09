import express from "express";
import asyncHandler from "express-async-handler";
import { protect } from "../middleware/authMiddleware.js";
import HelpItems from "../models/modelHelpItems.js";

// @desc    Get All Help
// @route   GET /api/help
// @access  Private
const getHelp = asyncHandler(async (req, res) => {
  const help = await HelpItems.find({
    parentId: req.data.parentId,
    parentType: req.data.parentType,
  });

  res.status(200).json(help);
});

// @desc    Post Help
// @route   GET /api/help
// @access  Private
const putHelp = asyncHandler(async (req, res) => {
  const help = await HelpItems.findById(req.body.id);

  if (help) {
    try {
      if (
        help.members.length != 0 &&
        help.members.find((m) => m._id.equals(req.user._id))
      )
        help.members = help.members.filter((m) => !m._id.equals(req.user._id));
      else help.members.push({ _id: req.user._id, name: req.user.name });

      await help.save();
    } catch (e) {
      console.log(e);
      // [Error: Uh oh!]
    }

    res.status(200).json("help");
  } else res.status(404).json("Help Not Found");
});

// @desc    Add New Help
// @route   POST /api/help
// @access  PRIVATE
const postHelp = asyncHandler(async (req, res) => {
  console.log(helpItem);
  const helpItem = await HelpItems.create({
    parentId: req.body.parentId,
    parentType: req.body.parentType,
    text: req.body.text,
    offer: req.body.offer,
    members: [],
  });

  if (helpItem) res.status(201).json({ helpItem });
  else {
    res.status(400);
    throw new Error("Invalid help data");
  }
});

const helpItems = express.Router();
helpItems
  .post("/", protect, putHelp)
  .post("/all", protect, getHelp)
  .put("/:id", protect, postHelp);

export default helpItems;

import express from "express";
import asyncHandler from "express-async-handler";
import { protect } from "../middleware/authMiddleware.js";
import Updates from "../models/modelUpdates.js";
import { isValidId } from "../utils/validators.js";
import {
  enforceAllowedBodyKeys,
  validateBody,
  validateParams,
  validators,
} from "../middleware/requestSchemaMiddleware.js";

// @desc    Post Update
// @route   POST /api/updates
// @access  Private
const postUpdate = asyncHandler(async (req, res) => {
  if (!req.body?.recipient?._id || !isValidId(req.body.recipient._id)) {
    res.status(400);
    throw new Error("Invalid recipient id");
  }
  const update = await Updates.create(req.body);

  if (update) res.status(200).json(update);
  else {
    await Updates.create(req.body);
    res.status(200).json(true);
  }
});

// @desc    Get Updates
// @route   GET /api/updates
// @access  Private
const getUpdates = asyncHandler(async (req, res) => {
  const updates = await Updates.find({ "recipient._id": req.user._id });

  res.status(200).json(updates);
});

// @desc    Archive Update
// @route   POST /api/updates/archive
// @access  Private
const archiveUpdate = asyncHandler(async (req, res) => {
  if (!isValidId(req.body.id)) {
    res.status(400);
    throw new Error("Invalid update id");
  }
  const update = await Updates.findOne({
    _id: req.body.id,
    "recipient._id": req.user._id,
  });
  if (update) {
    update.archived = true;
    await update.save();
    res.status(200).json(true);
  } else {
    res.status(404);
    throw new Error("Update not found");
  }
});

// @desc    Delete Update
// @route   DELETE /api/updates/:id
// @access  Private
const deleteUpdate = asyncHandler(async (req, res) => {
  if (!isValidId(req.params.id)) {
    res.status(400);
    throw new Error("Invalid update id");
  }
  const update = await Updates.deleteOne({
    _id: req.params.id,
    "recipient._id": req.user._id,
  });
  if (update.deletedCount > 0) res.status(204).send();
  else {
    res.status(404);
    throw new Error("Update not found");
  }
});

const updates = express
  .Router()
  .post(
    "/",
    protect,
    enforceAllowedBodyKeys([
      "sender",
      "recipient",
      "type",
      "content",
      "read",
      "archived",
    ]),
    validateBody({ "recipient._id": validators.objectId }),
    postUpdate,
  )
  .get("/", protect, getUpdates)
  .delete("/:id", protect, validateParams({ id: validators.objectId }), deleteUpdate)
  .post(
    "/archive",
    protect,
    enforceAllowedBodyKeys(["id"]),
    validateBody({ id: validators.objectId }),
    archiveUpdate,
  );

export default updates;

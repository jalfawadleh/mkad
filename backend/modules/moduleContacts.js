import express from "express";
import asyncHandler from "express-async-handler";
import { protect } from "../middleware/authMiddleware.js";
import Members from "../models/modelUsers.js";
import Updates from "../models/modelUpdates.js";
import { isValidId } from "../utils/validators.js";
import { withOptionalTransaction } from "../utils/transactions.js";
import {
  enforceAllowedBodyKeys,
  validateBody,
  validateParams,
  validators,
} from "../middleware/requestSchemaMiddleware.js";

// @desc    Post Contact
// @route   POST /api/contacts
// @access  Private
const postContact = asyncHandler(async (req, res) => {
  if (!isValidId(req.body._id)) {
    res.status(400);
    throw new Error("Invalid member id");
  }
  if (req.body._id === req.user._id.toString()) {
    res.status(400);
    throw new Error("You cannot add yourself");
  }

  await withOptionalTransaction(async (session) => {
    const sessionOptions = session ? { session } : {};
    const recipient = await Members.findOne(
      { _id: req.body._id },
      null,
      sessionOptions,
    );
    const sender = await Members.findOne(
      { _id: req.user._id },
      null,
      sessionOptions,
    );
    if (!sender) {
      res.status(404);
      throw new Error("Member not found");
    }
    if (!recipient) {
      res.status(404);
      throw new Error("Member not found");
    }

    const alreadyAdded = recipient.contacts.some((c) => c._id.equals(sender._id));
    if (!alreadyAdded) {
      recipient.contacts.push({
        _id: sender._id,
        name: sender.name,
        requested: false,
        approved: false,
      });
      await recipient.save(sessionOptions);
    }

    const alreadyRequested = sender.contacts.some((c) =>
      c._id.equals(recipient._id),
    );
    if (!alreadyRequested) {
      sender.contacts.push({
        _id: recipient._id,
        name: recipient.name,
        requested: true,
        approved: false,
      });
      await sender.save(sessionOptions);
    }

    const updateQuery = {
      "sender._id": sender._id,
      "recipient._id": recipient._id,
      type: "contact",
      content: "Contact Request",
    };

    const found = await Updates.findOne(updateQuery, null, sessionOptions);
    if (!found) {
      await Updates.create(
        [
          {
            sender: { _id: sender._id, type: sender.type, name: sender.name },
            recipient: { _id: recipient._id },
            type: "contact",
            content: "Contact Request",
          },
        ],
        sessionOptions,
      );
    }
  });

  res.status(200).json(true);
});

// @desc    Get Contacts
// @route   GET /api/contacts
// @access  Private
const getContacts = asyncHandler(async (req, res) => {
  const member = await Members.findOne({ _id: req.user._id });
  if (member) res.status(200).json(member.contacts);
  else {
    res.status(404);
    throw new Error("Organisation not found");
  }
});

// @desc    Approve Contact
// @route   POST /api/contacts/approve
// @access  Private
const approveContact = asyncHandler(async (req, res) => {
  if (!isValidId(req.body.id)) {
    res.status(400);
    throw new Error("Invalid member id");
  }
  await withOptionalTransaction(async (session) => {
    const sessionOptions = session ? { session } : {};
    const sender = await Members.findOne(
      { _id: req.body.id },
      null,
      sessionOptions,
    );
    const recipient = await Members.findOne(
      { _id: req.user._id },
      null,
      sessionOptions,
    );
    if (!recipient) {
      res.status(404);
      throw new Error("Member not found");
    }
    if (!sender) {
      res.status(404);
      throw new Error("Member not found");
    }

    const hasPendingRequest = recipient.contacts.some((c) =>
      c._id.equals(sender._id),
    );
    if (!hasPendingRequest) {
      res.status(400);
      throw new Error("No pending contact request");
    }

    sender.contacts = sender.contacts.filter((c) => !c._id.equals(recipient._id));
    sender.contacts.push({
      _id: recipient._id,
      name: recipient.name,
      requested: true,
      approved: true,
    });
    await sender.save(sessionOptions);

    recipient.contacts = recipient.contacts.filter((c) => !c._id.equals(sender._id));
    recipient.contacts = [
      ...recipient.contacts,
      { _id: sender._id, name: sender.name, requested: true, approved: true },
    ];
    await recipient.save(sessionOptions);

    const updateQuery = {
      "sender._id": recipient._id,
      "recipient._id": sender._id,
      type: "contact",
      content: "Contact Approved",
    };
    const found = await Updates.findOne(updateQuery, null, sessionOptions);
    if (!found) {
      await Updates.create(
        [
          {
            sender: {
              _id: recipient._id,
              type: "member",
              name: recipient.name,
            },
            recipient: { _id: sender._id },
            type: "contact",
            content: "Contact Approved",
          },
        ],
        sessionOptions,
      );
    }
  });

  res.status(200).json(true);
});

// @desc    Delete Contact
// @route   DELETE /api/contacts/:id
// @access  Private
const deleteContact = asyncHandler(async (req, res) => {
  if (!isValidId(req.params.id)) {
    res.status(400);
    throw new Error("Invalid member id");
  }
  await withOptionalTransaction(async (session) => {
    const sessionOptions = session ? { session } : {};
    const sender = await Members.findOne(
      { _id: req.user._id },
      null,
      sessionOptions,
    );
    if (!sender) {
      res.status(404);
      throw new Error("Member not found");
    }
    const recipient = await Members.findOne(
      { _id: req.params.id },
      null,
      sessionOptions,
    );
    if (!recipient) {
      res.status(404);
      throw new Error("member not found");
    }

    recipient.contacts = recipient.contacts.filter(
      (c) => !c._id.equals(sender._id),
    );
    await recipient.save(sessionOptions);

    sender.contacts = sender.contacts.filter((c) => !c._id.equals(recipient._id));
    await sender.save(sessionOptions);
  });

  res.status(200).json(true);
});

const contacts = express
  .Router()
  .post(
    "/",
    protect,
    enforceAllowedBodyKeys(["_id", "name"]),
    validateBody({ _id: validators.objectId }),
    postContact,
  )
  .get("/", protect, getContacts)
  .delete("/:id", protect, validateParams({ id: validators.objectId }), deleteContact)
  .post(
    "/approve",
    protect,
    enforceAllowedBodyKeys(["id"]),
    validateBody({ id: validators.objectId }),
    approveContact,
  );

export default contacts;

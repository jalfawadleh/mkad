import express from "express";
import asyncHandler from "express-async-handler";
import { protect } from "../middleware/authMiddleware.js";
import Members from "../models/modelUsers.js";
import Updates from "../models/modelUpdates.js";

// @desc    Post Contact
// @route   POST /api/contacts
// @access  Private
const postContact = asyncHandler(async (req, res) => {
  const recipient = await Members.findOne({ _id: req.body._id });
  const sender = await Members.findOne({ _id: req.user._id });

  if (recipient) {
    recipient.contacts.push({
      _id: sender._id,
      name: sender.name,
      requested: false,
      approved: false,
    });
    recipient.save();
  } else {
    res.status(404);
    throw new Error("Member not found");
  }

  sender.contacts.push({
    _id: recipient._id,
    name: recipient.name,
    requested: true,
    approved: false,
  });
  sender.save();

  // adding update to the recipient
  const u = {
    sender: { _id: sender._id, type: sender.type, name: sender.name },
    recipient: { _id: recipient._id },
    type: "contact",
    content: "Contact Request",
  };

  try {
    const found = await Updates.findOne(u);
    if (!found) await Updates.create(u);
  } catch (error) {
    console.log(error);
  }

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
  const sender = await Members.findOne({ _id: req.body.id });
  const recipient = await Members.findOne({ _id: req.user._id });

  // Updating sender contacts
  if (sender) {
    // remove me from sender contacts
    sender.contacts = sender.contacts.filter(
      (c) => !c._id.equals(recipient._id)
    );
    // Add me approved to sender
    sender.contacts.push({
      _id: recipient._id,
      name: recipient.name,
      requested: true,
      approved: true,
    });
    sender.save();

    // adding update to the recipient
    const u = {
      sender: { _id: recipient._id, type: "member", name: recipient.name },
      recipient: { _id: sender._id },
      type: "contact",
      content: "Contact Approved",
    };

    try {
      const found = await Updates.findOne(u);
      if (!found) await Updates.create(u);
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(404);
    throw new Error("Member not found");
  }

  // Updating my contacts
  // remove the requester from my contacts
  recipient.contacts = recipient.contacts.filter(
    (c) => !c._id.equals(sender._id)
  );
  recipient.contacts = [
    ...recipient.contacts,
    { _id: sender._id, name: sender.name, requested: true, approved: true },
  ];
  recipient.save();

  res.status(200).json(true);
});

// @desc    Delete Contact
// @route   DELETE /api/contacts/:id
// @access  Private
const deleteContact = asyncHandler(async (req, res) => {
  const sender = await Members.findOne({ _id: req.user.id });
  const recipient = await Members.findOne({ _id: req.params.id });
  if (recipient) {
    recipient.contacts = recipient.contacts.filter(
      (c) => !c._id.equals(sender._id)
    );
    recipient.save();
  } else {
    res.status(404);
    throw new Error("member not found");
  }
  sender.contacts = sender.contacts.filter((c) => !c._id.equals(recipient._id));
  sender.save();

  res.status(200).json(true);
});

const contacts = express
  .Router()
  .post("/", protect, postContact)
  .get("/", protect, getContacts)
  .delete("/:id", protect, deleteContact)
  .post("/approve", protect, approveContact);

export default contacts;

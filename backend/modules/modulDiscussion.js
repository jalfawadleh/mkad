import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import Discussions from "../models/modelDiscussions.js";

/*
discussion: {
    _id: { type: Schema.Types.ObjectId },
    type: { type: String },
    name: { type: String },
  },
members: [
  {
    _id: { type: Schema.Types.ObjectId },
    type: { type: String },
    name: { type: String },
  },
],
 */

const joinDiscussion = asyncHandler(async (m) => {
  const discussion = await Discussions.findOne({
    "discussion._id": m.recipient._id,
    "discussion.name": m.recipient.name,
    "discussion.type": m.recipient.type,
  }).select("members");

  if (discussion) {
    discussion.members = discussion.members.filter(
      (member) => !member._id.equals(m.sender._id)
    );
    discussion.members = [...discussion.members, { ...m.sender }];
    await discussion.save();
    return discussion.members;
  } else {
    const newDiscussion = await Discussions.create({
      discussion: {
        _id: m.recipient._id,
        name: m.recipient.name,
        type: m.recipient.type,
      },
      members: [
        {
          _id: new mongoose.Types.ObjectId(m.sender._id),
          name: m.sender.name,
          type: m.sender.type,
        },
      ],
    });
    return newDiscussion.members;
  }
});

const leaveDiscussion = asyncHandler(async (m) => {
  try {
    const discussion = await Discussions.findOne({
      "discussion._id": m.recipient._id,
      "discussion.name": m.recipient.name,
      "discussion.type": m.recipient.type,
    }).select("members");

    if (discussion) {
      discussion.members = discussion.members.filter(
        (member) => !member._id.equals(m.sender._id)
      );
      await discussion.save();
      return discussion.members;
    }
  } catch (error) {
    console.log(error);
  }
});

export { joinDiscussion, leaveDiscussion };

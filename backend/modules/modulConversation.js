import asyncHandler from "express-async-handler";
import Conversations from "../models/modelConversations.js";

/*
members: [
  {
    _id: { type: Schema.Types.ObjectId },
    online: { type: Boolean, default: false },
  },
],
*/

const getConversationId = asyncHandler(async (m) => {
  try {
    const c = await Conversations.findOne({
      "members._id": m.sender._id,
      "members._id": m.recipient._id,
    });

    if (c) return c._id.toString();
    else {
      const newC = Conversations.create({
        members: [
          { _id: m.sender._id, online: true },
          { _id: m.recipient._id },
        ],
      });
      return newC._id.toString();
    }
  } catch (error) {
    console.log(error);
  }
});

export { getConversationId };

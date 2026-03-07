import mongoose, { Schema } from "mongoose";

const messages = Schema(
  {
    sender: {
      _id: { type: Schema.Types.ObjectId },
      type: { type: String },
      name: { type: String },
    },
    recipient: {
      _id: { type: Schema.Types.ObjectId },
      type: { type: String },
      name: { type: String },
    },
    content: String,
    read: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

messages.index({ "sender._id": 1, "recipient._id": 1, createdAt: -1 });
messages.index({ "recipient._id": 1, "sender._id": 1, createdAt: -1 });
messages.index({ "recipient._id": 1, "recipient.type": 1, createdAt: -1 });

const Messages = mongoose.model("messages", messages);

export default Messages;

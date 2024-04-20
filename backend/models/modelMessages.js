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

const Messages = mongoose.model("messages", messages);

export default Messages;

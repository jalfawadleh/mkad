import mongoose, { Schema } from "mongoose";

const conversations = Schema(
  {
    members: [
      {
        _id: { type: Schema.Types.ObjectId },
        online: { type: Boolean, default: false },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Conversations = mongoose.model("conversations", conversations);

export default Conversations;

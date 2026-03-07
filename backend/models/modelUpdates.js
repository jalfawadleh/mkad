import mongoose, { Schema } from "mongoose";

const updates = Schema(
  {
    sender: {
      _id: { type: Schema.Types.ObjectId },
      type: { type: String },
      name: { type: String },
    },
    recipient: {
      _id: { type: Schema.Types.ObjectId },
    },
    type: { type: String, default: "" },
    content: { type: String, default: "" },
    read: { type: Boolean, default: false },
    archived: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

updates.index({ "recipient._id": 1, archived: 1, createdAt: -1 });
updates.index({ "sender._id": 1, "recipient._id": 1, type: 1 });

const Updates = mongoose.model("updates", updates);

export default Updates;

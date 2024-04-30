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

const Updates = mongoose.model("updates", updates);

export default Updates;

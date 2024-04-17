import mongoose, { Schema } from "mongoose";

const messagesSchema = Schema(
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
  },
  {
    timestamps: true,
  }
);

const Discussions = mongoose.model("discussion", messagesSchema);

export default Discussions;

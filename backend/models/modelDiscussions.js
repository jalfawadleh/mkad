import mongoose, { Schema } from "mongoose";

const discussions = Schema(
  {
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
  },
  {
    timestamps: true,
  }
);

const Discussions = mongoose.model("discussions", discussions);

export default Discussions;

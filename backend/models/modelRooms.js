import mongoose, { Schema } from "mongoose";

const roomsSchema = Schema(
  {
    room: {
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

const Rooms = mongoose.model("rooms", roomsSchema);

export default Rooms;

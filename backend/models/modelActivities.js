import mongoose, { Schema } from "mongoose";

const schema = Schema(
  {
    createdBy: { _id: Schema.Types.ObjectId, name: String },
    managedBy: [{ _id: Schema.Types.ObjectId, name: String }],

    type: { type: String, default: "activity" },

    name: { type: String, required: true },
    description: String,

    notes: [],

    languages: { type: [{ name: String }], default: [] },
    help: { type: [{ name: String }], default: [] },
    interests: { type: [{ name: String }], default: [] },

    hidden: { type: Boolean, default: false },
    location: { type: Array, default: [-122.2683, 37.8243] },
    archived: { type: Boolean, default: false },

    members: [
      {
        _id: Schema.Types.ObjectId,
        name: String,
        approved: { type: Boolean, default: false },
      },
    ],

    organisations: [
      {
        id: Schema.Types.ObjectId,
        name: String,
        approved: { type: Boolean, default: false },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const activities = mongoose.model("Activities", schema);

export default activities;

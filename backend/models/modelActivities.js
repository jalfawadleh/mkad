import mongoose, { Schema } from "mongoose";

const schema = Schema(
  {
    createdBy: { _id: Schema.Types.ObjectId, name: String },
    managedBy: [{ id: Schema.Types.ObjectId, name: String }],
    type: { type: String, default: "activity" },

    name: { type: String, required: true },
    description: String,

    notes: [],
    location: { type: Array, default: [-122.2683, 37.8243] },
    languages: { type: [{ name: String }], default: [] },
    help: { type: [{ name: String }], default: [] },
    tags: { type: [{ name: String }], default: [] },

    darkmood: { type: Boolean, default: false },
    hidden: { type: Boolean, default: false },

    contacts: [
      {
        id: { type: Schema.Types.ObjectId },
        name: { type: String },
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

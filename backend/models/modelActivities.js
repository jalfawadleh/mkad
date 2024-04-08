import mongoose, { Schema } from "mongoose";

const schema = Schema(
  {
    type: { type: String, default: "activity" },

    name: { type: String, required: true },
    description: String,

    startOn: { type: Date },
    endOn: { type: Date },

    location: {
      type: { lng: Number, lat: Number },
      default: { lng: -122.2683, lat: 37.8243 },
    },

    online: {
      type: { value: Boolean, link: String },
      default: { value: false, link: "" },
    },

    help: {
      type: [
        {
          offer: Boolean,
          text: String,
          members: [{ _id: Schema.Types.ObjectId, name: String }],
        },
      ],
      default: [],
    },

    notes: { type: [{ name: String }], default: [] },
    languages: { type: [{ name: String }], default: [] },
    interests: { type: [{ name: String }], default: [] },

    helpOffered: {
      type: [
        {
          name: String,
          volunteers: [{ _id: Schema.Types.ObjectId, name: String }],
        },
      ],
      default: [],
    },
    helpNeeded: {
      type: [
        {
          name: String,
          volunteers: [{ _id: Schema.Types.ObjectId, name: String }],
        },
      ],
      default: [],
    },

    hidden: { type: Boolean, default: false },

    archived: { type: Boolean, default: false },

    createdBy: { _id: Schema.Types.ObjectId, name: String },
    managedBy: [{ _id: Schema.Types.ObjectId, name: String }],

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

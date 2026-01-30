import mongoose, { Schema } from "mongoose";

const schema = Schema(
  {
    type: { type: String, default: "activity" },
    name: { type: String, index: true, required: true },
    icon: { type: String, default: "" },

    description: { type: String, default: "" },
    startOn: { type: Date, default: Date.now() },
    endOn: { type: Date, default: Date.now() },

    languages: { type: [{ name: String }], default: [] },
    interests: { type: [{ name: String }], default: [] },

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

    online: {
      type: { value: Boolean, link: String },
      default: { value: false, link: "" },
    },

    lng: { type: Number, default: 0, index: true },
    lat: { type: Number, default: 0, index: true },

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
  },
);

const activities = mongoose.model("Activities", schema);

export default activities;

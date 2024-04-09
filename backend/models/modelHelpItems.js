import mongoose, { Schema } from "mongoose";

const helpItemsSchema = Schema(
  {
    parentId: Schema.Types.ObjectId,
    parentType: String,
    offer: { type: Boolean, default: true },
    text: { type: String, default: "Help offered" },
    members: {
      type: [{ _id: Schema.Types.ObjectId, name: String }],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const HelpItems = mongoose.model("HelpItems", helpItemsSchema);

export default HelpItems;

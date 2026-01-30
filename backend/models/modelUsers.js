import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const usersSchema = Schema(
  {
    username: {
      type: String,
      minlength: 8,
      maxlength: 50,
      required: [true, "Please add a username"],
      unique: "Username already taken",
    },
    password: { type: String, required: [true, "Please add a password"] },
    name: { type: String, index: true, required: true },
    inviter: {
      type: Schema.Types.ObjectId,
      required: [true, "Something is terribly wrong!"],
    },
    type: { type: String, default: "member", enum: ["member", "organisation"] }, //organisation union
    description: { type: String, default: "" },

    lng: { type: Number, default: 0, index: true },
    lat: { type: Number, default: 0, index: true },

    online: { type: Boolean, default: false },
    icon: { type: String, default: "" },

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

    darkmode: { type: Boolean, default: true },
    hidden: { type: Boolean, default: false },
    archived: { type: Boolean, default: false },

    contacts: {
      type: [
        {
          _id: { type: Schema.Types.ObjectId },
          name: { type: String },
          requested: { type: Boolean, default: false },
          approved: { type: Boolean, default: false },
        },
      ],
      default: [],
    },

    members: {
      type: [
        {
          _id: { type: Schema.Types.ObjectId },
          name: { type: String },
          approved: { type: Boolean, default: false },
        },
      ],
      default: [],
    },

    organisations: {
      type: [
        {
          _id: { type: Schema.Types.ObjectId },
          name: { type: String },
          approved: { type: Boolean, default: false },
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

// Match user entered password to hashed password in database
usersSchema.methods.matchPassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

usersSchema.methods.generateToken = async function async(id) {
  return await jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// Encrypt password using bcrypt
usersSchema.pre("save", async function () {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
});

const Users = mongoose.model("Users", usersSchema);

export default Users;

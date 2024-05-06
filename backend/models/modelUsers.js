import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const usersSchema = Schema(
  {
    username: {
      type: String,
      minlength: 4,
      maxlength: 50,
      trim: true,
      required: [true, "Please add a username"],
      unique: "already exist",
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    inviter: {
      type: Schema.Types.ObjectId,
      required: [true, "Something is terribly wrong!"],
    },

    online: {
      type: Boolean,
      default: false,
    },

    type: { type: String, default: "member", enum: ["member", "organisation"] }, //organisation union
    name: { type: String, required: true },
    icon: { type: String, default: "" },
    description: { type: String, default: "" },

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

    location: {
      type: { lng: Number, lat: Number },
      default: { lng: -122.2683, lat: 37.8243 },
    },

    darkmode: { type: Boolean, default: false },
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
  }
);

// Match user entered password to hashed password in database
usersSchema.methods.matchPassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

usersSchema.methods.generateToken = async function async(id) {
  return await jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// Encrypt password using bcrypt
usersSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Users = mongoose.model("Users", usersSchema);

export default Users;

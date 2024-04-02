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
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
    },
    type: { type: String, default: "member" }, //organisation union

    name: { type: String, required: true },
    description: { type: String, default: "" },
    icon: { type: String, default: "" },

    languages: { type: [{ name: String }] },
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
    interests: { type: [{ name: String }], default: [] },
    location: {
      type: { lng: Number, lat: Number },
      default: { lng: -122.2683, lat: 37.8243 },
    },

    darkmood: { type: Boolean, default: false },
    hidden: { type: Boolean, default: false },
    archived: { type: Boolean, default: false },

    contacts: [
      {
        id: { type: Schema.Types.ObjectId },
        name: { type: String },
        approved: { type: Boolean, default: false },
      },
    ],

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

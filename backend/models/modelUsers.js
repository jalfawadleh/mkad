import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
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
    type: { type: String, default: "member" },

    name: { type: String, required: true },
    description: String,

    languages: { type: [{ name: String }], default: [] },
    help: { type: [{ name: String }], default: [] },
    tags: { type: [{ name: String }], default: [] },
    location: { type: Array, default: [-122.2683, 37.8243] },

    darkmood: { type: Boolean, default: false },
    hidden: { type: Boolean, default: false },

    contacts: [
      {
        id: { type: mongoose.Schema.Types.ObjectId },
        name: { type: String },
        approved: { type: Boolean, default: false },
      },
    ],

    organisations: [
      {
        id: mongoose.Schema.Types.ObjectId,
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
userSchema.methods.matchPassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateToken = async function async(id) {
  return await jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// Encrypt password using bcrypt
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;

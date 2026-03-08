import express from "express";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import Users from "../models/modelUsers.js";
import { protect } from "../middleware/authMiddleware.js";
import { hasText } from "../utils/validators.js";
import {
  enforceAllowedBodyKeys,
  validateBody,
  validators,
} from "../middleware/requestSchemaMiddleware.js";

// @desc    Login user & get token
// @route   POST /api/users
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const user = await Users.findOne({ username });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      type: user.type,
      lng: user.lng,
      lat: user.lat,
      darkmode: user.darkmode,
      token: await user.generateToken(user._id),
    });
  } else {
    res.status(401).send("Invalid username or password");
  }
});

// @desc    Join a new user
// @route   POST /api/users
// @access  Public
const postUser = asyncHandler(async (req, res) => {
  const { username, password, name, code } = req.body;
  if (!hasText(username) || !hasText(password) || !hasText(name) || !hasText(code)) {
    res.status(400).send("Invalid user data");
    return;
  }

  const userExists = await Users.findOne({ username });

  if (userExists) {
    res.status(409).send("Username taken!");
    return;
  }
  try {
    const decoded = jwt.verify(code, process.env.JWT_SECRET);
    if (decoded?.type !== "invitation") {
      res.status(400).send("Invitation code is not valid");
      return;
    }

    const inviter = await Users.findById(decoded.inviter);
    if (!inviter) {
      res.status(404).send("Inviter not found");
      return;
    }

    const user = await Users.create({
      username,
      password,
      name,
      inviter: inviter._id,

      lat: inviter.lat + (Math.random() - Math.random()) * 0.1,
      lng: inviter.lng + (Math.random() - Math.random()) * 0.1,

      type: inviter.name == "MKaDifference" ? "organisation" : "member",
    });

    if (user) {
      res.status(201).send(true);
      return;
    }

    res.status(400).send("Something went wrong!");
    return;
  } catch (error) {
    res.status(400).send("Invitation code is not valid");
    return;
  }
});

// @desc    Update user
// @route   PUT /api/users
// @access  Private
const putUser = asyncHandler(async (req, res) => {
  const user = await Users.findById(req.user._id);

  if (user) {
    if (
      // if old password is valid
      req.body.currentPassword !== "" &&
      (await user.matchPassword(req.body.currentPassword))
    ) {
      user.username = req.body.username || user.username;
      // password will be hashed as pre function in the users model
      if (req.body.password) user.password = req.body.password;
      user.email = req.body.email || user.email;
    } else {
      res.status(400);
      throw new Error("Invalid current password");
    }

    await user.save();
    res.json(true);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Delete User
// @route   Delete /api/users
// @access  Private
const deleteUser = asyncHandler(async (req, res) => {
  const user = await Users.deleteOne({ _id: req.user._id });
  if (user.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const users = express.Router();

users
  .route("/")
  .post(
    enforceAllowedBodyKeys(["username", "password", "name", "code", "confirmPassword", "terms"]),
    validateBody({
      username: validators.requiredString,
      password: validators.requiredString,
      name: validators.requiredString,
      code: validators.requiredString,
    }),
    postUser,
  )
  .put(
    protect,
    enforceAllowedBodyKeys([
      "_id",
      "username",
      "password",
      "confirmPassword",
      "currentPassword",
      "email",
    ]),
    validateBody({
      currentPassword: validators.requiredString,
      username: validators.optionalString,
      password: validators.optionalString,
      confirmPassword: validators.optionalString,
      email: validators.optionalString,
    }),
    putUser,
  )
  .delete(protect, deleteUser);
users.post(
  "/login",
  enforceAllowedBodyKeys(["username", "password"]),
  validateBody({
    username: validators.requiredString,
    password: validators.requiredString,
  }),
  loginUser,
);

export default users;

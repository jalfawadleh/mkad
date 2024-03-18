import express from "express";
import asyncHandler from "express-async-handler";

import Users from "../models/modelUsers.js";
import { protect } from "../middleware/authMiddleware.js";

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
      location: user.location,
      token: await user.generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid username or password");
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const postUser = asyncHandler(async (req, res) => {
  const { username, password, email, name } = req.body;

  const userExists = await Users.findOne({ username });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await Users.create({
    username,
    password,
    name,
    email,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      type: user.type,
      location: user.location,
      token: await user.generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Get user
// @route   GET /api/users
// @access  Private
const getUser = asyncHandler(async (req, res) => {
  const user = await Users.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user
// @route   PUT /api/users
// @access  Private
const putUser = asyncHandler(async (req, res) => {
  const user = await Users.findById(req.body._id);

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
  if (user) {
    res.res.status(204);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const users = express.Router();

users
  .route("/")
  .get(protect, getUser)
  .post(postUser)
  .put(protect, putUser)
  .delete(protect, deleteUser);
users.post("/login", loginUser);

export default users;

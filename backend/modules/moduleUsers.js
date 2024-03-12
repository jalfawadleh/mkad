import express from "express";
import asyncHandler from "express-async-handler";

import User from "../models/modelUsers.js";
import { protect } from "../middleware/authMiddleware.js";

// @desc    Login user & get token
// @route   POST /api/users
// @access  Public
const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
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
const post = asyncHandler(async (req, res) => {
  const { username, password, email, name } = req.body;

  const userExists = await User.findOne({ username });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    username,
    name,
    password,
    email,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: user.generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Get user
// @route   GET /api/users
// @access  Private
const get = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      description: user.description,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user
// @route   PUT /api/users
// @access  Private
const put = asyncHandler(async (req, res) => {
  const user = await User.findById(req.body._id);

  if (user) {
    if (
      req.body.currentPassword ||
      (await user.matchPassword(req.body.currentPassword))
    ) {
      user.username = req.body.username || user.username;
      if (req.body.password) user.password = req.body.password;
      user.email = req.body.email || user.email;

      user.name = req.body.name || user.name;
      user.description = req.body.description || user.description;

      await user.save();

      res.json("Updated");
    } else {
      res.status(400);
      throw new Error("Invalid current password");
    }
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const users = express.Router();

users.route("/").post(post).get(protect, get).put(protect, put);
users.post("/login", login);

export default users;

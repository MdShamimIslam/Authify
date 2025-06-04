import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const isPasswordValid = (password) => {
  return /^(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/.test(password);
};

// Signup route
export const signUpUser = async (req, res) => {
  const { username, password, shops } = req.body;

  // Check for required fields
  if (!password || !Array.isArray(shops) || shops.length < 3) {
    return res.status(400).json({
      message: "username, password and at least 3 shop names required.",
    });
  }

  // Validate password
  if (!isPasswordValid(password)) {
    return res.status(400).json({
      message:
        "Password must be at least 8 characters and contain a number and a special character.",
    });
  }

  // Check for global uniqueness of shop names
  const existingUserWithShop = await User.findOne({
    shopNames: { $in: shops },
  });

  if (existingUserWithShop) {
    return res
      .status(400)
      .json({ message: "One or more shop names already taken." });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save user
  try {
    const user = new User({
      username,
      password: hashedPassword,
      shopNames: shops,
    });
    await user.save();
    res.status(201).json({ message: "Signup successful", userId: user._id });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Login route
export const loginUser = async (req, res) => {
  const { username, password, remember } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Incorrect password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: remember ? "7d" : "30m",
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        shopNames: user.shopNames,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Login error", error: err.message });
  }
};

// Logout route
export const logoutUser = (_req, res) => {
  res.status(200).json({ message: "Logout successful" });
};

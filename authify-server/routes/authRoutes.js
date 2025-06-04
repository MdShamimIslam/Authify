import express from "express";
import {
  loginUser,
  logoutUser,
  signUpUser,
} from "../controllers/authController.js";
import { authenticateUser } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signUpUser);

router.post("/login", loginUser);

router.post("/logout", logoutUser);

router.get("/me", authenticateUser, (req, res) => {
  res.status(200).json({ user: req.user });
});

export default router;

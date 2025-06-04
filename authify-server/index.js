import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: (_origin, callback) => {
      callback(null, true);
    },
  })
);

app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/users", authRoutes);

// DB Connect
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.error("MongoDB connection failed:", error);
  }
};

await connectDB();

app.get("/", (req, res) => {
  res.send("Welcome to Authify Server");
});

app.listen(process.env.PORT, () => {
  console.log(`Authify server running on port ${process.env.PORT}`);
});

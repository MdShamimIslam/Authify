import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const authenticateUser = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1]; 

    if (!token) return res.status(401).json({ message: "Unauthorized" });
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);
      if (!user) throw new Error();
      req.user = user;
      next();
    } catch (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
  };
  

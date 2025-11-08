import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const protect = async (req, res, next) => {
  try {
    let token = req.cookies?.jwt;

    if (!token) {
      // For mock/demo purposes, create or use a default user
      let user = await User.findOne({ email: "demo@user.com" });
      if (!user) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash("demo123", salt);
        user = new User({
          name: "Demo User",
          email: "demo@user.com",
          password: hashedPassword
        });
        await user.save();
      }
      req.user = { id: user._id };
      return next();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");
    
    if (!user) {
      // Fallback to demo user if token user not found
      let demoUser = await User.findOne({ email: "demo@user.com" });
      if (!demoUser) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash("demo123", salt);
        demoUser = new User({
          name: "Demo User",
          email: "demo@user.com",
          password: hashedPassword
        });
        await demoUser.save();
      }
      req.user = { id: demoUser._id };
      return next();
    }

    req.user = { id: user._id };
    next();
  } catch (error) {
    // If token is invalid, use demo user
    try {
      let user = await User.findOne({ email: "demo@user.com" });
      if (!user) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash("demo123", salt);
        user = new User({
          name: "Demo User",
          email: "demo@user.com",
          password: hashedPassword
        });
        await user.save();
      }
      req.user = { id: user._id };
      next();
    } catch (err) {
      console.error("Error in protect middleware:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
};


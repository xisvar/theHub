/* eslint-disable no-unused-vars */
// Implement authorization middleware in middlewares/auth.middlewares.js
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../env.js";
import User from "../models/user.models.js";

export const authorize = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token)
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });

    // Decode the jwt payload
    const decoded = jwt.verify(token, JWT_SECRET);

    // Check for a user based on the payload.
    const user = await User.findById(decoded.userId);

    if (!user)
      return res.status(401).json({
        status: false,
        message: "Unauthorized",
      });

    // Attach user to the request.
    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({ status: false, message: "Unauthorized" });
  }
};

export default authorize;

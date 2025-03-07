/**
 * @fileoverview Arcjet Security Middleware for theHub
 *
 * This middleware integrates Arcjet security services into the Express request pipeline.
 * It evaluates each incoming request against configured security rules and handles
 * request denial with appropriate error responses based on the violation type.
 *
 * @module arcjetMiddleware
 * @requires ../arcjet
 */

import aj from "../arcjet.js";

/**
 * Express middleware that applies Arcjet security protections to incoming requests.
 * Evaluates requests against bot detection, rate limiting, and other security rules.
 * Denies access with appropriate status codes when security violations are detected.
 *
 * @async
 * @function arcjetMiddleware
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @param {import('express').NextFunction} next - Express next middleware function
 * @returns {Promise<void>} A promise that resolves when protection evaluation completes
 * @throws {Error} Passes any errors to Express error handler via next(error)
 */
const arcjetMiddleware = async (req, res, next) => {
  try {
    // Submit request to Arcjet for evaluation against security rules
    const decision = await aj.protect(req, { requested: 1 });

    // Check if the request should be denied based on security rules
    if (decision.isDenied()) {
      // Handle rate limiting violations
      if (decision.reason.isRateLimit()) {
        return res.status(429).json({
          success: false,
          message: "Rate Limit Exceeded",
        });
      }
      // Handle bot detection violations
      else if (decision.reason.isBot()) {
        return res.status(403).json({
          success: false,
          message: "Bot detected",
        });
      }
    }
    // Allow the request to proceed if not explicitly denied
    next();
  } catch (error) {
    // Forward any errors to the Express error handling middleware
    next(error);
  }
};

export default arcjetMiddleware;

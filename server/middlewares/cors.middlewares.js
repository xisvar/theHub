/**
 * @fileoverview CORS Configuration Middleware
 *
 * This module provides Cross-Origin Resource Sharing (CORS) configuration
 * to allow frontend applications to communicate with the API when hosted
 * on different origins (domains, protocols, or ports).
 *
 * @module corsMiddleware
 * @requires cors
 */

import cors from "cors";
import {FRONTEND_URL } from "../env.js";

/**
 * Configure and create CORS middleware based on environment
 *
 * @function
 * @returns {Function} CORS middleware configured for the current environment
 */
const corsMiddleware = () => {
  // Define allowed origins.
  const allowedOrigins = [FRONTEND_URL];

  // Return configured CORS middleware
  return cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl, etc.)
      if (!origin) return callback(null, true);

      // Check if origin is allowed
      if (allowedOrigins.indexOf(origin) === -1) {
        const message = `The CORS policy for this site does not allow access from the origin ${origin}`;
        return callback(new Error(message), false);
      }

      return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Content-Length", "X-Total-Count"],
    maxAge: 86400,
  });
};

export default corsMiddleware;

/**
 * @fileoverview API Route Dispatcher for theHub
 *
 * This module serves as the central routing configuration point for the application.
 * It imports and registers all API route groups with the Express server instance,
 * organizing endpoints under versioned namespaces.
 *
 * @module dispatcherRoutes
 * @requires ./auth.routes
 * @requires ./user.routes
 */

// Import the authentication router that handles all auth-related endpoints (sign-up, sign-in, etc.)
import authRouter from "./auth.routes.js";
// Import the user router that handles all user-related operations (profile management, user data, etc.)
import userRouter from "./user.routes.js";

/**
 * Central route dispatcher function that registers all API route groups with the Express server
 * This function serves as the main routing configuration point for the application
 *
 * @function routesDispatcher
 * @param {import('express').Application} server - The Express server instance to which routes will be attached
 * @returns {void}
 *
 * @example
 * // In server.js
 * import express from "express";
 * import routesDispatcher from "./routes/dispatcher.routes.js";
 *
 * const app = express();
 * routesDispatcher(app);
 */
const routesDispatcher = (server) => {
  // Register authentication routes under the '/api/v1/auth' base path
  // This will handle endpoints like /api/v1/auth/sign-in, /api/v1/auth/sign-up, etc.
  server.use(`/api/v1/auth`, authRouter);

  // Register user management routes under the '/api/v1/user' base path
  // This will handle endpoints like /api/v1/user/profile, /api/v1/user/settings, etc.
  server.use(`/api/v1/user`, userRouter);

  // NOTE: Missing leading slash in path definitions - should be `/api/v1/auth` and `/api/v1/user`
  // Current implementation may cause routing issues as Express expects paths to start with '/'
};

// Export the dispatcher function to be used in the main server setup
export default routesDispatcher;

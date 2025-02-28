/**
 * @fileoverview User Management Routes for theHub API
 *
 * This module defines the user-related API endpoints, including user profile retrieval,
 * account deletion, and profile updates. It leverages Express Router to organize
 * routes and connects them to their corresponding controller functions.
 *
 * @module userRoutes
 * @requires express
 * @requires ../controllers/user.controllers
 */

import { Router } from "express";
import userModes from "../controllers/user.controllers.js";

/**
 * Express router instance for user management routes
 * @type {import('express').Router}
 */
const userRouter = Router();

/**
 * Route for retrieving user information
 * Gets user profile data based on the user ID parameter
 *
 * @name GET /api/v1/user/:id
 * @function
 * @memberof module:userRoutes
 */
userRouter.get("/:id", userModes["get user"]);

/**
 * Route for deleting a user account
 * Permanently removes a user account and associated data
 *
 * @name DELETE /api/v1/user/:id
 * @function
 * @memberof module:userRoutes
 * @todo Add authorization middleware to protect this route
 */
userRouter.delete("/:id", userModes["delete user"]);

/**
 * Route for updating user profile information
 * Modifies user data such as username, bio, skills, or profile picture
 *
 * @name PUT /api/v1/user/:id
 * @function
 * @memberof module:userRoutes
 * @todo Add authorization middleware to protect this route
 */
userRouter.put("/:id", userModes["update user profile"]);

export default userRouter;

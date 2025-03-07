/**
 * @fileoverview User Management Routes for theHub API
 *
 * This module defines user-related API endpoints with mixed access levels:
 * - Public routes for viewing profiles and searching users
 * - Protected routes for account management and social interactions
 *
 * @module userRoutes
 * @requires express
 * @requires ../controllers/user.controllers
 * @requires ../middlewares/auth.middlewares.js
 */

import { Router } from "express";
import userModes from "../controllers/user.controllers.js";
import authorize from "../middlewares/auth.middlewares.js";

/**
 * Express router instance for user management routes
 * @type {import('express').Router}
 */
const userRouter = Router();

// PUBLIC ROUTES (No authentication required)

/**
 * Route for searching users by username or other criteria
 * Returns limited public information about matching users
 *
 * @name GET /api/v1/user/search
 * @function
 * @memberof module:userRoutes
 */
userRouter.get("/search/:username", userModes["search users"]);

/**
 * Route for retrieving public user profile information
 * Gets public-facing user profile data for any user
 *
 * @name GET /api/v1/user/:id
 * @function
 * @memberof module:userRoutes
 */
userRouter.get("/:id", userModes["get public user profile"]);

// PROTECTED ROUTES (Authentication required)

/**
 * Route for retrieving current user's complete information
 * Gets full profile data for the authenticated user
 *
 * @name GET /api/v1/user/me
 * @function
 * @memberof module:userRoutes
 * @requires Authentication
 */
userRouter.get("/me", authorize, userModes["get user"]);

/**
 * Route for deleting current user's account
 * Permanently removes user account and associated data
 *
 * @name DELETE /api/v1/user/me
 * @function
 * @memberof module:userRoutes
 * @requires Authentication
 */
userRouter.delete("/me", authorize, userModes["delete user"]);

/**
 * Route for updating current user's profile
 * Modifies user data such as username, bio, skills, or profile picture
 *
 * @name PUT /api/v1/user/me
 * @function
 * @memberof module:userRoutes
 * @requires Authentication
 */
userRouter.put("/me", authorize, userModes["update user profile"]);

// SOCIAL INTERACTION ROUTES (Authentication required)

/**
 * Route for following another user
 * Creates a follow relationship between current user and target user
 *
 * @name POST /api/v1/user/:id/follow
 * @function
 * @memberof module:userRoutes
 * @requires Authentication
 */
userRouter.post("/:id/follow", authorize, userModes["follow user"]);

/**
 * Route for unfollowing another user
 * Removes a follow relationship between current user and target user
 *
 * @name DELETE /api/v1/user/:id/follow
 * @function
 * @memberof module:userRoutes
 * @requires Authentication
 */
userRouter.delete("/:id/follow", authorize, userModes["unfollow user"]);

/**
 * Route for retrieving current user's followers
 * Returns list of users who follow the authenticated user
 *
 * @name GET /api/v1/user/me/followers
 * @function
 * @memberof module:userRoutes
 * @requires Authentication
 */
userRouter.get("/me/followers", authorize, userModes["get followers"]);

/**
 * Route for retrieving users followed by current user
 * Returns list of users that the authenticated user follows
 *
 * @name GET /api/v1/user/me/following
 * @function
 * @memberof module:userRoutes
 * @requires Authentication
 */
userRouter.get("/me/following", authorize, userModes["get following"]);

export default userRouter;

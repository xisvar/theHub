/**
 * @fileoverview Authentication Routes for theHub API
 *
 * This module defines the authentication-related API endpoints, including user registration,
 * login, OAuth integration, and session management. It leverages Express Router to organize
 * routes and connects them to their corresponding controller functions.
 *
 * @module authRoutes
 * @requires express
 * @requires ../controllers/auth.controllers
 */

import { Router } from "express";
import authModes from "../controllers/auth.controllers.js";

/**
 * Express router instance for authentication routes
 * @type {import('express').Router}
 */
const authRouter = Router();

/**
 * Route for user registration
 * Creates a new user account with email and password
 *
 * @name POST /api/v1/auth/sign-up
 * @function
 * @memberof module:authRoutes
 */
authRouter.post("/sign-up", authModes["sign-up"]);

/**
 * Route for user login
 * Authenticates user credentials and provides access token
 *
 * @name POST /api/v1/auth/sign-in
 * @function
 * @memberof module:authRoutes
 */
authRouter.post("/sign-in", authModes["sign-in"]);

/**
 * Route for Google OAuth registration/login
 * Handles authentication via Google identity services
 *
 * @name POST /api/v1/auth/google-sign-up
 * @function
 * @memberof module:authRoutes
 */
authRouter.post("/google-sign-up", authModes["google-sign-up"]);

/**
 * Route for user logout
 * Terminates the user session and invalidates tokens
 *
 * @name POST /api/v1/auth/sign-out
 * @function
 * @memberof module:authRoutes
 * @todo Add authorization middleware to protect this route
 */
authRouter.post("/sign-out", authModes["sign-out"]);

export default authRouter;

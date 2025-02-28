/**
 * @fileoverview Environment Configuration Module
 *
 * This module handles loading and exporting environment variables for theHub application.
 * It uses dotenv to load environment-specific configuration from local environment files
 * based on the current NODE_ENV setting.
 *
 * @module env
 * @requires dotenv
 */

import { config } from "dotenv";

/**
 * Configure dotenv to read the environment-specific .env file
 * The path is determined dynamically based on the current NODE_ENV value
 * Falls back to "development" if NODE_ENV is not specified
 */
config({
  // eslint-disable-next-line no-undef
  path: `./config/.env.${process.env.NODE_ENV || "development"}.locals`,
});

/**
 * Export environment variables for use throughout the application
 * @property {string} PORT - The port number the server will listen on
 * @property {string} DB_URI - MongoDB connection string
 * @property {string} NODE_ENV - Current environment (development, production, etc.)
 * @property {string} JWT_SECRET - Secret key used for JWT token signing/verification
 * @property {string} JWT_EXPIRES_IN - JWT token expiration time (e.g., "1d" for one day)
 * @property {string} GOOGLE_CLIENT_ID - OAuth client ID for Google authentication
 * @property {string} FRONTEND_URL - The URL for the front end, allowing CORS
 */
export const {
  PORT,
  DB_URI,
  NODE_ENV,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  GOOGLE_CLIENT_ID,
  FRONTEND_URL
  // eslint-disable-next-line no-undef
} = process.env;

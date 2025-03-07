/**
 * @fileoverview Server Entry Point for theHub Application
 *
 * This module serves as the main entry point for theHub's server application.
 * It configures the Express server with necessary middleware, sets up routes,
 * error handling, and initializes the clustering system for improved performance.
 *
 * The server uses a modular architecture with separate routes, controllers, and
 * middleware components to maintain clean separation of concerns.
 *
 * @module server
 * @requires express
 * @requires cookie-parser
 * @requires body-parser
 * @requires helmet
 * @requires ./env
 * @requires ./cluster
 * @requires ./routes/dispatcher.routes
 * @requires ./middlewares/error.middlewares
 * @requires ./databases/mongodb.databases
 */

// Import necessary NPM modules and dependencies
import express from "express"; // Express.js framework for building the web server
import cookieParser from "cookie-parser"; // Middleware to parse cookies from requests
import bodyParser from "body-parser"; // Middleware to parse JSON and URL-encoded bodies
import helmet from 'helmet'; // Import the helmet security middleware.
import { PORT } from "./env.js"; // Import server port from environment configuration
import setupCluster from "./cluster.js"; // Import function to set up Node.js clustering for better performance
import routesDispatcher from "./routes/dispatcher.routes.js"; // Import route configuration function
import corsMiddleware from "./middlewares/cors.middlewares.js"; // Import middleware for CORS



/**
 * Express application instance
 * This creates the primary server instance that will handle all HTTP requests
 * @type {import('express').Application}
 */
let server = express();

// Configure and attach middleware to process requests
// The order of middleware is important as they execute sequentially

/**
 * Middleware Configuration
 *
 * The following middleware stack processes incoming requests in sequence:
 * 1. JSON body parsing for API requests
 * 2. URL-encoded form data parsing
 * 3. Cookie parsing
 * 4. Route dispatching
 * 5. Error handling (must be last)
 */

// Apply CORS middleware
server.use(corsMiddleware());

// Apply Helmet security middleware for enhanced security headers
server.use(helmet());

// Parse JSON request bodies (express built-in middleware)
// This handles Content-Type: application/json requests
server.use(express.json());

// Parse JSON request bodies (body-parser middleware)
// This is technically redundant with express.json() in modern Express versions
// Could be removed as express.json() now uses body-parser internally
server.use(bodyParser.json());

// Parse URL-encoded request bodies (express built-in middleware)
// This handles form submissions (Content-Type: application/x-www-form-urlencoded)
// extended: false means the values can be string or array only
server.use(express.urlencoded({ extended: false }));

// Parse cookies from request headers
// Makes cookies available in req.cookies object for route handlers
server.use(cookieParser());

// Use the Arcjet Middleware for rate Limiting and bot detection.
import arcjetMiddleware from "./middlewares/arcjet.middlewares.js";
server.use(arcjetMiddleware);

// Register all application routes via the route dispatcher
// This adds all API endpoints to the server, organized by feature area
routesDispatcher(server);

// Import and add error handling middleware
// This must come AFTER all routes are registered to catch errors from them
import errorHandler from "./middlewares/error.middlewares.js";
server.use(errorHandler);

/**
 * Server Initialization
 *
 * Set up server clustering for performance optimization.
 * This distributes incoming connections among multiple worker processes.
 * Each worker runs on a separate CPU core for better performance and reliability.
 *
 * When setupCluster is called, it will either:
 * 1. Create worker processes if this is the master process, or
 * 2. Start the Express server listening on the specified port if this is a worker
 */
setupCluster(server, PORT);

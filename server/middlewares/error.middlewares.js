/**
 * @fileoverview Error Handling Middleware
 *
 * This module provides centralized error handling for theHub API.
 * It processes errors thrown in route handlers and middleware,
 * formats them consistently, and sends appropriate HTTP responses.
 *
 * Common error scenarios are detected and handled with specific
 * status codes and messages to provide clear feedback to API clients.
 *
 * @module errorMiddleware
 * @requires express
 */

/**
 * Express error handling middleware
 *
 * This middleware catches and processes all errors passed to Express's
 * error handling chain. It standardizes error responses and handles
 * specific error types with appropriate status codes.
 *
 * @function errorMiddleware
 * @param {Error} err - The error object passed from previous middleware or route handlers
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @param {import('express').NextFunction} next - Express next middleware function
 * @returns {void}
 *
 * @example
 * // In server.js after all route registrations:
 * import errorMiddleware from './middlewares/error.middlewares.js';
 * app.use(errorMiddleware);
 */
const errorMiddleware = (err, req, res, next) => {
  try {
    let error = {
      message: err.message,
      status: err.status || 500,
      stack: err.stack,
    };

    // Log the error to the console.
    console.error(error);

    switch (err.name) {
      case "ValidationError":
        error.message = err.errors;
        error.status = 400;
        break;
      case "CastError":
        error.message = `Resource not found with id of ${err.value}`;
        error.status = 404;
        break;
      default:
        break;
    }

    switch (err.code) {
      case 11000:
        error.message = "Duplicate field value entered";
        error.status = 400;
        break;
      default:
        break;
    }

    res.status(error.status).json({
      success: false,
      message: error.message,
    });
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;

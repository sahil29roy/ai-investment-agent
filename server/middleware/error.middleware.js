/**
 * @file error.middleware.js
 * @description Express global error handling middleware.
 */

import { logger } from '../utils/logger.js';

/**
 * Express error handling middleware.
 * Catches all thrown or next-passed errors.
 * 
 * @param {Error} err - The error object.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {function} next - Express next middleware function.
 * @returns {object} The JSON error response.
 */
export function errorHandler(err, req, res, next) {
  const isDev = process.env.NODE_ENV !== 'production';

  // Log the error internally
  logger.error(err.stack || err.message);

  let statusCode = err.status || err.statusCode || 500;
  let message = err.message || 'Something went wrong';
  let errorPayload = {};

  // Handle Zod validation errors gracefully
  if (err.name === 'ZodError' || err.issues) {
    statusCode = 400;
    message = 'Validation failed';
    errorPayload = {
      issues: err.issues || err.errors || [],
    };
  } else {
    errorPayload = {
      message: err.message || 'Internal Server Error',
    };
  }

  // Include stack trace only in development
  if (isDev) {
    errorPayload.stack = err.stack;
  }

  return res.status(statusCode).json({
    success: false,
    message,
    error: errorPayload,
  });
}

export default errorHandler;

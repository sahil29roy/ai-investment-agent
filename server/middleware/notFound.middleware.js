/**
 * @file notFound.middleware.js
 * @description Catch-all middleware for handling non-existent Express routes.
 */

/**
 * Express middleware for unmatched routes (404 Not Found).
 * 
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {function} next - Express next middleware function.
 * @returns {object} The JSON 404 response.
 */
export function notFoundHandler(req, res, next) {
  return res.status(404).json({
    success: false,
    message: 'Route not found',
  });
}

export default notFoundHandler;

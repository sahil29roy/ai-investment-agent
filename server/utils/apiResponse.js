/**
 * @file apiResponse.js
 * @description Standardized API response utilities for controllers.
 */

/**
 * Standard Success Response (200 OK).
 * 
 * @param {object} res - Express response object.
 * @param {*} data - Payload to send.
 * @param {string} message - Descriptive success message.
 * @returns {object} Express JSON response.
 */
export function success(res, data, message = 'Operation completed successfully') {
  return res.status(200).json({
    success: true,
    message,
    data,
  });
}

/**
 * Standard Created Response (201 Created).
 * 
 * @param {object} res - Express response object.
 * @param {*} data - Created payload.
 * @param {string} message - Success message.
 * @returns {object} Express JSON response.
 */
export function created(res, data, message = 'Resource created successfully') {
  return res.status(201).json({
    success: true,
    message,
    data,
  });
}

/**
 * Standard Bad Request Response (400 Bad Request).
 * 
 * @param {object} res - Express response object.
 * @param {string} message - Reason for bad request.
 * @param {*} [error=null] - Error details/issues.
 * @returns {object} Express JSON response.
 */
export function badRequest(res, message = 'Bad request', error = null) {
  const payload = {
    success: false,
    message,
  };
  if (error !== null) {
    payload.error = error;
  }
  return res.status(400).json(payload);
}

/**
 * Standard Not Found Response (404 Not Found).
 * 
 * @param {object} res - Express response object.
 * @param {string} message - Description of the missing resource.
 * @returns {object} Express JSON response.
 */
export function notFound(res, message = 'Resource not found') {
  return res.status(404).json({
    success: false,
    message,
  });
}

/**
 * Standard Server Error Response (500 Internal Server Error).
 * 
 * @param {object} res - Express response object.
 * @param {string} message - Error explanation.
 * @param {*} [error=null] - Raw exception/error data.
 * @returns {object} Express JSON response.
 */
export function serverError(res, message = 'Internal server error', error = null) {
  const payload = {
    success: false,
    message,
  };
  if (error !== null) {
    payload.error = error;
  }
  return res.status(500).json(payload);
}

export default {
  success,
  created,
  badRequest,
  notFound,
  serverError,
};

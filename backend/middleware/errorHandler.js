const multer = require('multer');

module.exports = function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    next(err);
    return;
  }

  let status = err.status || 500;
  let message = err.message || 'Something went wrong.';
  let details = err.details;

  if (err instanceof multer.MulterError) {
    status = 400;

    if (err.code === 'LIMIT_FILE_SIZE') {
      message = 'Each image must be 5MB or smaller.';
    } else if (err.code === 'LIMIT_FILE_COUNT') {
      message = 'You can upload up to 10 images per property.';
    } else {
      message = 'There was a problem processing the uploaded images.';
    }
  }

  if (err.name === 'ValidationError') {
    status = 400;
    message = 'Property validation failed.';
    details = Object.fromEntries(
      Object.entries(err.errors || {}).map(([key, value]) => [key, value.message])
    );
  }

  if (err.name === 'CastError') {
    status = 400;
    message = 'The requested resource id is invalid.';
  }

  const payload = { 
    error: message,
    message: message 
  };

  if (details) {
    payload.details = details;
  }

  if (status >= 500 && process.env.NODE_ENV !== 'production') {
    payload.stack = err.stack;
  }

  res.status(status).json(payload);
};

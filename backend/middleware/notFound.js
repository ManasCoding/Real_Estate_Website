const createHttpError = require('../utils/httpError');

module.exports = function notFound(req, res, next) {
  next(
    createHttpError(404, `Route ${req.method} ${req.originalUrl} was not found.`)
  );
};

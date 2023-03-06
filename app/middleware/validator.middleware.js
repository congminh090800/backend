module.exports = function (schema, type) {
  return function (req, res, next) {
    type = type || "body";
    const result = schema.validate(req[type]);

    if (result.error) {
      const err = {
        details: result.error.details,
      };

      return res.badRequest(null, "BAD_PARAMETERS", err);
    }
    next();
  };
};

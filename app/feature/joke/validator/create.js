const Joi = require("joi");
const schema = Joi.object().keys({
  content: Joi.string().max(5000).required(),
  created_by: Joi.string().max(255).optional(),
});

module.exports = schema;

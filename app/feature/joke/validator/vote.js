const Joi = require("joi");
const schema = Joi.object().keys({
  vote: Joi.boolean().required(),
});

module.exports = schema;

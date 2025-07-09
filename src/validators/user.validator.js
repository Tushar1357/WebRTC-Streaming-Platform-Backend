const Joi = require("joi");

const create_user_schema = Joi.object({
  first_name: Joi.string().alphanum().min(2).max(24).required(),
  last_name: Joi.string().alphanum().min(2).max(24),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  username: Joi.string().alphanum().min(5).required(),
});

const verify_user_schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
})

module.exports = {create_user_schema,verify_user_schema};

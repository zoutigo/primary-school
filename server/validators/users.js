const Joi = require("@hapi/joi");

module.exports.emailValidator = (data) => {
  let schema = Joi.object({
    email: Joi.string().email().required(),
  });
  return schema.validate(data);
};
module.exports.passwordValidator = (data) => {
  let schema = Joi.object({
    password: Joi.string()
      .required()
      .pattern(new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$")), // 1 majuscule, 1 minuscule, 1 chiffre, 8 caracteres mini
  });
  return schema.validate(data);
};
module.exports.roleValidator = (data) => {
  let schema = Joi.object({
    role: Joi.string()
      .required()
      .valid("parent", "teatcher", "moderator", "admin"),
  });
  return schema.validate(data);
};

// register validation
module.exports.registerValidator = (data) => {
  let schema = Joi.object({
    name: Joi.string().required().min(3),
    firstname: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .required()
      .pattern(new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$")), // 1 majuscule, 1 minuscule, 1 chiffre, 8 caracteres mini
    role: Joi.string()
      .required()
      .valid("parent", "teatcher", "moderator", "admin"),
    createdAt: Joi.date(),
  });

  return schema.validate(data);
};

// login validator
module.exports.loginValidator = (data) => {
  let schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  return schema.validate(data);
};

module.exports.emailValidator = (data) => {
  let schema = Joi.object({
    email: Joi.string().required().email(),
  });

  return schema.validate(data);
};

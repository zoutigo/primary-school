const Joi = require("@hapi/joi");

module.exports.rubricNameValidator = (data) => {
  let schema = Joi.object({
    rubric_name: Joi.string().required().min(3).max(20),
  });
  return schema.validate(data);
};

module.exports.rubricCategoriesValidator = (data) => {
  let schema = Joi.object({
    rubric_categories: Joi.array().items(Joi.string()),
  });

  return schema.validate(data);
};

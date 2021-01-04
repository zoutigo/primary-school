const Joi = require("@hapi/joi");

module.exports.paperTypeValidator = (data) => {
  let schema = Joi.object({
    paper_type: Joi.string()
      .required()
      .valid("article", "news", "event", "important"),
  });
  return schema.validate(data);
};

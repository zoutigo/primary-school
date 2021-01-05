const Joi = require("@hapi/joi");

module.exports.paperTypeValidator = (data) => {
  let schema = Joi.object({
    paper_type: Joi.string()
      .required()
      .valid("article", "news", "event", "important"),
  });
  return schema.validate(data);
};

module.exports.paperContentValidator = (data) => {
  let schema = Joi.object({
    paper_content: Joi.string().required().min(10).max(20000),
  });
  return schema.validate(data);
};

module.exports.paperStatusValidator = (data) => {
  let schema = Joi.object({
    paper_status: Joi.string()
      .required()
      .valid("draft", "undervalidation", "released"),
  });
  return schema.validate(data);
};
module.exports.paperTitleValidator = (data) => {
  let schema = Joi.object({
    paper_title: Joi.string().required().min(3).max(100),
  });
  return schema.validate(data);
};

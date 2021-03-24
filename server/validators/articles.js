const Joi = require("joi");

module.exports.createArticleValidator = (data) => {
  let schema = Joi.object({
    title: Joi.string().required().min(5),
    category: Joi.string().required().valid("news", "information", "activity"),
    target: Joi.string().required().valid("classroom", "school", "public"),
    content: Joi.string().required(),
    modelArticle: Joi.string().required().valid("A", "B", "C", "D", "E"),
    status: Joi.string()
      .required()
      .valid("draft", "undervalidation", "released"),
  });

  return schema.validate(data);
};

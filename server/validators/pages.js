const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

module.exports.pageValidator = (data) => {
  switch (Object.keys(data)[0]) {
    case "id":
      let idSchema = Joi.object({
        id: Joi.objectId(),
      });
      return idSchema.validate(data);
    case "text":
      let textSchema = Joi.object({
        text: Joi.string().required().min(3).max(50000),
      });
      return textSchema.validate(data);
    case "alias":
      let aliasSchema = Joi.object({
        alias: Joi.string().required().min(3).max(30),
      });
      return aliasSchema.validate(data);
    case "title":
      let titleSchema = Joi.object({
        title: Joi.string().required().min(3).max(30),
      });
      return titleSchema.validate(data);

    default:
      break;
  }
};

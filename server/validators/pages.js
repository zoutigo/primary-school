const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

module.exports.pageValidator = (datas) => {
  const validator = (data) => {
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
      case "status":
        let statusSchema = Joi.object({
          status: Joi.string()
            .required()
            .valid("draft", "undervalidation", "released"),
        });
        return statusSchema.validate(data);

      default:
        break;
    }
  };

  const errorsList = datas.map((data) => {
    if (data) {
      const { error } = validator(data);
      if (error) return error.details[0].message;
    }
  });
  const errors = errorsList.filter((error) => error !== undefined);

  return errors;
};

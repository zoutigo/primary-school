const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

module.exports.fileValidator = (datas) => {
  const validator = (data) => {
    switch (Object.keys(data)[0]) {
      case "id":
        let idSchema = Joi.object({
          id: Joi.objectId(),
        });
        return idSchema.validate(data);

      case "title":
        let titleSchema = Joi.object({
          title: Joi.string().required().min(3).max(100),
        });
        return titleSchema.validate(data);

      case "type":
        let typeSchema = Joi.object({
          type: Joi.string()
            .required()
            .valid("menu", "newsletter", "document", "image"),
        });
        return typeSchema.validate(data);

      case "description":
        let descriptionSchema = Joi.object({
          description: Joi.string().required().min(3).max(500),
        });
        return descriptionSchema.validate(data);

      case "url":
        let urlSchema = Joi.object({
          url: Joi.string().required().min(3).max(500),
        });
        return urlSchema.validate(data);

      case "date":
        let dateSchema = Joi.object({
          date: Joi.required().date().timestamp().greater(Date.now()),
        });
        return dateSchema.validate(data);

      case "validweek":
        let validweekSchema = Joi.object({
          validweek: Joi.string().required().min(3).max(500),
        });
        return validweekSchema.validate(data);

      case "author":
        let authorSchema = Joi.object({
          author: Joi.objectId(),
        });
        return authorSchema.validate(data);

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

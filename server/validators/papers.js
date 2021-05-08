const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

module.exports.paperValidator = (datas) => {
  const validator = (data) => {
    switch (Object.keys(data)[0]) {
      case "type":
        let typeSchema = Joi.object({
          type: Joi.string()
            .required()
            .valid(
              "article",
              "activity",
              "parent-info",
              "newsletter",
              "menu",
              "breve"
            ),
        });
        return typeSchema.validate(data);

      case "file":
        let fileSchema = Joi.object({
          file: Joi.string().required(),
        });
        return fileSchema.validate(data);

      case "startdate":
        let startdateSchema = Joi.object({
          startdate: Joi.date().timestamp().greater(Date.now()),
        });
        return startdateSchema.validate(data);

      case "enddate":
        let enddateSchema = Joi.object({
          enddate: Joi.date().timestamp().greater(Date.now()),
        });
        return enddateSchema.validate(data);

      case "title":
        let titleSchema = Joi.object({
          title: Joi.string().required().min(3).max(100),
        });
        return titleSchema.validate(data);

      case "text":
        let textSchema = Joi.object({
          text: Joi.string().required().min(3).max(200000),
        });
        return textSchema.validate(data);

      case "status":
        let statusSchema = Joi.object({
          status: Joi.string()
            .required()
            .valid("draft", "undervalidation", "released"),
        });
        return statusSchema.validate(data);

      case "entity":
        let entitySchema = Joi.object({
          entity: Joi.string()
            .required()
            .valid(
              "direction",
              "apel",
              "ogec",
              "ps",
              "ms",
              "gs",
              "cp",
              "ce1",
              "ce2",
              "cm1"
            ),
        });
        return entitySchema.validate(data);

      case "id":
        let idSchema = Joi.object({
          id: Joi.objectId(),
        });
        return idSchema.validate(data);
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

const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const now = new Date().getTime();

module.exports.eventValidator = (datas) => {
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

      case "place":
        let placeSchema = Joi.object({
          place: Joi.string().required().min(3).max(100),
        });
        return placeSchema.validate(data);

      case "description":
        let descriptionSchema = Joi.object({
          description: Joi.string().required().min(3).max(500),
        });
        return descriptionSchema.validate(data);

      case "date":
        let dateSchema = Joi.object({
          date: Joi.date().timestamp("javascript").min(new Date().getTime()),
        });
        return dateSchema.validate(data);

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

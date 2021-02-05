const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

module.exports.rubricValidator = (data) => {
  switch (Object.keys(data)[0]) {
    case "id":
      let idSchema = Joi.object({
        id: Joi.objectId(),
      });
      return idSchema.validate(data);
    case "name":
      let nameSchema = Joi.object({
        name: Joi.string().required().min(3).max(20),
      });
      return nameSchema.validate(data);

    case "categories":
      let categorySchema = Joi.object({
        categories: Joi.array().items(Joi.objectId()),
      });
      return categorySchema.validate(data);

    default:
      break;
  }
};

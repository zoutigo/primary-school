const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

module.exports.rubricValidator = (data) => {
  switch (Object.keys(data)[0]) {
    case "rubric_name":
      let schemaName = Joi.object({
        name: Joi.string().required().min(3).max(20),
      });
      return schemaName.validate(data);

    case "rubric_categories":
      let schema = Joi.object({
        rubric_categories: Joi.array().items(Joi.objectId()),
      });
      return schema.validate(data);

    default:
      break;
  }
};

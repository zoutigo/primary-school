const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

module.exports.categoryValidator = (data) => {
  switch (Object.keys(data)[0]) {
    case "name":
      let schemaName = Joi.object({
        name: Joi.string().required().min(3).max(20),
      });
      return schemaName.validate(data);
    case "chapters":
      let schemaChapters = Joi.object({
        chapters: Joi.array().items(Joi.objectId()),
      });
      return schemaChapters.validate(data);

    default:
      return null;
  }
};

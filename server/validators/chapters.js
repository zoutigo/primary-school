const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

module.exports.chapterValidator = (data) => {
  switch (Object.keys(data)[0]) {
    case "name":
      let schemaName = Joi.object({
        name: Joi.required().string().min(3).max(30),
      });
      return schemaName.validate(data);

    default:
      return null;
  }
};

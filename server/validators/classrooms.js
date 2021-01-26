const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

module.exports.classroomNameValidator = (data) => {
  let schema = Joi.object({
    name: Joi.string().required().min(10).max(30),
  });
  return schema.validate(data);
};
module.exports.classroomAliasValidator = (data) => {
  let schema = Joi.object({
    alias: Joi.string()
      .required()
      .valid("ps", "ms", "gs", "ce1", "ce2", "cm1", "cm2"),
  });
  return schema.validate(data);
};

module.exports.classroomValidator = (data) => {
  switch (Object.keys(data)[0]) {
    case "name":
      let schemaName = Joi.object({
        name: Joi.string().required().min(10).max(30),
      });
      return schemaName.validate(data);

    case "teacher":
      let schemaTeacher = Joi.object({
        teacher: Joi.objectId(),
      });
      return schemaTeacher.validate(data);
    case "helper":
      let schemaHelper = Joi.object({
        helper: Joi.objectId(),
      });
      return schemaHelper.validate(data);

    default:
      return null;
  }
};

const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);
const { BadRequest } = require("../utils/errors");

module.exports.userValidator = (data) => {
  switch (Object.keys(data)[0]) {
    case "id":
      let schemaId = Joi.object({
        id: Joi.objectId(),
      });
      return schemaId.validate(data);
    case "email":
      let schemaEmail = Joi.object({
        email: Joi.string().required().email(),
      });
      return schemaEmail.validate(data);

    case "password":
      let schemaPassword = Joi.object({
        password: Joi.string()
          .required()
          .pattern(new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$")), // 1 majuscule, 1 minuscule, 1 chiffre, 8 caracteres mini
      });
      return schemaPassword.validate(data);

    case "name":
      let schemaName = Joi.object({
        name: Joi.string().required().min(3).max(20),
      });
      return schemaName.validate(data);

    case "firstname":
      let schemaFirstname = Joi.object({
        firstname: Joi.string().required().min(3).max(20),
      });
      return schemaFirstname.validate(data);

    case "roles":
      let schemaRoles = Joi.object({
        roles: Joi.array().items(Joi.objectId()),
      });
      return schemaRoles.validate(data);

    case "grade":
      let schemaGrade = Joi.object({
        grade: Joi.string().required().valid("admin", "manager", "moderator"),
      });
      return schemaGrade.validate(data);
      break;

    default:
      return next(new BadRequest("missing data to validate"));
  }
};

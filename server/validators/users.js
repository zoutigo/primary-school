const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const { BadRequest } = require("../utils/errors");

module.exports.userValidator = (data) => {
  switch (Object.keys(data)[0]) {
    case "id":
      let idSchema = Joi.object({
        id: Joi.objectId(),
      });
      return idSchema.validate(data);
    case "email":
      let emailSchema = Joi.object({
        email: Joi.string().required().email(),
      });
      return emailSchema.validate(data);

    case "password":
      let passwordSchema = Joi.object({
        password: Joi.string()
          .required()
          .pattern(new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$")), // 1 majuscule, 1 minuscule, 1 chiffre, 8 caracteres mini
      });
      return passwordSchema.validate(data);

    case "name":
      let nameSchema = Joi.object({
        name: Joi.string().required().min(3).max(20),
      });
      return nameSchema.validate(data);

    case "firstname":
      let firstnameSchema = Joi.object({
        firstname: Joi.string().required().min(3).max(20),
      });
      return firstnameSchema.validate(data);

    case "roles":
      let rolesSchema = Joi.object({
        roles: Joi.array().items(Joi.objectId()),
      });
      return rolesSchema.validate(data);

    case "grade":
      let gradeSchema = Joi.object({
        grade: Joi.string().required().valid("admin", "manager", "moderator"),
      });
      return gradeSchema.validate(data);
      break;
    case "gender":
      let genderSchema = Joi.object({
        gender: Joi.string().required().valid("monsieur", "madame"),
      });
      return genderSchema.validate(data);
      break;

    default:
      return next(new BadRequest("missing data to validate"));
  }
};

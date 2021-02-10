const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

module.exports.roleValidator = (data) => {
  switch (Object.keys(data)[0]) {
    case "name":
      let nameSchema = Joi.object({
        name: Joi.string().required().min(3).max(20),
      });
      return nameSchema.validate(data);

    default:
      break;
  }
};

// .valid(
//   "Les parents",
//   "Les enseignants",
//   "La direction",
//   "secretariat-comptabilité",
//   "personnel de cantine",
//   "aides maternelles"
// ),

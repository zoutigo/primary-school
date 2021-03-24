const Joi = require("joi");
module.exports.studentsCreationValidator = (data) => {
  let schema = Joi.object({
    name: Joi.string().required().min(2).max(30),
    fisrtname: Joi.string().required().min(2).max(30),
    dateOfBirth: Joi.Date().required(),
    classroom: Joi.string().required(true),
    // Verfier comment demander une valeur au minimum dans le array des parents
  });
  return schema.validate(data);
};

module.exports.studentsUpdateValidator = (data) => {
  let schema = Joi.object({
    // update sur a classroom et sur le parent uniquement
    // Verfier comment demander une valeur au minimum dans le array des parents
  });
  return schema.validate(data);
};

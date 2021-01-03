const Joi = require("@hapi/joi");

module.exports.categoryNameValidator = (data) => {
  let schema = Joi.object({
    category_name: Joi.required().string().min(3).max(30),

    // see how to manage arrays for updates, comments, images and mediapaths
  });
  return schema.validate(data);
};

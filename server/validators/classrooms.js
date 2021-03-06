const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);
const SanitizeHtml = require("sanitize-html");

const htmlJoi = Joi.extend((joi) => {
  return {
    type: "string",
    base: joi.string(),
    rules: {
      htmlStrip: {
        validate(value) {
          return SanitizeHtml(value);
        },
      },
    },
  };
});

module.exports.classroomValidator = (data) => {
  switch (Object.keys(data)[0]) {
    case "name":
      let nameSchema = Joi.object({
        name: Joi.string().required().min(2).max(30),
      });
      return nameSchema.validate(data);
    case "alias":
      let aliasSchema = Joi.object({
        alias: Joi.string()
          .required()
          .valid("ps", "ms", "gs", "cp", "ce1", "ce2", "cm1", "cm2"),
      });
      return aliasSchema.validate(data);

    case "summary":
      let summarySchema = Joi.object({
        summary: htmlJoi.string().required().htmlStrip().min(10).max(500),
      });
      return summarySchema.validate(data);
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
    case "images":
      let schemaImages = Joi.object({
        images: Joi.array().items(
          Joi.object({
            // Object schema
          })
        ),
      });
      return schemaImages.validate(data);
    case "albums":
      let schemaAlbums = Joi.object({
        albums: Joi.objectId(),
      });
      return schemaAlbums.validate(data);

    default:
      return null;
  }
};

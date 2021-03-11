const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

module.exports.paperTypeValidator = (data) => {
  let schema = Joi.object({
    paper_type: Joi.string()
      .required()
      .valid("article", "news", "event", "important"),
  });
  return schema.validate(data);
};

module.exports.paperContentValidator = (data) => {
  let schema = Joi.object({
    paper_content: Joi.string().required().min(10).max(20000),
  });
  return schema.validate(data);
};

module.exports.paperStatusValidator = (data) => {
  let schema = Joi.object({
    paper_status: Joi.string()
      .required()
      .valid("draft", "undervalidation", "released"),
  });
  return schema.validate(data);
};
module.exports.paperTitleValidator = (data) => {
  let schema = Joi.object({
    paper_title: Joi.string().required().min(3).max(100),
  });
  return schema.validate(data);
};

module.exports.paperValidator = (data) => {
  switch (Object.keys(data)[0]) {
    case "type":
      let typeSchema = Joi.object({
        type: Joi.string()
          .required()
          .valid("article", "newsletter", "activity", "parent-info"),
      });
      return typeSchema.validate(data);

    case "title":
      let titleSchema = Joi.object({
        title: Joi.string().required().min(3).max(100),
      });
      return titleSchema.validate(data);

    case "text":
      let textSchema = Joi.object({
        text: Joi.string().required().min(3).max(200000),
      });
      return textSchema.validate(data);

    case "status":
      let statusSchema = Joi.object({
        status: Joi.string()
          .required()
          .valid("draft", "undervalidation", "released"),
      });
      return statusSchema.validate(data);

    case "classroomId":
      let classroomIdSchema = Joi.object({
        classroomId: Joi.objectId(),
      });
      return classroomIdSchema.validate(data);

    default:
      break;
  }
};

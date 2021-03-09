const Classroom = require("../models/Classroom");
const Roles = require("../models/Roles");
const User = require("../models/User");
const Image = require("../models/Image");
const {
  Forbidden,
  BadRequest,
  NotFound,
  Unauthorized,
} = require("../utils/errors");
const { classroomValidator } = require("../validators/classrooms");

module.exports.listClassrooms = async (req, res, next) => {
  try {
    const classrooms = await Classroom.find();
    if (!classrooms) {
      return res.status(204).send("no classroom");
    }
    res.status(200).send(classrooms);
  } catch (err) {
    return next(err);
  }
};

module.exports.getClassroom = async (req, res, next) => {
  const { filter } = req.params;

  let query = {};
  switch (filter.length) {
    case 24:
      query._id = filter;
      break;

    default:
      query.alias = filter;
      break;
  }

  try {
    let classroom = await Classroom.findOne(query);
    if (!classroom)
      return next(new NotFound("no classroom with such criterias"));
    res.status(200).send(classroom);
  } catch (err) {
    return next(err);
  }
};

module.exports.createClassroom = async (req, res, next) => {
  const { grade, _id: userId } = req.user;

  const grades = ["admin", "manager"];
  if (!grades.includes(grade) && process.NODE_ENV === "production") {
    return next(new Unauthorized("unautorized operation"));
  }
  const { name, alias } = req.body;
  if (!name || !alias)
    return next(new BadRequest("missing classname or classAlias"));
  if (name) {
    let { error } = await classroomValidator({ name: name });
    if (error) return next(new BadRequest(`${error.details[0].message}`));
  }
  if (alias) {
    let { error: aliasError } = await classroomValidator({ alias: alias });
    if (aliasError)
      return next(new BadRequest(`${aliasError.details[0].message}`));
  }

  try {
    const newClassroom = new Classroom({
      name: name,
      alias: alias,
    });

    const createdClassroom = await newClassroom.save();
    if (!createdClassroom) return next();

    res.status(201).send(createdClassroom);
  } catch (err) {
    if (err.code === 11000)
      return next(new BadRequest("Dupliclate not allowed on alias"));
    // return next(err);
    return next(err);
  }
};

module.exports.updateClassroom = async (req, res, next) => {
  const { grade, roles, _id: requesterId } = req.user;
  const { id: classroomId } = req.params;
  const datas = {};
  const grades = ["manager", "admin", "moderator"];

  // check if classroom exist
  try {
    const classroom = await Classroom.findOne({ _id: classroomId });
    if (!classroom) return next(new BadRequest("Classroom does not exists"));
    datas.classroom = classroom;
  } catch (err) {
    return next(new BadRequest(err));
  }

  // check grade and account owner
  const isTheTeacher = requesterId === datas.classroom.teacher;
  const isGradAllowed = grades.includes(grade);

  // check user role
  const AllowedRoles = await Roles.find({
    $or: [{ name: "teacher" }, { name: "assistant" }],
  }).select("_id");
  const roleAllowArray = AllowedRoles.filter((role) => roles.includes(role));

  const environmentAllow = process.NODE_ENV !== "production";
  const roleIsAllowed = roleAllowArray.length > 0;

  if (
    process.NODE_ENV === "production" &&
    (!isGradAllowed || !isTheTeacher || !roleIsAllowed)
  ) {
    return next(new Unauthorized("you are not allowed to update this profile"));
  }

  // check datas were submitted
  if (Object.keys(req.body).length === 0)
    return next(new BadRequest("Missing datas"));

  // check if requester exists
  try {
    let user = await User.find({ _id: requesterId });
    if (!user) {
      return next(new Forbidden("user does not exist"));
    }
    datas.requester = user;
  } catch (err) {
    return next(err);
  }

  // check if req.body is empty
  if (Object.keys(req.body).length === 0) {
    return next(new BadRequest("missing datas "));
  }

  // check only fields that could be modify are submitted.
  const fields = [
    "name",
    "teacher",
    "helper",
    "summary",
    "image",
    "albums",
    "papers",
  ];
  const fieldsSubmitted = Object.keys(req.body);

  const wrongFields = fieldsSubmitted.filter((field) => {
    return fields.includes(field) === false;
  });
  if (wrongFields.length > 0) return next(new BadRequest("wrong datas"));

  const { name, teacher, helper, summary, image, albums, papers } = req.body;
  const newClassroom = {};

  if (summary) {
    const { error } = await classroomValidator({ summary: summary });
    if (error) return next(new BadRequest(error.details[0].message));
    newClassroom.summary = summary;
  }

  if (teacher) {
    if (
      grade &&
      !["admin", "manager", "moderator"].includes(grade) &&
      process.NODE_ENV === "production"
    )
      return next(new Unauthorized("only  change teacher"));

    // const { error } = await classroomValidator({ teacher: teacher });
    // if (error) return next(new BadRequest(`${error.details[0].message}`));

    // check if teacher is a user
    try {
      let checkedTeacher = await User.findOne({ _id: teacher });
      if (!checkedTeacher)
        return next(new BadRequest("that user does not exist"));
    } catch (err) {
      return next(err);
    }

    newClassroom.teacher = teacher;
  }

  if (helper) {
    if (
      !["admin", "manager", "moderator"].includes(role) &&
      process.NODE_ENV === "production"
    )
      return next(new Unauthorized("only manager can change"));

    const { error } = await classroomValidator({ helper: helper });
    if (error) return next(new BadRequest(`${error.details[0].message}`));
    // check if teacher is a user and a teacher
    try {
      let checkedHelper = await User.findOne({ _id: helper });
      if (!checkedHelper)
        return next(new BadRequest("that user does not exist"));
    } catch (err) {
      return next(err);
    }

    newClassroom.helper = helper;
  }

  if (image) {
    try {
      console.log(datas);
      let newImage = new Image({
        filename: datas.classroom.name,
        path: image,
      });

      const { _id: imageId } = await newImage.save();
      newClassroom.image = imageId;
    } catch (err) {
      return next(err);
    }
  }

  try {
    let updatedClassroom = await Classroom.findOneAndUpdate(
      { _id: classroomId },
      newClassroom,
      { returnOriginal: false }
    );
    if (!updatedClassroom) return next();
    if (datas.classroom.image) {
      await Image.findOneAndDelete({
        _id: datas.classroom.image,
      });
    }
    return res.status(200).send(updatedClassroom);
  } catch (err) {
    return next(err);
  }
};
module.exports.deleteClassroom = (req, res, next) => {
  res.send("delete classroom");
};

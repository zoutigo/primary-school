const Classroom = require("../models/Classroom");
const User = require("../models/User");
const {
  Forbidden,
  BadRequest,
  NotFound,
  Unauthorized,
} = require("../utils/errors");
const {
  classroomNameValidator,
  classroomAliasValidator,
  classroomValidator,
} = require("../validators/classrooms");

module.exports.listClassrooms = async (req, res, next) => {
  try {
    const classrooms = await Classroom.find();
    if (!classrooms) {
      return next(new NotFound("no classroom yet"));
    }
    res.status(200).send(classrooms);
  } catch (err) {
    return next(err);
  }
};

module.exports.getClassroomById = async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return next(new BadRequest("missing params id"));
  }

  const filter = { _id: id };

  try {
    let classrooms = await Classroom.find(filter);
    if (!classrooms)
      return next(new NotFound("no classroom with such criterias"));
    res.status(200).send(classrooms);
  } catch (err) {
    return next(err);
  }
};

module.exports.createClassroom = async (req, res, next) => {
  const { role, _id } = req.user;
  if (role !== "admin") {
    return next(new Forbidden("forbidden operation"));
  }

  const { name, alias } = req.body;
  if (!name || !alias)
    return next(new BadRequest("missing classname or classAlias"));

  if (name) {
    let { error } = await classroomNameValidator({ name: name });
    if (error) return next(new BadRequest(`${error.details[0].message}`));
  }
  if (alias) {
    let { error } = await classroomAliasValidator({ alias: alias });
    if (error) return next(new BadRequest(`${error.details[0].message}`));
  }

  try {
    const newClassroom = new Classroom({
      _classroom_name: name,
      _classroom_alias: alias,
    });

    const createdClasroom = await newClassroom.save();
    if (!createdClasroom) {
      return next("internal error during classroom creation");
    }
    res.status(201).send(createdClasroom);
  } catch (err) {
    if (err.code === 11000)
      return next(new BadRequest("Dupliclate not allowed on alias"));
    // return next(err);
    return next(err);
  }
};

module.exports.updateClassroom = async (req, res, next) => {
  const { role, _id } = req.user;
  const { id } = req.params;
  const datas = [];
  // check if classroom exist
  try {
    const classroom = await Classroom.find({ _id: id });
    if (!classroom) return next(new BadRequest("Classroom does not exists"));
    datas.push(classroom);
  } catch (err) {
    return next(new BadRequest(err));
  }
  // check user role
  const roles = ["admin", "manager", "moderator", "teacher"];

  if (!roles.includes(role)) {
    return next(new Forbidden("Operation forbidden"));
  }
  // check if user exists
  try {
    let user = await User.find({ _id: _id });
    if (!user) {
      return next(new Forbidden("user does not exist"));
      datas.push(user);
    }
  } catch (err) {
    return next(err);
  }
  // check if req.body is empty
  if (Object.keys(req.body).length === 0) {
    return next(new BadRequest("missing datas "));
  }
  // validate classroom name
  const { name, teacher, helper, images } = req.body;
  const newClassroom = {};
  if (name) {
    if (!(role === "admin")) {
      return next(
        new Forbidden("only admin is allowed to change classroom name")
      );
    }
    const { error } = await classroomValidator({ name: name });
    if (error) return next(new BadRequest(`${error.details[0].message}`));
    newClassroom._classroom_name = name;
  }
  if (teacher) {
    if (!["admin", "manager", "moderator"].includes(role))
      return next(new Unauthorized("only  change teacher"));

    const { error } = await classroomValidator({ teacher: teacher });
    if (error) return next(new BadRequest(`${error.details[0].message}`));
    // check if teacher is a user and a teacher
    try {
      let checkedTeacher = await User.findOne({ _id: teacher });
      if (!checkedTeacher)
        return next(new BadRequest("that user does not exist"));
    } catch (err) {
      return next(err);
    }

    newClassroom._classroom_teacher = teacher;
  }

  if (helper) {
    if (!["admin", "manager", "moderator"].includes(role))
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

    newClassroom._classroom_helper = helper;
  }

  if (images) {
    let [currentClassroom, currentUser] = datas;
    if (
      !(currentClassroom._classroom_teacher === _id) ||
      !(currentClassroom._classroom_helper === _id)
    )
      return next(
        new Unauthorized("only allowed for teacher of the classroom")
      );
  }

  res.send("update classroom");
};
module.exports.deleteClassroom = (req, res, next) => {
  res.send("delete classroom");
};

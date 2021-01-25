const Classroom = require("../models/Classroom");

module.exports.listClassrooms = (req, res, next) => {
  res.send("List classrooms");
};

module.exports.getClassroom = (req, res, next) => {
  res.send("get classroom");
};

module.exports.createClassroom = (req, res, next) => {
  res.send("create classroom");
};

module.exports.updateClassroom = (req, res, next) => {
  res.send("update classroom");
};
module.exports.deleteClassroom = (req, res, next) => {
  res.send("delete classroom");
};

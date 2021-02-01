const User = require("../models/User");
const { Forbidden } = require("../utils/errors");

module.exports.checkGradeAndUserExists = async (req, res, next) => {
  const { grade, _id } = req.user;
  // check user grade
  const grades = ["admin", "manager"];
  if (!grades.includes(grade))
    return next(new Forbidden("forbidden operation"));

  // check if user exists
  try {
    let user = await User.findOne({ _id: _id });
    if (!user) {
      return next(new Forbidden("user does not exist"));
    }
    datas.user = user;
  } catch (err) {
    return next(err);
  }

  next();
};

const jwt = require("jsonwebtoken");
const { BadRequest, Unauthorized, TokenIvalid } = require("../utils/errors");
const User = require("../models/User");

module.exports.verifyToken = async (req, res, next) => {
  // const token = req.header('auth-token')

  const token = req.headers["x-access-token"];
  if (!token) {
    next(new Unauthorized("Access denied"));
  } else {
    try {
      const verified = await jwt.verify(token, process.env.TOKEN_SECRET);
      if (!verified) return next(new TokenIvalid("Invalid Token"));
      const { roles, grade, _id } = verified;

      const user = await User.findOne({ _id: _id });
      !user && next(new BadRequest("user doesnt exit"));

      req.user = verified;
      next();
    } catch (err) {
      next(err);
    }
  }
};

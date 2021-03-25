const jwt = require("jsonwebtoken");
const { Unauthorized, TokenInvalid, BadRequest } = require("../utils/errors");

const User = require("../models/User");

module.exports.verifyToken = async (req, res, next) => {
  // const token = req.header('auth-token')
  // const badReq = new BadRequest("hello");
  // console.log("badreq", badReq instanceof BadRequest);

  const token = req.headers["x-access-token"];
  if (!token) {
    return next(new Unauthorized("Access denied"));
    // return res.status(400).send("access denied");
  } else {
    try {
      const verified = await jwt.verify(token, process.env.TOKEN_SECRET);
      if (!verified) return next(new BadRequest("Invalid Token"));
      const { roles, grade, _id } = verified;

      const user = await User.findOne({ _id: _id });
      if (!user) return res.status(400).send("user does not exist");

      req.user = verified;
      next();
    } catch (err) {
      return next(new TokenInvalid(err));
    }
  }
};

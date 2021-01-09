const User = require("../models/User");
const {
  loginValidator,
  emailValidator,
  passwordValidator,
  roleValidator,
} = require("../validators/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  BadRequest,
  Unauthorized,
  PreconditionFailed,
  Forbidden,
  NotFound,
} = require("../utils/errors");

module.exports.userRegister = async (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return next(new BadRequest("missing datas"));
  }

  let emailValidated = await emailValidator({ email: email });
  if (emailValidated.error)
    return next(new BadRequest(emailValidated.error.details[0].message));

  let passwordValidated = await passwordValidator({ password: password });
  if (passwordValidated.error)
    return next(new BadRequest(passwordValidated.error.details[0].message));

  let roleValidated = await roleValidator({ role: role });
  if (roleValidated.error)
    return next(new BadRequest(roleValidated.error.details[0].message));

  // check if email exist in database
  let emailCheck = await User.findOne({ email: email });
  if (emailCheck) return next(new BadRequest(` email ${email} already exists`));

  // password hash
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  let user = new User({
    email: email,
    password: hashedPassword,
    role: role,
    createdAt: Date.now(),
  });

  try {
    const newUser = await user.save();
    if (newUser) {
      let token = await jwt.sign(
        { _id: user._id, role: user.role },
        process.env.TOKEN_SECRET,
        { expiresIn: process.env.TOKEN_LOGIN_DURATION }
      );
      return res
        .status(201)
        .header("x-access-token", token)
        .send("user succesfully created");
    }
  } catch (err) {
    return next(err);
  }
};

module.exports.userLogin = async (req, res, next) => {
  // if(!req.body.email || !req.body.password) return res.status(400).send('Please enter email and password')

  // using Joi validator
  let { value, error } = await loginValidator(req.body);
  if (error) return res.status(400).send(`${error.details[0].message}`);

  // check if email exists
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("User does not exist for that email");

  // check password
  let passwordVerif = await bcrypt.compare(req.body.password, user.password);
  if (!passwordVerif) return res.status(400).send("Wrong password");

  let token = await jwt.sign(
    { _id: user._id, role: user.role },
    process.env.TOKEN_SECRET,
    { expiresIn: process.env.TOKEN_LOGIN_DURATION }
  );
  res
    .status(200)
    .header("auth-token,token")
    .send(`vous etes connectés avec le token ${token}`);
};

module.exports.userView = async (req, res) => {
  if (!req.params)
    return res.status(400).send("There is an error in your request");

  let user = await User.findOne({ _id: req.params.id });
  if (!user) return res.status(400).send("There is no user available");

  return res.status(200).send(`The user is ${user}`);
};

module.exports.userModify = async (req, res) => {
  if (!req.params || !req.body)
    return res.status(400).send("There is an error in your request");

  let user = await User.findOneAndUpdate({ _id: req.params.id }, req.body);
  if (!user) return res.status(400).send("There is no user available");

  return res.status(200).send(`The user is ${user}`);
};

module.exports.userList = async (req, res) => {
  let user = await User.find()
    .then((users) => users)
    .catch((err) => err);

  return res.status(200).send(user);
};

module.exports.userEmail = async (req, res, next) => {
  if (!req.body.email) {
    return next(new BadRequest("email is necessary"));
  }
  const { error } = await emailValidator(req.body);
  if (error) {
    return next(new BadRequest(`${error.details[0].message}`));
  }
  try {
    let user = await User.findOne(req.body);
    user ? res.status(200).send("user exist") : res.status(204).send("no user");
  } catch (err) {
    next(err);
  }
};

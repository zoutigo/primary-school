const Role = require("../models/Roles");
const User = require("../models/User");
const { BadRequest } = require("../utils/errors");
const { roleValidator } = require("../validators/roles");

module.exports.listRoles = async (req, res, next) => {
  try {
    let roles = await Role.find();
    if (!roles) return res.status(203);
    return res.status(200).send(roles);
  } catch (err) {
    return next(err);
  }
};

module.exports.getRole = async (req, res, next) => {
  try {
    const filter = { _id: req.params.id };
    let role = await Role.findOne(filter);
    if (!role) return res.status(203);
    return res.status(200).send(role);
  } catch (err) {
    return next(err);
  }
};
module.exports.createRole = async (req, res, next) => {
  const { _id } = req.user;

  if (Object.keys(req.body).length === 0)
    return next(new BadRequest("no dats sents"));

  if (!Object.keys(req.body).includes("name"))
    return next(new BadRequest("please send the role name"));
  // check user exist
  try {
    let user = await User.findOne({ _id: _id });
    if (!user) return next(new BadRequest("user does not exist anymore"));
  } catch (err) {
    return next(err);
  }
  // validate the name
  const { error } = await roleValidator({ name: req.body.name });
  if (error) return next(new BadRequest(error.details[0].message));

  // insert in database

  try {
    const role = new Role({
      name: req.body.name,
      test: process.NODE_ENV !== "production",
    });
    const newRole = await role.save();
    if (!role) return next();
    return res.status(201).send(role);
  } catch (err) {
    return next(err);
  }
};

module.exports.updateRole = async (req, res, next) => {
  const { _id: userId } = req.user;
  const roleId = req.params.id;

  if (Object.keys(req.body).length === 0)
    return next(new BadRequest("no dats sents"));

  if (!Object.keys(req.body).includes("name"))
    return next(new BadRequest("please send the role name"));
  // check user exist
  try {
    const user = await User.findOne({ _id: userId });
    if (!user) return next(new BadRequest("user does not exist anymore"));
  } catch (err) {
    return next(err);
  }

  // check if role exist
  try {
    const checkedRole = await Role.findOne({ _id: roleId });

    if (!checkedRole) return next(new BadRequest("that role does not exit"));
  } catch (err) {
    next(err);
  }

  // validate the name
  const { error } = await roleValidator({ name: req.body.name });
  if (error) return next(new BadRequest(error.details[0].message));

  // dataBase insersion
  try {
    let updatedRole = await Role.findOneAndUpdate(
      { _id: roleId },
      { name: req.body.name },
      { returnOriginal: false }
    );
    if (!updatedRole) return next();
    return res.status(200).send(updatedRole);
  } catch (err) {
    return next(err);
  }
};

module.exports.deleteRole = async (req, res, next) => {
  const { _id } = req.user;
  const roleId = req.params.id;

  // check user exist
  try {
    let user = await User.findOne({ _id: _id });
    if (!user) return next(new BadRequest("user does not exist anymore"));
  } catch (err) {
    return next(err);
  }

  // delete from db
  try {
    let deletedRole = await Role.findOneAndDelete({ _id: roleId });

    if (deletedRole) return res.status(200).send(deletedRole);
  } catch (err) {
    return next(err);
  }
};

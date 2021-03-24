const User = require("../models/User");
const Roles = require("../models/Roles");
const { userValidator } = require("../validators/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  BadRequest,
  Unauthorized,
  PreconditionFailed,
  Forbidden,
  NotFound,
} = require("../utils/errors");
const Classroom = require("../models/Classroom");

module.exports.userRegister = async (req, res, next) => {
  // check if req.body is not empty
  if (Object.keys(req.body).length === 0)
    return next(new BadRequest("missing datas"));

  const fields =
    process.env.NODE_ENV == "development"
      ? ["email", "password"]
      : ["email", "password"];
  const submittedFields = fields.filter((field) => {
    return Object.keys(req.body).includes(field) === true;
  });
  if (!(submittedFields.length === fields.length))
    return next(new BadRequest("missing datas"));

  const { email, password } = req.body;

  // data validations

  let emailValidated = await userValidator({ email: email });
  if (emailValidated.error)
    return next(new BadRequest(emailValidated.error.details[0].message));

  let passwordValidated = await userValidator({ password: password });
  if (passwordValidated.error)
    return next(new BadRequest(passwordValidated.error.details[0].message));

  // check if email exist in database
  let emailCheck = await User.findOne({ email: email });
  if (emailCheck) return next(new BadRequest(`email already exists`));

  // password hash
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  let user = {};
  if (process.env.NODE_ENV == "development") {
    user = new User({
      email: email,
      password: hashedPassword,

      test: true,
      createdAt: Date.now(),
    });
  } else {
    user = new User({
      email: email,
      password: hashedPassword,

      createdAt: Date.now(),
    });
  }

  try {
    const newUser = await user.save();
    if (newUser) {
      let token = await jwt.sign(
        {
          _id: newUser._id,
          roles: newUser.roles,
          grade: newUser.grade,
          name: newUser.name,
          firstname: newUser.firstname,
        },
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
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new BadRequest("password or email missing"));
  }

  let emailValidated = await userValidator({ email: email });
  if (emailValidated.error)
    return next(new BadRequest(emailValidated.error.details[0].message));

  let passwordValidated = await userValidator({ password: password });
  if (passwordValidated.error)
    return next(new BadRequest(passwordValidated.error.details[0].message));

  // check if email exists
  let userVerified = await User.findOne({ email: email });
  if (!userVerified) return next(new BadRequest("wrong datas"));

  // check password
  let passwordVerified = await bcrypt.compare(password, userVerified.password);
  if (!passwordVerified) return next(new BadRequest("wrong datas"));

  let token = await jwt.sign(
    {
      _id: userVerified._id,
      roles: userVerified.roles,
      grade: userVerified.grade,
      name: userVerified.name,
      firstname: userVerified.firstname,
    },
    process.env.TOKEN_SECRET,
    { expiresIn: process.env.TOKEN_LOGIN_DURATION }
  );
  return res
    .status(200)
    .header("x-access-token", token)
    .send("successful login");
};

module.exports.userView = async (req, res, next) => {
  const { error } = await userValidator({ id: req.params.id });
  if (error) return next(new NotFound("Not found"));

  let user = await User.findOne({ _id: req.params.id }).select(
    "firstname  grade createdAt _id"
  );
  if (!user) return next(new BadRequest("no user found with that id"));

  return res.status(200).send(user);
};

module.exports.userModify = async (req, res, next) => {
  const { _id, grade: grad } = req.user;
  const grades = ["manager", "admin"];
  const { id } = req.params;
  const datas = {};
  const modifiedUser = {};

  // check grade and account owner
  const isOwner = id === _id;
  const isGradAllowed = grades.includes(grad);

  if (!isGradAllowed && !isOwner) {
    return next(new Unauthorized("you are not allowed to update this profile"));
  }

  // check datas were submitted
  if (Object.keys(req.body).length === 0)
    return next(new BadRequest("Missing datas"));

  // check only fields that could be modify are submitted.
  const fields = [
    "name",
    "firstname",
    "email",
    "password",
    "newPassword",
    "newPasswordConfirm",
    "grade",
    "roles",
    "action",
    "gender",
  ];
  const fieldsSubmitted = Object.keys(req.body);

  const wrongFields = fieldsSubmitted.filter((field) => {
    return fields.includes(field) === false;
  });
  if (wrongFields.length > 0) return next(new BadRequest("wrong datas"));

  // check the user to modify exists
  try {
    let user = await User.findOne({ _id: id });
    if (!user) return next(new NotFound("user not found"));
    datas.user = user;
  } catch (err) {
    return next(err);
  }

  // fields validations
  const {
    name,
    firstname,
    email,
    newPassword,
    newPasswordConfirm,
    password,
    grade,
    roles,
    action,
    gender,
  } = req.body;
  // name validation
  if (name) {
    if (isOwner) {
      if (!(name === datas.user.name)) {
        const { error } = await userValidator({ name: name });
        if (error) return next(new BadRequest(error.details[0].message));
        modifiedUser.name = name;
      } else {
        modifiedUser.name = name;
      }
    } else {
      return next(new Unauthorized("only the owner can modify"));
    }
  }
  // firstname validation
  if (firstname) {
    if (isOwner) {
      if (!(firstname === datas.user.firstname)) {
        const { error } = await userValidator({ firstname: firstname });
        if (error) return next(new BadRequest(error.details[0].message));
        modifiedUser.firstname = firstname;
      } else {
        modifiedUser.firstname = firstname;
      }
    } else {
      return next(new Unauthorized("only the owner can modify"));
    }
  }
  // gender validation
  if (gender) {
    if (isOwner) {
      if (!(gender === datas.user.gender)) {
        const { error } = await userValidator({ gender: gender });
        if (error) return next(new BadRequest(error.details[0].message));
        modifiedUser.gender = gender;
      } else {
        modifiedUser.gender = gender;
      }
    } else {
      return next(new Unauthorized("only the owner can modify"));
    }
  }
  // email validation
  if (email) {
    if (isOwner) {
      if (!(email === datas.user.email)) {
        const { error } = await userValidator({ email: email });
        if (error) return next(new BadRequest(error.details[0].message));
        modifiedUser.email = email;
      } else {
        modifiedUser.email = email;
      }
    } else {
      return next(new Unauthorized("only the owner can modify"));
    }
  }
  // password validation
  if (password) {
    if (isOwner) {
      const { password: initialPassword } = datas.user;

      let passwordVerified = await bcrypt.compare(password, initialPassword);
      if (!passwordVerified) return next(new BadRequest("wrong password"));

      if (!newPassword || !newPasswordConfirm)
        return next(new BadRequest("new passwords missing"));

      if (!(newPassword === newPasswordConfirm))
        return next(new BadRequest("passwords not matching"));

      const { error } = await userValidator({ password: newPassword });
      if (error) return next(new BadRequest(error.details[0].message));
      // pass should be crypted
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      modifiedUser.password = hashedPassword;
    } else {
      return next(new Unauthorized("only the owner can modify"));
    }
  }
  // grade validation
  if (grade) {
    if (isGradAllowed || process.NODE_ENV !== "production") {
      if (!(grade === datas.user.grade)) {
        if (!(grad === "admin") && grade === "admin")
          return next(new Unauthorized("only admin can change admin grade"));
        const { error } = await userValidator({ grade: grade });
        if (error) return next(new BadRequest(error.details[0].message));
        modifiedUser.grade = grade;
      } else {
        modifiedUser.grade = grade;
      }
    } else {
      return next(new Unauthorized("only manager or admin can change grade"));
    }
  }

  // roles validation
  if (roles) {
    if (isGradAllowed || process.NODE_ENV !== "production") {
      const { error } = await userValidator({ roles: roles });
      if (error) {
        return next(new BadRequest(`${error.details[0].message}`));
      }
      let newRoles = {};
      switch (action) {
        case "add-roles":
          newRoles = datas.user.roles;
          roles.forEach((role) => {
            if (!newRoles.includes(role)) {
              newRoles.push(role);
            }
          });
          break;

        case "remove-roles":
          newRoles = datas.user.roles.filter((role) => {
            return roles.includes(role) === false;
          });
          break;

        default:
          return next(
            new BadRequest("missing role action: add-roles, remove-roles")
          );
      }
      modifiedUser.roles = newRoles;
    } else {
      return next(new Unauthorized("not enough grade to do change user roles"));
    }
  }

  // insersion in database

  if (Object.keys(modifiedUser).length > 0) {
    try {
      let savedModifiedUser = await User.findOneAndUpdate(
        { _id: id },
        modifiedUser,
        { returnOriginal: false }
      );
      if (!savedModifiedUser) return next();
      return res.status(200).send("user succesfully modified");
    } catch (err) {
      return next(err);
    }
  }
};

module.exports.userList = async (req, res, next) => {
  try {
    let users = await User.find().select("_id email name firstname");
    if (!users) return res.status(204).send("no user found");
    return res.status(200).send(users);
  } catch (err) {
    return next(err);
  }
};

module.exports.userEmail = async (req, res, next) => {
  if (!req.body.email) {
    return next(new BadRequest("email is necessary"));
  }
  const { error } = await userValidator({ email: req.body.email });
  if (error) {
    return next(new BadRequest(`${error.details[0].message}`));
  }
  try {
    let user = await User.findOne(req.body);
    if (!user) return res.status(204).send("no user");
    return res.status(200).send("user exist");
  } catch (err) {
    next(err);
  }
};

module.exports.usersTeamGet = async (req, res, next) => {
  const groups = [];
  const sortedRoles = [
    "La direction",
    "Les enseignants",
    "Les aides maternelles",
    "secretariat-comptabilité",
    "personnel de cantine",
  ];
  const classrooms = await Classroom.find().select("_id teacher name helper");

  const rolesList = await Roles.find({ name: { $ne: "Les parents" } });
  const rolesIds = rolesList.map((role) => {
    return role._id;
  });
  const query = { roles: { $in: rolesIds } };
  const membersList = await User.find(query).select(
    "_id name firstname gender roles"
  );

  const getGroup = (role) => {
    let { _id: roleId, name: roleName } = role;
    const getRole = () => {
      return roleName;
    };

    const getIndex = (role) => {
      return sortedRoles.indexOf(roleName);
    };
    const getMembers = async () => {
      let groupMembers = [];
      for (let i = 0; i < membersList.length; i++) {
        let {
          _id: mId,
          name: mName,
          firstname: mFirstname,
          gender: mGender,
          roles: mRoles,
        } = membersList[i];
        if (JSON.stringify(mRoles[0]) === JSON.stringify(roleId)) {
          let mClassroom = classrooms.find(
            (classroom) =>
              JSON.stringify(mId) === JSON.stringify(classroom.teacher) ||
              JSON.stringify(mId) === JSON.stringify(classroom.helper)
          );

          let mClassroomName = mClassroom ? mClassroom.name : null;
          if (roleName === "La direction") {
            mClassroomName =
              mGender === "monsieur" ? "Le directeur" : "La directrice";
          }

          groupMembers.push({
            _id: mId,
            lastname: mName,
            firstname: mFirstname,
            gender: mGender,
            position: mClassroomName,
          });
        }
      }

      return groupMembers;
    };
    return {
      getIndex,
      getRole,
      getMembers,
    };
  };

  try {
    for (let i = 0; i < rolesList.length; i++) {
      let { getRole, getMembers, getIndex } = await getGroup(rolesList[i]);
      let groupDatas = {
        index: getIndex(),
        department: getRole(),
        members: await getMembers(),
      };
      groups.push(groupDatas);
    }

    const sortedGroups = groups
      .sort((a, b) => a.index - b.index)
      .map((group) => {
        let { department, members } = group;
        return {
          department: department,
          members: members,
        };
      });

    res.status(200).send(sortedGroups);
  } catch (err) {
    return next(err);
  }
};

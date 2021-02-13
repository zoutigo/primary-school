const faker = require("faker");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Classroom = require("../models/Classroom");
const { BadRequest } = require("../utils/errors");
const Roles = require("../models/Roles");

const random = (number) => {
  return Math.floor(Math.random() * number);
};

module.exports.createUsers = async (req, res, next) => {
  const { quantity } = req.body;
  let count = 0;
  const password = "Valery54";

  for (let i = 0; i < quantity; i++) {
    let user = {};
    user.name = faker.name.lastName();
    user.firstname = faker.name.lastName();
    user.email = faker.internet.email();

    // password hash
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    user.password = hashedPassword;

    try {
      let newUser = new User(user);
      let savedUser = newUser.save();
      if (savedUser) {
        count++;
      }
    } catch (err) {
      console.log(err);
    }
  }

  res.status(200).send(`${count} users created`);
};

module.exports.createClassrooms = async (req, res, next) => {
  const classrooms = [
    ["Petite Section", "ps"],
    ["Moyenne Section", "ms"],
    ["Grande Section", "gs"],
    ["CP", "cp"],
    ["CE1", "ce1"],
    ["CE2", "ce2"],
    ["CM1", "cm1"],
    ["CM2", "cm2"],
  ];

  let count = 0;
  for (let i = 0; i < classrooms.length; i++) {
    let [name, alias] = classrooms[i];
    let newClassroom = new Classroom({
      name: name,
      alias: alias,
    });
    try {
      let savedClassroom = await newClassroom.save();
      if (savedClassroom) {
        count++;
      }
    } catch (err) {
      console.log(err);
    }
  }
  res.status(201).send(`${count} classrooms have benn created`);
};

module.exports.updateClassrooms = async (req, res, next) => {
  const { action } = req.body;

  switch (action) {
    case "teachers":
      let Count = 0;
      const { _id: teacherRoleId } = await Roles.findOne({
        name: "Les enseignants",
      });
      const classrooms = await Classroom.find();
      const countClassrooms = classrooms.length;
      const countUsers = await User.find().count();
      const query = {
        roles: { $in: [teacherRoleId] },
      };
      const options = {
        skip: random(countUsers - countClassrooms),
      };
      let teachers = await User.find(query, options)
        .limit(countClassrooms)
        .select("_id");

      for (let i = 0; i < countClassrooms; i++) {
        try {
          let updatedClassroom = await Classroom.findOneAndUpdate(
            {
              _id: classrooms[i]._id,
            },
            {
              teacher: teachers[i]._id,
            }
          );
          if (updatedClassroom) Count++;
        } catch (err) {
          console.log(err);
        }
      }

      return res.status(200).send(`${Count} classrooms have been updated`);
    case "helpers":
      let countClasses = 0;
      const { _id: helperRoleId } = await Roles.findOne({
        name: "Les aides maternelles",
      });
      console.log(helperRoleId);
      const helpers = await User.find({
        roles: { $in: [helperRoleId] },
      }).select("_id");
      const classroomsAlias = ["ps", "ms", "gs"];

      for (let i = 0; i < classroomsAlias.length; i++) {
        try {
          let updatedClassroom = await Classroom.findOneAndUpdate(
            { alias: classroomsAlias[i] },
            { helper: helpers[i]._id }
          );
          if (updatedClassroom) {
            countClasses++;
          }
        } catch (err) {
          return next(err);
        }
      }
      return res.status(200).send(`${countClasses} have been updated`);
      break;

    default:
      return next(
        new BadRequest("action: teachers , helpers , images, papers")
      );
  }
};

module.exports.updateUsers = async (req, res, next) => {
  const { action } = req.body;
  switch (action) {
    case "assign-role-teacher":
      let Count = 0;
      const teacherRole = await Roles.findOne({
        name: "Les enseignants",
      });

      const countClassrooms = await Classroom.estimatedDocumentCount();
      let countUsers = await User.estimatedDocumentCount();

      const query = {};
      const options = {
        skip: random(countUsers - countClassrooms),
      };

      const users = await User.find(query, options).limit(countClassrooms);

      for (let i = 0; i < users.length; i++) {
        console.log("userId:", users[i]._id, "TeacherRoleId:", teacherRole._id);
        try {
          let updatedUser = await User.findOneAndUpdate(
            { _id: users[i]._id },
            { roles: [teacherRole._id] }
          );
          if (updatedUser) {
            Count++;
          }
        } catch (err) {
          console.log(err);
        }
      }
      if (teacherRole)
        return res
          .status(200)
          .send(`${Count} users have been promoted teachers`);
      break;
    case "assign-credentials":
      let countT = 0;
      const usersT = await User.find();
      const countUsersT = usersT.length;
      const genders = ["monsieur", "madame"];

      for (let i = 0; i < countUsersT; i++) {
        let newUser = {
          name: faker.name.lastName(),
          firstname: faker.name.firstName(),
          gender: genders[random(2)],
        };
        try {
          let savedNewuser = await User.findOneAndUpdate(
            { _id: usersT[i]._id },
            newUser
          );
          if (savedNewuser) {
            countT++;
          }
        } catch (err) {
          console.log(err);
        }
      }
      return res.status(200).send(`${countT} users have been updated`);
    default:
      return next(new BadRequest("missing action"));
  }
};
module.exports.createRoles = async (req, res, next) => {
  const roles = [
    "Les parents",
    "Les enseignants",
    "La direction",
    "secretariat-comptabilité",
    "personnel de cantine",
    "Les aides maternelles",
  ];
  let count = 0;

  for (let i = 0; i < roles.length; i++) {
    try {
      let role = new Roles({
        name: roles[i],
      });

      let newRole = await role.save();
      if (newRole) {
        count++;
      }
    } catch (err) {
      console.log(err);
    }
  }
  res.status(200).send(`${count} roles have been created`);
};

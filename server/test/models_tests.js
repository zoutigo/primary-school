const mongoose = require("mongoose");
const faker = require("faker");
const Category = require("../models/Category");
const Classroom = require("../models/Classroom");
const Roles = require("../models/Roles");
const Rubric = require("../models/Rubric");
const User = require("../models/User");
const Page = require("../models/Page");
const Image = require("../models/Image");

const getRandom = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};
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
const randClassromm = getRandom(classrooms.length);
const newClassroom = {
  name: classrooms[randClassromm][0],
  alias: classrooms[randClassromm][1],
};
const newRubric = { name: faker.name.firstName() };
const newUser = {
  email: faker.internet.email(),
  password: "Valery54",
};
const newCategory = { name: faker.name.firstName() };
const newPage = {
  alias: faker.name.firstName(),
  title: faker.company.companyName(),
  text: `<p>${faker.lorem.paragraph()}</p>`,
};

describe("MODELS", () => {
  beforeEach((done) => {
    const {
      users,
      roles,
      classrooms,
      categories,
      images,
    } = mongoose.connection.collections;
    users.drop();
    roles.drop();
    classrooms.drop();
    categories.drop();
    images.drop();
    done();
  });

  it("should create classroom", (done) => {
    const classroom = new Classroom(newClassroom);
    classroom.save().then(() => {
      classroom.should.be.a("object");
      done();
    });
  });

  it("should create role", (done) => {
    const role = new Roles({
      name: faker.name.jobType(),
    });
    role.save().then(() => {
      role.should.be.a("object");
      done();
    });
  });

  it("should create rubric", (done) => {
    const rubric = new Rubric(newRubric);
    rubric.save().then(() => {
      rubric.should.be.a("object");
      done();
    });
  });

  it("should create category", (done) => {
    const category = new Category(newCategory);
    category.save().then(() => {
      category.should.be.a("object");
      done();
    });
  });
  it("should create user", (done) => {
    const user = new User(newUser);
    user.save().then(() => {
      user.should.be.a("object");
      done();
    });
  });
  it("should create page", (done) => {
    const page = new Page(newPage);
    page.save().then(() => {
      page.should.be.a("object");
      done();
    });
  });
  it("should create image with name only", (done) => {
    const image = new Image({
      name: faker.name.firstName(),
    });
    image.save().then(() => {
      image.should.be.a("object");
      done();
    });
  });
});

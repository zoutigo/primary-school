process.env.DEV_MODE = "test";
const assert = require("assert");
const faker = require("faker");
const chai = require("chai");
const atob = require("atob");
const chaiHttp = require("chai-http");
const mongoose = require("mongoose");
const server = require("../bin/www");
const User = require("../models/User");
const Role = require("../models/Roles");
const Category = require("../models/Category");

// Configure chai
chai.use(chaiHttp);
chai.should();

const newUser = {
  email: faker.internet.email(),
  password: "Valery54",
};

const newCategory = { name: faker.name.firstName() };
describe("CATEGORIES", () => {
  beforeEach((done) => {
    const {
      users,
      roles,
      rubrics,
      categories,
    } = mongoose.connection.collections;
    users.drop();
    roles.drop();
    rubrics.drop();
    categories.drop();
    done();
  });
  it("should create category via model", (done) => {
    const category = new Category(newCategory);
    category.save().then(() => {
      assert(!category.isNew);
      done();
    });
  });
  it("create category via route", (done) => {
    chai
      .request(server)
      .post("/users")
      .send(newUser)
      .end((err, res) => {
        const token = res.header["x-access-token"];
        chai
          .request(server)
          .post("/rubrics/categories")
          .set("x-access-token", token)
          .send(newCategory)
          .end((erro, resp) => {
            resp.should.have.status(201);
            resp.body.should.be.a("object");
            done();
          });
      });
  });
});

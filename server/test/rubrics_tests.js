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
const Rubric = require("../models/Rubric");

// Configure chai
chai.use(chaiHttp);
chai.should();

const newUser = {
  email: faker.internet.email(),
  password: "Valery54",
};

const newRubric = { name: faker.name.firstName() };

describe("RUBRICS", () => {
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

  it("should create rubric via model", (done) => {
    const rubric = new Rubric(newRubric);
    rubric.save().then(() => {
      assert(!rubric.isNew);
      done();
    });
  });

  it("should create rubric via route", (done) => {
    chai
      .request(server)
      .post("/users")
      .send(newUser)
      .end((err, res) => {
        const token = res.header["x-access-token"];
        chai
          .request(server)
          .post("/rubrics")
          .set("x-access-token", token)
          .send(newRubric)
          .end((erro, resp) => {
            resp.should.have.status(201);
            resp.body.should.be.a("object");
            done();
          });
      });
  });
  it("should list rubrics", (done) => {
    chai
      .request(server)
      .post("/users")
      .send(newUser)
      .end((err, res) => {
        const token = res.header["x-access-token"];
        chai
          .request(server)
          .post("/rubrics")
          .set("x-access-token", token)
          .send(newRubric)
          .end((erro, resp) => {
            chai
              .request(server)
              .get("/rubrics")
              .end((error, response) => {
                response.should.have.status(200);
                response.body.should.be.a("array");
                response.body.should.not.have.lengthOf(0);
                done();
              });
          });
      });
  });
  it("should get one rubric", (done) => {
    chai
      .request(server)
      .post("/users")
      .send(newUser)
      .end((err, res) => {
        const token = res.header["x-access-token"];
        chai
          .request(server)
          .post("/rubrics")
          .set("x-access-token", token)
          .send(newRubric)
          .end((erro, resp) => {
            const { _id: rubricId } = resp.body;
            chai
              .request(server)
              .get(`/rubrics/${rubricId}`)
              .end((error, response) => {
                response.should.have.status(200);
                response.body.should.be.a("object");
                done();
              });
          });
      });
  });

  it("modify rubric: change name", (done) => {
    chai
      .request(server)
      .post("/users")
      .send(newUser)
      .end((err, res) => {
        const token = res.header["x-access-token"];
        chai
          .request(server)
          .post("/rubrics")
          .set("x-access-token", token)
          .send(newRubric)
          .end((erro, resp) => {
            const { _id: rubricId } = resp.body;
            const datas = { name: faker.name.firstName() };
            chai
              .request(server)
              .put(`/rubrics/${rubricId}`)
              .set("x-access-token", token)
              .send(datas)
              .end((error, response) => {
                response.should.have.status(200);
                response.body.should.be.a("object");
                done();
              });
          });
      });
  });
  it("modify rubric: add category", (done) => {
    chai
      .request(server)
      .post("/users")
      .send(newUser)
      .end((err, res) => {
        const token = res.header["x-access-token"];
        chai
          .request(server)
          .post("/rubrics")
          .set("x-access-token", token)
          .send(newRubric)
          .end((erro, resp) => {
            const { _id: rubricId } = resp.body;
            const newCategory = { name: faker.name.firstName() };
            chai
              .request(server)
              .post(`/rubrics/categories`)
              .set("x-access-token", token)
              .send(newCategory)
              .end((error, response) => {
                const { _id: categoryId } = response.body;
                const addDatas = {
                  name: faker.name.lastName(),
                  action: "add-categories",
                  categories: [categoryId],
                };
                chai
                  .request(server)
                  .put(`/rubrics/${rubricId}`)
                  .set("x-access-token", token)
                  .send(addDatas)
                  .end((error1, response1) => {
                    response1.should.have.status(200);
                    response1.body.should.be.a("object");
                    response1.body.categories.should.be.a("array");
                    response1.body.categories[0].should.equal(categoryId);
                    done();
                  });
              });
          });
      });
  });
  it("modify rubric: remove category", (done) => {
    chai
      .request(server)
      .post("/users")
      .send(newUser)
      .end((err, res) => {
        const token = res.header["x-access-token"];
        chai
          .request(server)
          .post("/rubrics")
          .set("x-access-token", token)
          .send(newRubric)
          .end((erro, resp) => {
            const { _id: rubricId } = resp.body;
            const newCategory = { name: faker.name.firstName() };
            chai
              .request(server)
              .post(`/rubrics/categories`)
              .set("x-access-token", token)
              .send(newCategory)
              .end((error, response) => {
                const { _id: categoryId } = response.body;
                const addDatas = {
                  name: faker.name.lastName(),
                  action: "add-categories",
                  categories: [categoryId],
                };
                chai
                  .request(server)
                  .put(`/rubrics/${rubricId}`)
                  .set("x-access-token", token)
                  .send(addDatas)
                  .end((error1, response1) => {
                    const removeDatas = {
                      name: faker.name.lastName(),
                      action: "remove-categories",
                      categories: [categoryId],
                    };
                    chai
                      .request(server)
                      .put(`/rubrics/${rubricId}`)
                      .set("x-access-token", token)
                      .send(removeDatas)
                      .end((err2, res2) => {
                        res2.should.have.status(200);
                        res2.body.should.be.a("object");
                        res2.body.categories.should.be.a("array");
                        res2.body.categories.should.have.lengthOf(0);
                        done();
                      });
                  });
              });
          });
      });
  });
});

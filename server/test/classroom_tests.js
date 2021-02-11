const assert = require("assert");
const faker = require("faker");
const chai = require("chai");
const atob = require("atob");
const chaiHttp = require("chai-http");
const mongoose = require("mongoose");
const server = require("../bin/www");
const User = require("../models/User");
const Classroom = require("../models/Classroom");

// Configure chai
chai.use(chaiHttp);
chai.should();

const getRandom = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};
const classrooms = [
  ["Petite Section", "petite-section"],
  ["Moyenne Section", "moyenne-section"],
  ["Grande Section", "grande-section"],
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
const newUser = {
  email: faker.internet.email(),
  password: "Valery54",
};

describe("CLASSROOMS", () => {
  beforeEach((done) => {
    const {
      users,
      roles,
      rubrics,
      categories,
      classrooms,
    } = mongoose.connection.collections;
    users.drop();
    roles.drop();
    rubrics.drop();
    categories.drop();
    classrooms.drop();
    done();
  });

  it("should create classroom with model", (done) => {
    const classroom = new Classroom(newClassroom);
    classroom.save().then(() => {
      assert(!classroom.isNew);
      done();
    });
  });
  it("should create classroom with route", (done) => {
    chai
      .request(server)
      .post("/users")
      .send(newUser)
      .end((err, res) => {
        const token = res.header["x-access-token"];
        chai
          .request(server)
          .post("/classrooms")
          .set("x-access-token", token)
          .send(newClassroom)
          .end((erro, resp) => {
            resp.should.have.status(201);
            resp.body.should.be.a("object");
            done();
          });
      });
  });
  it("should list classrooms", (done) => {
    chai
      .request(server)
      .post("/users")
      .send(newUser)
      .end((err, res) => {
        const token = res.header["x-access-token"];
        chai
          .request(server)
          .post("/classrooms")
          .set("x-access-token", token)
          .send(newClassroom)
          .end((erro, resp) => {
            chai
              .request(server)
              .get(`/classrooms`)
              .end((error, response) => {
                response.should.have.status(200);
                response.body.should.be.a("array");
                response.body.should.not.have.lengthOf(0);
                done();
              });
          });
      });
  });
  it("should get classroom", (done) => {
    chai
      .request(server)
      .post("/users")
      .send(newUser)
      .end((err, res) => {
        const token = res.header["x-access-token"];
        chai
          .request(server)
          .post("/classrooms")
          .set("x-access-token", token)
          .send(newClassroom)
          .end((erro, resp) => {
            const { _id: classroomId } = resp.body;
            chai
              .request(server)
              .get(`/classrooms/${classroomId}`)
              .end((error, response) => {
                response.should.have.status(200);
                response.body.should.be.a("array");
                response.body.should.not.have.lengthOf(0);
                done();
              });
          });
      });
  });
  it("should update classroom: teacher", (done) => {
    chai
      .request(server)
      .post("/users")
      .send(newUser)
      .end((err, res) => {
        const { _id: userId } = JSON.parse(
          atob(res.header["x-access-token"].split(".")[1])
        );
        const token = res.header["x-access-token"];
        chai
          .request(server)
          .post("/classrooms")
          .set("x-access-token", token)
          .send(newClassroom)
          .end((erro, resp) => {
            const { _id: classroomId } = resp.body;
            const toUpdateDatas = {
              teacher: userId,
            };
            chai
              .request(server)
              .put(`/classrooms/${classroomId}`)
              .set("x-access-token", token)
              .send(toUpdateDatas)
              .end((error, response) => {
                response.should.have.status(200);
                response.body.should.be.a("object");
                done();
              });
          });
      });
  });
});

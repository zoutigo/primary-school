process.env.DEV_MODE = "test";
const assert = require("assert");
const faker = require("faker");
const chai = require("chai");
const atob = require("atob");
const chaiHttp = require("chai-http");
const mongoose = require("mongoose");
const server = require("../bin/www");

const getRandom = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

const newUser = {
  email: faker.internet.email(),
  password: "Valery54",
};
const newPaper = {
  type: "article",
  title: faker.company.companyName(),
  text: faker.lorem.paragraphs(4, "/"),
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

describe("PAPERS", () => {
  beforeEach((done) => {
    const {
      users,
      roles,
      rubrics,
      categories,
      classrooms,
      papers,
    } = mongoose.connection.collections;
    users.drop();
    roles.drop();
    rubrics.drop();
    categories.drop();

    classrooms.drop();
    done();
  });

  it("should create paper without classroomId", (done) => {
    chai
      .request(server)
      .post("/users")
      .send(newUser)
      .end((err, res) => {
        const token = res.header["x-access-token"];
        chai
          .request(server)
          .post("/papers")
          .set("x-access-token", token)
          .send(newPaper)
          .end((erro, resp) => {
            resp.should.have.status(201);
            done();
          });
      });
  });
  it("should create paper with classroomId", (done) => {
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
            newPaper.authorId = classroomId;
            chai
              .request(server)
              .post("/papers")
              .set("x-access-token", token)
              .send(newPaper)
              .end((error, response) => {
                response.should.have.status(201);
                response.should.be.a("object");
                done();
              });
          });
      });
  });
  it("should update paper", (done) => {
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
            newPaper.authorId = classroomId;
            chai
              .request(server)
              .post("/papers")
              .set("x-access-token", token)
              .send(newPaper)
              .end((error, response) => {
                const { _id: paperId } = response.body;
                const update = { title: faker.name.firstName() };
                chai
                  .request(server)
                  .post(`/papers/${paperId}`)
                  .set("x-access-token", token)
                  .send(update)
                  .end((error, response1) => {
                    response1.should.have.status(200);
                    done();
                  });
              });
          });
      });
  });
});

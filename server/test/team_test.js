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
const Classroom = require("../models/Classroom");

// Configure chai
chai.use(chaiHttp);
chai.should();

const fakeRoles = [
  "Les parents",
  "Les enseignants",
  "La direction",
  "secretariat-comptabilité",
  "personnel de cantine",
  "Les aides maternelles",
];
const Classrooms = [
  ["Petite Section", "ps"],
  ["Moyenne Section", "ms"],
  ["Grande Section", "gs"],
  ["CP", "cp"],
  ["CE1", "ce1"],
  ["CE2", "ce2"],
  ["CM1", "cm1"],
  ["CM2", "cm2"],
];

const newUser = {
  email: faker.internet.email(),
  password: "Valery54",
};
let TOKEN = "";

// create the 5 roles
// create the 8 classrooms
// create 8 teachers , 3 helpers, 1 assistant , 3 canteens, 1 director assigning roles
// update those users with name, firstname, gender
// assign classrooms to teachers and helpers
// call the /users/team route

describe("TEAM", () => {
  before((done) => {
    const { users, roles, classrooms } = mongoose.connection.collections;
    users.drop();
    roles.drop();
    classrooms.drop();

    done();
  });
  it("should create roles", (done) => {
    chai
      .request(server)
      .post("/users")
      .send(newUser)
      .end((err, res) => {
        const token = res.header["x-access-token"];
        res.body.should.be.a("object");
        fakeRoles.forEach((role) => {
          it(`should create ${role} role`, (done) => {
            const newRole = { name: role };
            chai
              .request(server)
              .post("/roles")
              .set("x-access-token", token)
              .send(newRole)
              .end((erro, resp) => {
                resp.should.have.status(201);
                done();
              });
          });
        });
        done();
      });
  });

  Classrooms.forEach((classroom) => {
    it(`should create ${classroom[0]} classroom`, (done) => {
      chai
        .request(server)
        .post("/users")
        .send({
          email: faker.internet.email(),
          password: "Valery54",
        })
        .end((err, res) => {
          const token = res.header["x-access-token"];
          const { _id: userId } = JSON.parse(
            atob(res.header["x-access-token"].split(".")[1])
          );
          let data = {
            name: faker.name.lastName(),
            firstname: faker.name.firstName(),
            gender: "monsieur",
          };

          chai
            .request(server)
            .put(`/users/${userId}`)
            .set("x-access-token", token)
            .send(data)
            .end(() => {
              chai
                .request(server)
                .post("/classrooms")
                .set("x-access-token", token)
                .send({ name: classroom[0], alias: classroom[1] })
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
                    .end((error, resp1) => {
                      resp1.should.have.status(200);
                      resp1.body.should.be.a("object");
                      done();
                    });
                });
            });
        });
    });
  });
});

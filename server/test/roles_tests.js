const chai = require("chai");
const chaiHttp = require("chai-http");
const faker = require("faker");
const atob = require("atob");
const server = require("../bin/www");
const User = require("../models/User");
const Role = require("../models/Roles");
const mongoose = require("mongoose");

// Configure chai
chai.use(chaiHttp);
chai.should();

const newUser = {
  email: faker.internet.email(),
  password: "Valery54",
  roles: ["parent"],
};

describe("ROLE ", () => {
  beforeEach((done) => {
    const { roles, users } = mongoose.connection.collections;
    roles.drop();
    users.drop();
    done();
  });

  it("should create role via model", (done) => {
    const role = new Role({
      name: faker.name.jobType(),
    });
    role.save().then(() => {
      role.should.be.a("object");
      done();
    });
  });
  it("should create role via route", (done) => {
    chai
      .request(server)
      .post("/users")
      .send(newUser)
      .end((err, res) => {
        const token = res.header["x-access-token"];

        const newRole = { name: faker.name.jobType() };
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
  it("should list roles", (done) => {
    chai
      .request(server)
      .post("/users")
      .send(newUser)
      .end((err, res) => {
        const token = res.header["x-access-token"];

        const newRole = { name: faker.name.jobType() };
        chai
          .request(server)
          .post("/roles")
          .set("x-access-token", token)
          .send(newRole)
          .end((erro, resp) => {
            chai
              .request(server)
              .get("/roles")
              .end((error, response) => {
                response.should.have.status(200);
                response.body.should.be.a("array");
                response.body.should.not.have.lengthOf(0);
                done();
              });
          });
      });
  });
  it("should get one role", (done) => {
    chai
      .request(server)
      .post("/users")
      .send(newUser)
      .end((err, res) => {
        const token = res.header["x-access-token"];
        const { _id: userId } = JSON.parse(
          atob(res.header["x-access-token"].split(".")[1])
        );
        const newRole = { name: faker.name.jobType() };
        chai
          .request(server)
          .post("/roles")
          .set("x-access-token", token)
          .send(newRole)
          .end((erro, resp) => {
            chai
              .request(server)
              .get(`/roles/${resp.body._id}`)
              .end((error, response) => {
                response.should.have.status(200);
                response.body.should.be.a("object");
                done();
              });
          });
      });
  });
  it("should modify role", (done) => {
    chai
      .request(server)
      .post("/users")
      .send(newUser)
      .end((err, res) => {
        const token = res.header["x-access-token"];
        const newRole = { name: faker.name.jobType() };
        chai
          .request(server)
          .post("/roles")
          .set("x-access-token", token)
          .send(newRole)
          .end((erro, resp) => {
            const { _id: roleId } = resp.body;
            chai
              .request(server)
              .put(`/roles/${roleId}`)
              .set("x-access-token", token)
              .send({ name: faker.name.jobType() })
              .end((error, response) => {
                response.should.have.status(200);
                response.body.should.be.a("object");
                done();
              });
          });
      });
  });
  it("should delete role", (done) => {
    chai
      .request(server)
      .post("/users")
      .send(newUser)
      .end((err, res) => {
        const token = res.header["x-access-token"];
        const newRole = { name: faker.name.jobType() };
        chai
          .request(server)
          .post("/roles")
          .set("x-access-token", token)
          .send(newRole)
          .end((erro, resp) => {
            const { _id: roleId } = resp.body;
            chai
              .request(server)
              .delete(`/roles/${roleId}`)
              .set("x-access-token", token)
              .end((error, response) => {
                response.should.have.status(200);
                done();
              });
          });
      });
  });
});

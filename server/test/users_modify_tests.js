const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../bin/www");
const faker = require("faker");
var atob = require("atob");
const User = require("../models/User");
const { response } = require("express");

// Configure chai
chai.use(chaiHttp);
chai.should();

const parent = {
  email: faker.internet.email(),
  password: "Valery54",
  roles: ["parent"],
};

describe("Users Modify ", () => {
  describe("logged as owner , submit name correct format ", () => {
    it("should return status 200 and nameerror message", (done) => {
      const requester = { email: "jerome@gmail.com", password: "Valery54" };
      const field = { name: faker.name.lastName() };
      chai
        .request(server)
        .post("/users/login")
        .send(requester)
        .end((err, res) => {
          const tokenString = res.header["x-access-token"];
          chai
            .request(server)
            .put("/users/5ff98b8c2fc14312dd031e17")
            .set("x-access-token", tokenString)
            .send(field)
            .end((err, resp) => {
              resp.should.have.status(200);
            });
          done();
        });
    });
  });
  // field firstname tests

  describe("logged as owner , submit firstname correct format ", () => {
    it("should return status 200 and firstname error message", (done) => {
      const requester = { email: "jerome@gmail.com", password: "Valery54" };
      const field = { firstname: faker.name.firstName() };
      chai
        .request(server)
        .post("/users/login")
        .send(requester)
        .end((err, res) => {
          const tokenString = res.header["x-access-token"];
          chai
            .request(server)
            .put("/users/5ff98b8c2fc14312dd031e17")
            .set("x-access-token", tokenString)
            .send(field)
            .end((err, resp) => {
              resp.should.have.status(200);
            });
          done();
        });
    });
  });
  // password tests to be written

  // password validation test to be written
  describe("logged as manager , grade modification ", () => {
    it("should return status 200 ", (done) => {
      chai
        .request(server)
        .post("/users")
        .send(parent)
        .end((err, res) => {
          const tokenString = res.header["x-access-token"];
          const { _id } = JSON.parse(
            atob(res.header["x-access-token"].split(".")[1])
          );
          const field = { grade: "moderator" };

          User.findOne({ grade: "manager" }).then((manager) => {
            const logs = { email: manager.email, password: "Valery54" };

            chai
              .request(server)
              .post(`/users/login`)
              .send(logs)
              .end((err, resp) => {
                const token = resp.header["x-access-token"];
                chai
                  .request(server)
                  .put(`/users/${_id}`)
                  .set("x-access-token", token)
                  .send(field)
                  .end((error, response) => {
                    response.should.have.status(200);
                    User.findOneAndDelete({ _id: _id }).then(() => done());
                  });
              });
          });
        });
    });
  });
  describe("logged as manager , roles modification, add roles ", () => {
    it("should return status 200 ", (done) => {
      chai
        .request(server)
        .post("/users")
        .send(parent)
        .end((err, res) => {
          const { _id } = JSON.parse(
            atob(res.header["x-access-token"].split(".")[1])
          );
          const field = { roles: ["teacher"], action: "add-roles" };

          User.findOne({ grade: "manager" }).then((manager) => {
            const logs = { email: manager.email, password: "Valery54" };

            chai
              .request(server)
              .post(`/users/login`)
              .send(logs)
              .end((err, resp) => {
                const token = resp.header["x-access-token"];
                chai
                  .request(server)
                  .put(`/users/${_id}`)
                  .set("x-access-token", token)
                  .send(field)
                  .end((error, response) => {
                    response.should.have.status(200);
                    User.findOneAndDelete({ _id: _id }).then(() => done());
                  });
              });
          });
        });
    });
  });
  describe("logged as manager , roles modification, remove roles ", () => {
    it("should return status 200 ", (done) => {
      chai
        .request(server)
        .post("/users")
        .send(parent)
        .end((err, res) => {
          const { _id } = JSON.parse(
            atob(res.header["x-access-token"].split(".")[1])
          );
          const field = { roles: ["parent"], action: "remove-roles" };

          User.findOne({ grade: "manager" }).then((manager) => {
            const logs = { email: manager.email, password: "Valery54" };

            chai
              .request(server)
              .post(`/users/login`)
              .send(logs)
              .end((err, resp) => {
                const token = resp.header["x-access-token"];
                chai
                  .request(server)
                  .put(`/users/${_id}`)
                  .set("x-access-token", token)
                  .send(field)
                  .end((error, response) => {
                    response.should.have.status(200);
                    User.findOneAndDelete({ _id: _id }).then(() => done());
                  });
              });
          });
        });
    });
  });
});

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../bin/www");
const faker = require("faker");
var atob = require("atob");

// Configure chai
chai.use(chaiHttp);
chai.should();

describe("Users POST ", () => {
  describe("No datas posted ", () => {
    it("should return status 400", (done) => {
      const errorMessage1 = JSON.stringify("missing datas");
      chai
        .request(server)
        .post("/users")
        .end((err, res) => {
          res.should.have.status(400);
          JSON.stringify(JSON.parse(res.error.text).message).should.equal(
            errorMessage1
          );
          done();
        });
    });
  });
  describe("not all datas submitted", () => {
    it("should return status 400 and error message 'missing datas'", (done) => {
      const errorMessage2 = JSON.stringify("missing datas");
      chai
        .request(server)
        .post("/users")
        .send({ email: "zoutigo@gmail" })
        .end((err, res) => {
          res.should.have.status(400);
          JSON.stringify(JSON.parse(res.error.text).message).should.equal(
            errorMessage2
          );
          done();
        });
    });
  });

  describe("fake email", () => {
    it("should return status 400 and email error message", (done) => {
      const emailErrorMessage = JSON.stringify('"email" must be a valid email');
      chai
        .request(server)
        .post("/users")
        .send({ email: "zoutigo@gmail", password: "val", roles: "" })
        .end((err, res) => {
          res.should.have.status(400);
          JSON.stringify(JSON.parse(res.error.text).message).should.equal(
            emailErrorMessage
          );
          done();
        });
    });
  });

  describe("fake password", () => {
    it("should return status 400 and password error message", (done) => {
      const password = "val";
      const passwordErrorMessage = JSON.stringify(
        `\"password\" with value \"${password}\" fails to match the required pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$/`
      );
      chai
        .request(server)
        .post("/users")
        .send({ email: "zoutigo@gmail.fr", password: password, roles: "" })
        .end((err, res) => {
          res.should.have.status(400);
          JSON.stringify(JSON.parse(res.error.text).message).should.equal(
            passwordErrorMessage
          );
          done();
        });
    });
  });

  describe("roles must be an array", () => {
    it("should return status 400 and roles error message", (done) => {
      const rolesErrorMessage1 = JSON.stringify(`"roles" must be an array`);
      chai
        .request(server)
        .post("/users")
        .send({
          email: "zoutigo@gmail.fr",
          password: "Guillaume2",
          roles: "valery",
        })
        .end((err, res) => {
          res.should.have.status(400);
          JSON.stringify(JSON.parse(res.error.text).message).should.equal(
            rolesErrorMessage1
          );
          done();
        });
    });
  });
  describe("roles values are ['parent','teacher']", () => {
    it("should return status 400 and roles error message", (done) => {
      const rolesErrorMessage2 = JSON.stringify(
        `"roles[0]" must be one of [parent, teacher]`
      );
      chai
        .request(server)
        .post("/users")
        .send({
          email: "zoutigo@gmail.fr",
          password: "Guillaume2",
          roles: ["friend"],
        })
        .end((err, res) => {
          res.should.have.status(400);
          JSON.stringify(JSON.parse(res.error.text).message).should.equal(
            rolesErrorMessage2
          );
          done();
        });
    });
  });
  describe("email should not exist in database", () => {
    it("should return status 400 and emailcheck error message", (done) => {
      const emailCheckMessage = JSON.stringify(`email already exists`);
      chai
        .request(server)
        .post("/users")
        .send({
          email: "emmanuel@yahoo.fr",
          password: "Guillaume2",
          roles: ["parent"],
        })
        .end((err, res) => {
          res.should.have.status(400);
          JSON.stringify(JSON.parse(res.error.text).message).should.equal(
            emailCheckMessage
          );
          done();
        });
    });
  });

  describe("user have been created", () => {
    it("should return status 201 and token", (done) => {
      const fakeEmail = faker.internet.email();

      chai
        .request(server)
        .post("/users")
        .send({
          email: fakeEmail,
          password: "Valery54",
          roles: ["parent"],
          test: true,
        })
        .end((err, res) => {
          var tokens = res.header["x-access-token"].split(".");
          res.should.have.status(201);
          JSON.parse(atob(tokens[1])).should.have.all.keys(
            "_id",
            "roles",
            "exp",
            "iat"
          );
          done();
        });
    });
  });
});

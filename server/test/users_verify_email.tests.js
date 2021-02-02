const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../bin/www");
const User = require("../models/User");
const faker = require("faker");

// Configure chai
chai.use(chaiHttp);
chai.should();

describe("EMAIL VERIFICATION", () => {
  describe("no datas in the body", () => {
    //
    it("should return status 400 and error message", (done) => {
      const errorMessage = JSON.stringify(`email is necessary`);
      chai
        .request(server)
        .post("/users/checkemail")
        .end((err, res) => {
          res.should.have.status(400);
          JSON.stringify(JSON.parse(res.error.text).message).should.equal(
            errorMessage
          );
          done();
        });
    });
  });
  describe("wrong format email", () => {
    //
    it("should return status 400 and error message", (done) => {
      const errorMessage = JSON.stringify(`email is necessary`);
      chai
        .request(server)
        .post("/users/checkemail")
        .end((err, res) => {
          res.should.have.status(400);
          JSON.stringify(JSON.parse(res.error.text).message).should.equal(
            errorMessage
          );
          done();
        });
    });
  });
  describe("email not in database", () => {
    //
    it("should return status 204", (done) => {
      chai
        .request(server)
        .post("/users/checkemail")
        .send({ email: faker.internet.email() })
        .end((err, res) => {
          res.should.have.status(204);

          done();
        });
    });
  });
  describe("email in database", () => {
    //
    it("should return status 200", (done) => {
      User.findOne({ test: true }).then((user) => {
        chai
          .request(server)
          .post("/users/checkemail")
          .send({ email: user.email })
          .end((err, res) => {
            res.should.have.status(200);

            done();
          });
      });
    });
  });
});

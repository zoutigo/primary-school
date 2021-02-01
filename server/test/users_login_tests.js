const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../bin/www");
const faker = require("faker");
var atob = require("atob");

// Configure chai
chai.use(chaiHttp);
chai.should();

describe("Users Login ", () => {
  describe("No datas posted ", () => {
    it("should return status 400", (done) => {
      chai
        .request(server)
        .post("/users/login")
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });

  describe("Only email posted ", () => {
    it("should return status 400", (done) => {
      chai
        .request(server)
        .post("/users/login")
        .send({ email: "zoutigo@gmail.fr" })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });
  describe("Only password posted ", () => {
    it("should return status 400", (done) => {
      chai
        .request(server)
        .post("/users/login")
        .send({ password: "Hola" })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });
  describe("Wrong format email", () => {
    it("should return status 400", (done) => {
      chai
        .request(server)
        .post("/users/login")
        .send({ email: "paf@yahoo", password: "Hola" })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });
  describe("Email not existing in database", () => {
    it("should return status 400", (done) => {
      chai
        .request(server)
        .post("/users/login")
        .send({
          email: "pafsdrhgfskhgfskgriygziuyg677z@yahoo.fr",
          password: "Hola",
        })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });
  describe("Wrong password", () => {
    it("should return status 400", (done) => {
      chai
        .request(server)
        .post("/users/login")
        .send({
          email: "emmanuel@yahoo.fr",
          password: "Caramba2057",
        })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });
  describe("Correct credentials and successfull login", () => {
    it("should return status 200 and token", (done) => {
      chai
        .request(server)
        .post("/users/login")
        .send({
          email: "emmanuel@yahoo.fr",
          password: "Valery54",
        })
        .end((err, res) => {
          const tokenString = res.header["x-access-token"].split(".");
          const token = JSON.parse(atob(tokenString[1]));

          res.should.have.status(200);
          token.should.have.all.keys(
            "_id",
            "roles",
            "exp",
            "name",
            "firstname",
            "iat",
            "grade"
          );
          token._id.should.not.have.lengthOf(0);
          token.roles.should.not.have.lengthOf(0);
          // token.exp.should.not.have.lengthOf(0);
          // token.iat.should.not.have.lengthOf(0);
          done();
        });
    });
  });
});

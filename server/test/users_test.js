const assert = require("assert");
const faker = require("faker");
const chai = require("chai");
const atob = require("atob");
const chaiHttp = require("chai-http");
const mongoose = require("mongoose");
const server = require("../bin/www");
const User = require("../models/User");
const Role = require("../models/Roles");

// Configure chai
chai.use(chaiHttp);
chai.should();

const newUser = {
  email: faker.internet.email(),
  password: "Valery54",
  roles: ["parent"],
};

describe("USER", () => {
  beforeEach((done) => {
    const { users } = mongoose.connection.collections;
    users.drop();
    done();
  });

  it("should model  create user", (done) => {
    const user = new User({
      email: faker.internet.email(),
      password: "Valery54",
    });
    user.save().then(() => {
      assert(!user.isNew);
      done();
    });
  });

  it("create user", (done) => {
    chai
      .request(server)
      .post("/users")
      .send(newUser)
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
  it("should loggin user successfully", (done) => {
    chai
      .request(server)
      .post("/users")
      .send(newUser)
      .end((err, res) => {
        chai
          .request(server)
          .post("/users/login")
          .send(newUser)
          .end((erro, resp) => {
            const tokenString = resp.header["x-access-token"].split(".");
            const tokenDatas = JSON.parse(atob(tokenString[1]));

            resp.should.have.status(200);
            // tokenDatas.should.have.all.keys(
            //   "_id",
            //   "roles",
            //   "exp",
            //   "name",
            //   "firstname",
            //   "iat",
            //   "grade"
            // );
            tokenDatas._id.should.not.have.lengthOf(0);
            done();
          });
      });
  });
  it("should get one user", (done) => {
    chai
      .request(server)
      .post("/users")
      .send(newUser)
      .end((err, res) => {
        const token = res.header["x-access-token"];
        const { _id: userId } = JSON.parse(
          atob(res.header["x-access-token"].split(".")[1])
        );
        chai
          .request(server)
          .get(`/users/${userId}`)
          .end((erro, resp) => {
            resp.should.have.status(200);
            resp.body.should.be.a("object");
            done();
          });
      });
  });
  it("should list users", (done) => {
    chai
      .request(server)
      .post("/users")
      .send(newUser)
      .end(() => {
        chai
          .request(server)
          .get("/users/list")
          .end((err, resp) => {
            resp.should.have.status(200);
            resp.body.should.be.a("array");
            resp.body.should.not.have.lengthOf(0);
            done();
          });
      });
  });
  it("should check email in db : case ok", (done) => {
    chai
      .request(server)
      .post("/users")
      .send(newUser)
      .end(() => {
        chai
          .request(server)
          .post("/users/checkemail")
          .send({ email: newUser.email })
          .end((err, resp) => {
            resp.should.have.status(200);
            done();
          });
      });
  });
  it("should check email in db : case Nok", (done) => {
    chai
      .request(server)
      .post("/users")
      .send(newUser)
      .end(() => {
        chai
          .request(server)
          .post("/users/checkemail")
          .send({ email: faker.internet.email() })
          .end((err, resp) => {
            resp.should.have.status(204);
            done();
          });
      });
  });
});

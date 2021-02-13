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

// Configure chai
chai.use(chaiHttp);
chai.should();

const newUser = {
  email: faker.internet.email(),
  password: "Valery54",
};

describe("USERS", () => {
  beforeEach((done) => {
    const { users, roles } = mongoose.connection.collections;
    users.drop();
    roles.drop();
    done();
  });

  it("should model  create user", (done) => {
    const user = new User(newUser);
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
  it("should modidy user as owner: update name", (done) => {
    chai
      .request(server)
      .post("/users")
      .send(newUser)
      .end((err, res) => {
        const token = res.header["x-access-token"];
        const { _id: userId } = JSON.parse(
          atob(res.header["x-access-token"].split(".")[1])
        );
        const data = { name: faker.name.lastName() };

        chai
          .request(server)
          .put(`/users/${userId}`)
          .set("x-access-token", token)
          .send(data)
          .end((erro, resp) => {
            resp.should.have.status(200);
            done();
          });
      });
  });
  it("should modidy user as owner: update firstname", (done) => {
    chai
      .request(server)
      .post("/users")
      .send(newUser)
      .end((err, res) => {
        const token = res.header["x-access-token"];
        const { _id: userId } = JSON.parse(
          atob(res.header["x-access-token"].split(".")[1])
        );
        const data = { firstname: faker.name.firstName() };

        chai
          .request(server)
          .put(`/users/${userId}`)
          .set("x-access-token", token)
          .send(data)
          .end((erro, resp) => {
            resp.should.have.status(200);
            done();
          });
      });
  });
  it("should modidy user as owner: update gender", (done) => {
    chai
      .request(server)
      .post("/users")
      .send(newUser)
      .end((err, res) => {
        const token = res.header["x-access-token"];
        const { _id: userId } = JSON.parse(
          atob(res.header["x-access-token"].split(".")[1])
        );
        const data = { gender: "monsieur" };
        chai
          .request(server)
          .put(`/users/${userId}`)
          .set("x-access-token", token)
          .send(data)
          .end((erro, resp) => {
            resp.should.have.status(200);
            done();
          });
      });
  });
  it("should modidy user as owner: update password", (done) => {
    chai
      .request(server)
      .post("/users")
      .send(newUser)
      .end((err, res) => {
        const token = res.header["x-access-token"];
        const { _id: userId } = JSON.parse(
          atob(res.header["x-access-token"].split(".")[1])
        );
        const data = {
          password: "Valery54",
          newPassword: "Jerome456",
          newPasswordConfirm: "Jerome456",
        };

        chai
          .request(server)
          .put(`/users/${userId}`)
          .set("x-access-token", token)
          .send(data)
          .end((erro, resp) => {
            resp.should.have.status(200);
            done();
          });
      });
  });
  it("should modidy user as owner: update grade", (done) => {
    chai
      .request(server)
      .post("/users")
      .send(newUser)
      .end((err, res) => {
        const token = res.header["x-access-token"];
        const { _id: userId } = JSON.parse(
          atob(res.header["x-access-token"].split(".")[1])
        );
        const data = { grade: "manager" };

        chai
          .request(server)
          .put(`/users/${userId}`)
          .set("x-access-token", token)
          .send(data)
          .end((erro, resp) => {
            resp.should.have.status(200);
            done();
          });
      });
  });
  it("should modidy user as owner: add roles", (done) => {
    chai
      .request(server)
      .post("/users")
      .send(newUser)
      .end((err, res) => {
        const token = res.header["x-access-token"];
        const { _id: userId } = JSON.parse(
          atob(res.header["x-access-token"].split(".")[1])
        );
        const role = { name: faker.name.jobType() };
        chai
          .request(server)
          .post("/roles")
          .set("x-access-token", token)
          .send(role)
          .end((erro, resp) => {
            const datas = {
              roles: [resp.body._id],
              action: "add-roles",
            };
            chai
              .request(server)
              .put(`/users/${userId}`)
              .set("x-access-token", token)
              .send(datas)
              .end((error, response) => {
                response.should.have.status(200);
                done();
              });
          });
      });
  });
  it("should modidy user as owner: remove roles", (done) => {
    chai
      .request(server)
      .post("/users")
      .send(newUser)
      .end((err, res) => {
        const token = res.header["x-access-token"];
        const { _id: userId } = JSON.parse(
          atob(res.header["x-access-token"].split(".")[1])
        );
        const role = { name: faker.name.jobType() };
        chai
          .request(server)
          .post("/roles")
          .set("x-access-token", token)
          .send(role)
          .end((erro, resp) => {
            const datas = {
              roles: [resp.body._id],
              action: "add-roles",
            };
            chai
              .request(server)
              .put(`/users/${userId}`)
              .set("x-access-token", token)
              .send(datas)
              .end((error, response) => {
                const removedatas = {
                  roles: [resp.body._id],
                  action: "remove-roles",
                };
                chai
                  .request(server)
                  .put(`/users/${userId}`)
                  .set("x-access-token", token)
                  .send(removedatas)
                  .end((err1, res1) => {
                    res1.should.have.status(200);
                    done();
                  });
              });
          });
      });
  });
});

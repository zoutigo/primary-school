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
  describe("No id param  ", () => {
    it("should return status 404", (done) => {
      chai
        .request(server)
        .put("/users")
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
  describe("not logged ", () => {
    it("should return status 401", (done) => {
      chai
        .request(server)
        .put("/users/5ff9a626f352aa0024e489bf")
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
  });
  describe("logged but not grade or not owner ", () => {
    it("should return status 401", (done) => {
      const requester = { email: "jerome@gmail.com", password: "Valery54" };
      chai
        .request(server)
        .post("/users/login")
        .send(requester)
        .end((err, res) => {
          const tokenString = res.header["x-access-token"];
          chai
            .request(server)
            .put("/users/5ff9a626f352aa0024e489bf")
            .set("x-access-token", tokenString)
            .end((err, resp) => {
              resp.should.have.status(401);
            });
          done();
        });
    });
  });
  describe("logged as owner, but no datas provided ", () => {
    it("should return status 400", (done) => {
      const requester = { email: "jerome@gmail.com", password: "Valery54" };
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
            .end((err, resp) => {
              resp.should.have.status(400);
            });
          done();
        });
    });
  });

  describe("logged as owner, but submit a fake property ", () => {
    it("should return status 400", (done) => {
      chai
        .request(server)
        .post("/users")
        .send(parent)
        .end((err, res) => {
          const tokenString = res.header["x-access-token"];
          const { _id } = JSON.parse(
            atob(res.header["x-access-token"].split(".")[1])
          );

          const fakeField1 = { names: faker.name.lastName() };
          chai
            .request(server)
            .put(`/users/${_id}`)
            .set("x-access-token", tokenString)
            .send(fakeField1)
            .end((err, resp) => {
              resp.should.have.status(400);
              User.findOneAndDelete({ _id: _id }).then(() => done());
            });
        });
    });
  });

  describe("logged as owner , submit name , with only 2 characters ", () => {
    it("should return status 400 and name error message", (done) => {
      const requester = { email: "jerome@gmail.com", password: "Valery54" };
      const field = { name: "bo" };
      const nameErrorMessage = JSON.stringify(
        `"name" length must be at least 3 characters long`
      );
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
              resp.should.have.status(400);
              JSON.stringify(JSON.parse(resp.error.text).message).should.equal(
                nameErrorMessage
              );
            });
          done();
        });
    });
  });
  describe("logged as owner , submit name , with more than 20 characters ", () => {
    it("should return status 400 and nameerror message", (done) => {
      const requester = { email: "jerome@gmail.com", password: "Valery54" };
      const field = { name: "bohrtydoutpldbtrefvdtuogpmetsbgertojfnhtsdre" };
      const nameErrorMessage = JSON.stringify(
        `"name" length must be less than or equal to 20 characters long`
      );
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
              resp.should.have.status(400);
              JSON.stringify(JSON.parse(resp.error.text).message).should.equal(
                nameErrorMessage
              );
            });
          done();
        });
    });
  });
  describe("logged as owner , submit name , number ", () => {
    it("should return status 400 and nameerror message", (done) => {
      const requester = { email: "jerome@gmail.com", password: "Valery54" };
      const field = { name: 1235678990 };
      const nameErrorMessage = JSON.stringify(`"name" must be a string`);
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
              resp.should.have.status(400);
              JSON.stringify(JSON.parse(resp.error.text).message).should.equal(
                nameErrorMessage
              );
            });
          done();
        });
    });
  });
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
  describe("logged as owner , submit firstname , with only 2 characters ", () => {
    it("should return status 400 and firtname error message", (done) => {
      const requester = { email: "jerome@gmail.com", password: "Valery54" };
      const field = { firstname: "bo" };
      const firstnameErrorMessage = JSON.stringify(
        `"firstname" length must be at least 3 characters long`
      );
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
              resp.should.have.status(400);
              JSON.stringify(JSON.parse(resp.error.text).message).should.equal(
                firstnameErrorMessage
              );
            });
          done();
        });
    });
  });
  describe("logged as owner , submit firstname , with more than 20 characters ", () => {
    it("should return status 400 and firstname error message", (done) => {
      const requester = { email: "jerome@gmail.com", password: "Valery54" };
      const field = {
        firstname: "bohrtydoutpldbtrefvdtuogpmetsbgertojfnhtsdre",
      };
      const firstnameErrorMessage = JSON.stringify(
        `"firstname" length must be less than or equal to 20 characters long`
      );
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
              resp.should.have.status(400);
              JSON.stringify(JSON.parse(resp.error.text).message).should.equal(
                firstnameErrorMessage
              );
            });
          done();
        });
    });
  });
  describe("logged as owner , submit firstname , number ", () => {
    it("should return status 400 and fisrt name error message", (done) => {
      const requester = { email: "jerome@gmail.com", password: "Valery54" };
      const field = { firstname: 1235678990 };
      const firstnameErrorMessage = JSON.stringify(
        `"firstname" must be a string`
      );
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
              resp.should.have.status(400);
              JSON.stringify(JSON.parse(resp.error.text).message).should.equal(
                firstnameErrorMessage
              );
            });
          done();
        });
    });
  });
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
  describe("logged as owner , try grade modification ", () => {
    it("should return status 401 and grade error message", (done) => {
      const requester = { email: "jerome@gmail.com", password: "Valery54" };
      const field = { grade: "manager" };
      const gradeErrorMessage = JSON.stringify(
        `only manager or admin can change grade`
      );
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
              resp.should.have.status(401);
              JSON.stringify(JSON.parse(resp.error.text).message).should.equal(
                gradeErrorMessage
              );
            });
          done();
        });
    });
  });
  describe("logged as owner , try roles modification ", () => {
    it("should return status 401 and roles error message", (done) => {
      const requester = { email: "jerome@gmail.com", password: "Valery54" };
      const field = { roles: "teacher" };
      const rolesErrorMessage = JSON.stringify(
        `not enough grade to do change user roles`
      );
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
              resp.should.have.status(401);
              JSON.stringify(JSON.parse(resp.error.text).message).should.equal(
                rolesErrorMessage
              );
            });
          done();
        });
    });
  });
  describe("logged as manager , try name modification ", () => {
    it("should return status 400 and name error message", (done) => {
      User.findOne({ grade: "manager" }).then((manager) => {
        const requester = { email: manager.email, password: "Valery54" };
        const field = { name: faker.name.lastName() };
        const nameErrorMessage = JSON.stringify(`only the owner can modify`);

        chai
          .request(server)
          .post("/users/login")
          .send(requester)
          .end((err, res) => {
            const tokenString = res.header["x-access-token"];

            chai
              .request(server)
              .post("/users")
              .send({
                email: faker.internet.email(),
                password: "Guillaume24",
                roles: ["parent"],
              })
              .end((erro, resp) => {
                const userTokens = resp.header["x-access-token"].split(".");
                const userId = JSON.parse(atob(userTokens[1]))._id;

                chai
                  .request(server)
                  .put(`/users/${userId}`)
                  .set("x-access-token", tokenString)
                  .send(field)
                  .end((error, respo) => {
                    respo.should.have.status(401);
                    JSON.stringify(
                      JSON.parse(respo.error.text).message
                    ).should.equal(nameErrorMessage);

                    User.findOneAndDelete({ _id: userId }).then(() => done());
                  });
              });
          });
      });
    });
  });
  describe("logged as manager , try firstname modification ", () => {
    it("should return status 400 and firstname error message", (done) => {
      const requester = { email: "emmanuel@yahoo.fr", password: "Valery54" };
      const field = { firstname: faker.name.lastName() };
      const firstnameErrorMessage = JSON.stringify(`only the owner can modify`);
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
              resp.should.have.status(401);
              JSON.stringify(JSON.parse(resp.error.text).message).should.equal(
                firstnameErrorMessage
              );
            });
          done();
        });
    });
  });

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

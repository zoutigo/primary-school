const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../bin/www");
const faker = require("faker");
var atob = require("atob");
const User = require("../models/User");
const Rubric = require("../models/Rubric");

// Configure chai
chai.use(chaiHttp);
chai.should();

describe("RUBRIC CREATE ", () => {
  describe("requester not an admin  ", () => {
    it("should return status 401", (done) => {
      const email1 = faker.internet.email();
      const rubricName = faker.name.middleName();
      const user1 = { email: email1, password: "Valery54", roles: ["parent"] };
      const rubric1 = { name: rubricName };
      chai
        .request(server)
        .post("/users")
        .send(user1)
        .end((err, res) => {
          const tokenString = res.header["x-access-token"];
          chai
            .request(server)
            .post("/rubrics")
            .set("x-access-token", tokenString)
            .send({ rubric: rubric1 })
            .end((err, resp) => {
              resp.should.have.status(401);
              User.findOneAndDelete({ email: email1 }).then(() => done());
            });
        });
    });
  });

  describe("requester is  admin no datas ", () => {
    it("should return status 401", (done) => {
      const rubricName = faker.name.middleName();

      User.findOne({ grade: "admin", test: true }).then((user) => {
        const user1 = { email: user.email, password: "Valery54" };
        chai
          .request(server)
          .post("/users/login")
          .send(user1)
          .end((err, res) => {
            const tokenString = res.header["x-access-token"];
            chai
              .request(server)
              .post("/rubrics")
              .set("x-access-token", tokenString)
              .end((err, resp) => {
                resp.should.have.status(400);
                done();
              });
          });
      });
    });
  });
  // rubrics validotors test to write

  describe("requester is  admin correct rubric name", () => {
    it("should return status 201", (done) => {
      const rubricName = faker.name.lastName();
      const rubric1 = { name: rubricName };

      User.findOne({ grade: "admin", test: true }).then((user) => {
        const user1 = { email: user.email, password: "Valery54" };
        chai
          .request(server)
          .post("/users/login")
          .send(user1)
          .end((err, res) => {
            const tokenString = res.header["x-access-token"];
            chai
              .request(server)
              .post("/rubrics")
              .set("x-access-token", tokenString)
              .send(rubric1)
              .end((err, resp) => {
                resp.should.have.status(201);
                resp.body.should.be.a("object");
                Rubric.findOneAndDelete({ _id: resp.body._id }).then(() =>
                  done()
                );
              });
          });
      });
    });
  });
});

// describe("requester  admin, no datas  ", () => {
//   it("should return status 400", (done) => {
//     User.findOne({
//       test: true,
//       grade: "admin",
//     }).then((user) => {
//       const requester = { email: user.email, password: "Valery54" };
//       console.log(requester);
//       chai
//         .request(server)
//         .post("/users/login")
//         .send(requester)
//         .end((err, res) => {
//           const tokenString = res.header["x-access-token"];
//           console.log(res);
//           chai
//             .request(server)
//             .post("/rubrics")
//             .set("x-access-token", tokenString)
//             .end((err, resp) => {
//               resp.should.have.status(400);
//               done();
//             });
//         });
//     });
//   });
// });

// const chai = require("chai");
// const chaiHttp = require("chai-http");
// const server = require("../bin/www");
// const faker = require("faker");
// var atob = require("atob");
// const User = require("../models/User");
// const Rubric = require("../models/Rubric");

// // Configure chai
// chai.use(chaiHttp);
// chai.should();

// describe("RUBRIC CREATE ", () => {
//   describe("requester is  admin correct rubric name", () => {
//     it("should return status 201", (done) => {
//       const rubricName = faker.name.lastName();
//       const rubric1 = { name: rubricName };

//       User.findOne({ grade: "admin", test: true }).then((user) => {
//         const user1 = { email: user.email, password: "Valery54" };
//         chai
//           .request(server)
//           .post("/users/login")
//           .send(user1)
//           .end((err, res) => {
//             const tokenString = res.header["x-access-token"];
//             chai
//               .request(server)
//               .post("/rubrics")
//               .set("x-access-token", tokenString)
//               .send(rubric1)
//               .end((err, resp) => {
//                 resp.should.have.status(201);
//                 resp.body.should.be.a("object");
//                 Rubric.findOneAndDelete({ _id: resp.body._id }).then(() =>
//                   done()
//                 );
//               });
//           });
//       });
//     });
//   });
// });

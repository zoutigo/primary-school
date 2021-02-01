const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../bin/www");

// Configure chai
chai.use(chaiHttp);
chai.should();

describe("Users List", () => {
  describe("List users", () => {
    //
    it("should get all students record", (done) => {
      chai
        .request(server)
        .get("/users/list")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.should.not.have.lengthOf(0);
          done();
        });
    });
  });

  // test to get a single user record
  // describe("Get one user", () => {
  //   it("should get one user", (done) => {
  //     let id = "601280315373c7f72b20142f";
  //     chai
  //       .request(server)
  //       .get(`/users/${id}`)
  //       .end((err, res) => {
  //         res.should.have.status(200);
  //         res.body.should.be.a("object");
  //         res.body.email.should.not.have.lengthOf(0);
  //         res.body.password.should.not.have.lengthOf(0);
  //         res.body.roles.should.not.have.lengthOf(0);
  //         done();
  //       });
  //   });
  // });
});

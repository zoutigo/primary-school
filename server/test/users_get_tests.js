const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../bin/www");

// Configure chai
chai.use(chaiHttp);
chai.should();

describe("Users GET '/id'", () => {
  describe("Missing id ", () => {
    it("should return 404 status for missing id param", (done) => {
      chai
        .request(server)
        .get("/users")
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });

  // test to get a single user record
  describe("fake id", () => {
    it("should 404 for a wrong id param", (done) => {
      let id = "601280315373c7f72b20142";
      chai
        .request(server)
        .get(`/users/${id}`)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });

  describe("Get one user", () => {
    it("should get the requested user", (done) => {
      let id = "601280315373c7f72b20142f";
      chai
        .request(server)
        .get(`/users/${id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.email.should.not.have.lengthOf(0);
          res.body.password.should.not.have.lengthOf(0);
          res.body.roles.should.not.have.lengthOf(0);
          done();
        });
    });
  });
});

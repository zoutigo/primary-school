const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../bin/www");

// Configure chai
chai.use(chaiHttp);
chai.should();

describe("RUBRICS LIST", () => {
  // cannot test case there are no rubrics found , sattus 204
  describe("get all rubrics", () => {
    it("should return status 200 and not empty array", (done) => {
      chai
        .request(server)
        .get("/rubrics")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.should.not.have.lengthOf(0);
          done();
        });
    });
  });
});

const chai = require("chai");
const chaiHttp = require("chai-http");
const mongoose = require("mongoose");
const server = require("../bin/www");
const faker = require("faker");
const Rubric = require("../models/Rubric");

// Configure chai
chai.use(chaiHttp);
chai.should();

describe("RUBRIC GET", () => {
  // cannot test case there are no rubrics found , sattus 204

  describe("get rubric by id", () => {
    it("should return status 200", (done) => {
      Rubric.findOne().then((rubric) => {
        chai
          .request(server)
          .get(`/rubrics/${rubric._id}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            done();
          });
      });
    });
  });
});

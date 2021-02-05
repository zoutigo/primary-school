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
  describe("get rubric by id, wrong format id", () => {
    it("should return status 400", (done) => {
      chai
        .request(server)
        .get("/rubrics/5ff2eb3f613cfe459504ef")
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });
  // test to be improved
  // describe("get rubric by id, fake id", () => {
  //   it("should return status 204", (done) => {
  //     const id = mongoose.Types.ObjectId();
  //     chai
  //       .request(server)
  //       .get(`/rubrics/${id}`)
  //       .end((err, res) => {
  //         res.should.have.status(204);
  //         done();
  //       });
  //   });
  // });
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

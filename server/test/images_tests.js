process.env.DEV_MODE = "test";
const chai = require("chai");
const chaiHttp = require("chai-http");
const mongoose = require("mongoose");
const faker = require("faker");

const server = require("../bin/www");

// Configure chai
chai.use(chaiHttp);
chai.should();

describe("IMAGE ", () => {
  beforeEach((done) => {
    const { images } = mongoose.connection.collections;
    images.drop();
    done();
  });

  it("should create image in db and store it in public/images/uploads", (done) => {
    let file = {
      fileName: "devJoke.png",
    };
    chai
      .request(server)
      .post("/images")
      .set("Content-Type", "application/x-www-form-urlencoded")
      .field("Content-Type", "multipart/form-data")
      .field("fileName", "image")
      .attach(
        "files",
        "/home/valery/Documents/Projets/Augustin/images/pexels-pixabay-163064.jpg"
      )
      .end((err, res) => {
        if (err) {
          console.log(err);
        } else {
          res.should.have.status(201);
          res.body.should.be.a("object");
          res.body.should.have.property("data").eql("File Uploaded");
        }
      });

    done();
  });
});

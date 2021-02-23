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

const newPage = {
  alias: faker.name.firstName(),
  title: faker.company.companyName(),
  text: `<p>${faker.lorem.paragraph()}</p>`,
};

describe("PAGE ", () => {
  beforeEach((done) => {
    const { users, roles, pages, classrooms } = mongoose.connection.collections;
    users.drop();
    roles.drop();
    pages.drop();
    classrooms.drop();
    done();
  });

  it("should create page ", (done) => {
    chai
      .request(server)
      .post("/users")
      .send(newUser)
      .end((err, res) => {
        const token = res.header["x-access-token"];
        chai
          .request(server)
          .post("/pages")
          .set("x-access-token", token)
          .send(newPage)
          .end((erro, resp) => {
            resp.should.have.status(201);
            resp.body.should.be.a("object");
            done();
          });
      });
  });
  it("should list all pages", (done) => {
    chai
      .request(server)
      .post("/users")
      .send(newUser)
      .end((err, res) => {
        const token = res.header["x-access-token"];
        chai
          .request(server)
          .post("/pages")
          .set("x-access-token", token)
          .send(newPage)
          .end((erro, resp) => {
            chai
              .request(server)
              .get("/pages")
              .end((error, response) => {
                response.should.have.status(200);
                response.body.should.be.a("array");
                response.body.should.not.have.lengthOf(0);
                done();
              });
          });
      });
  });
  it("should modify page: text only", (done) => {
    chai
      .request(server)
      .post("/users")
      .send(newUser)
      .end((err, res) => {
        const token = res.header["x-access-token"];
        chai
          .request(server)
          .post("/pages")
          .set("x-access-token", token)
          .send(newPage)
          .end((erro, resp) => {
            const { _id: pageId } = resp.body;
            const datas = { text: faker.lorem.paragraph() };

            chai
              .request(server)
              .put(`/pages/${pageId}`)
              .set("x-access-token", token)
              .send(datas)
              .end((error, response) => {
                response.should.have.status(200);
                response.body.should.be.a("object");
                done();
              });
          });
      });
  });
  it("should delete page", (done) => {
    chai
      .request(server)
      .post("/users")
      .send(newUser)
      .end((err, res) => {
        const token = res.header["x-access-token"];
        chai
          .request(server)
          .post("/pages")
          .set("x-access-token", token)
          .send(newPage)
          .end((erro, resp) => {
            const { _id: pageId } = resp.body;
            const datas = { text: faker.lorem.paragraph() };

            chai
              .request(server)
              .delete(`/pages/${pageId}`)
              .set("x-access-token", token)
              .end((error, response) => {
                response.should.have.status(200);
                done();
              });
          });
      });
  });
});

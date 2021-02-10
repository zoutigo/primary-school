const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../bin/www");
const faker = require("faker");
var atob = require("atob");
const User = require("../models/User");
const Rubric = require("../models/Rubric");
const Category = require("../models/Category");

// Configure chai
chai.use(chaiHttp);
chai.should();

describe("RUBRIC UPDATE ", () => {
  describe("logged as admin : name modification", () => {
    it("should return status 400", (done) => {
      const email = faker.internet.email();
      const newUser = {
        email: email,
        password: "Valery54",
        roles: ["parent"],
      };
      User.findOne({ test: true, grade: "admin" }).then((admin) => {
        const fakeAdmin = { email: admin.email, password: "Valery54" };
        chai
          .request(server)
          .post("/users/login")
          .send(fakeAdmin)
          .end((err, res) => {
            const tokenString = res.header["x-access-token"];
            const fakeRubric = { name: faker.name.lastName() };
            chai
              .request(server)
              .post("/rubrics")
              .set("x-access-token", tokenString)
              .send(fakeRubric)
              .end((erro, respo) => {
                const { _id } = respo.body;
                const rubricName = { name: faker.name.lastName() };
                chai
                  .request(server)
                  .put(`/rubrics/${_id}`)
                  .set("x-access-token", tokenString)
                  .send(rubricName)
                  .end((error, response) => {
                    response.should.have.status(200);
                    Rubric.findOneAndDelete({ _id: _id });
                    done();
                  });
              });
          });
      });
    });
  });
  describe("logged as admin : add  category", () => {
    it("should return status 200", (done) => {
      const email = faker.internet.email();
      const newUser = {
        email: email,
        password: "Valery54",
        roles: ["parent"],
      };
      User.findOne({ test: true, grade: "admin" }).then((admin) => {
        const fakeAdmin = { email: admin.email, password: "Valery54" };
        chai
          .request(server)
          .post("/users/login")
          .send(fakeAdmin)
          .end((err, res) => {
            const tokenString = res.header["x-access-token"];
            const fakeRubric = { name: faker.name.lastName() };
            chai
              .request(server)
              .post("/rubrics")
              .set("x-access-token", tokenString)
              .send(fakeRubric)
              .end((erro, respo) => {
                Category.findOne().then((category) => {
                  const { _id } = respo.body;
                  const categories = [category._id];
                  const action = "add-categories";
                  const datas = { categories: categories, action: action };
                  chai
                    .request(server)
                    .put(`/rubrics/${_id}`)
                    .set("x-access-token", tokenString)
                    .send(datas)
                    .end((error, response) => {
                      response.should.have.status(200);
                      response.body.categories.length.should.equal(1);
                      Rubric.findOneAndDelete({ _id: _id });
                      done();
                    });
                });
              });
          });
      });
    });
  });
  describe("logged as admin : remove  category", () => {
    it("should return status 200", (done) => {
      const email = faker.internet.email();
      const newUser = {
        email: email,
        password: "Valery54",
        roles: ["parent"],
      };
      User.findOne({ test: true, grade: "admin" }).then((admin) => {
        const fakeAdmin = { email: admin.email, password: "Valery54" };
        chai
          .request(server)
          .post("/users/login")
          .send(fakeAdmin)
          .end((err, res) => {
            const tokenString = res.header["x-access-token"];
            const fakeRubric = { name: faker.name.lastName() };
            chai
              .request(server)
              .post("/rubrics")
              .set("x-access-token", tokenString)
              .send(fakeRubric)
              .end((erro, respo) => {
                Category.findOne().then((category) => {
                  const { _id } = respo.body;
                  const categories = [category._id];
                  const action = "add-categories";
                  const addDatas = { categories: categories, action: action };
                  chai
                    .request(server)
                    .put(`/rubrics/${_id}`)
                    .set("x-access-token", tokenString)
                    .send(addDatas)
                    .end((error, response) => {
                      response.should.have.status(200);
                      const removeDatas = {
                        categories: categories,
                        action: "remove-categories",
                      };
                      chai
                        .request(server)
                        .put(`/rubrics/${_id}`)
                        .set("x-access-token", tokenString)
                        .send(removeDatas)
                        .end((errors, responses) => {
                          // console.log(responses);
                          const count = responses.body.categories.length;
                          responses.should.have.status(200);
                          count.should.equal(0);
                          Rubric.findOneAndDelete({ _id: _id });
                          done();
                        });
                    });
                });
              });
          });
      });
    });
  });
});

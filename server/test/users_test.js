const assert = require("assert");
const User = require("../models/User");
const faker = require("faker");

describe("User Model", () => {
  it("create user", (done) => {
    const user = new User({
      email: faker.internet.email(),
      password: "Valery54",
      roles: ["parent"],
      test: true,
    });
    user.save().then(() => {
      assert(!user.isNew);
      User.findOneAndDelete({ _id: user._id }).then(() => done());
    });
  });
});

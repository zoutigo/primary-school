const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const pageSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
  },
  alias: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 30,
  },

  text: {
    type: String,
    required: true,
    maxlength: 50000,
  },

  status: {
    type: String,
    enum: ["draft", "undervalidation", "released"],
    default: "draft",
  },
});

module.exports = mongoose.model("Page", pageSchema);

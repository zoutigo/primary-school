const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const paperSchema = new Schema({
  type: {
    type: String,
    enum: ["article", "activity", "parent-info", "newsletter", "menu"],
    required: true,
  },

  title: {
    type: String,
    default: null,
    minlength: 3,
    maxlength: 100,
  },
  entity: {
    type: String,
    default: "direction",
    enum: [
      "direction",
      "apel",
      "ogec",
      "ps",
      "ms",
      "gs",
      "cp",
      "ce1",
      "ce2",
      "cm1",
    ],
    required: true,
  },

  text: {
    type: String,
    maxlength: 200000,
    minlength: 3,
  },

  date: {
    type: Number,
    default: new Date().getTime(),
  },
  file: {
    type: String,
  },
  startdate: { type: Number },
  enddate: { type: Number },
  authorId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  status: {
    type: String,
    enum: ["draft", "undervalidation", "released"],
    default: "released",
  },
  tags: [{ type: String }],
  mediasPaths: [{ type: String }],
});

module.exports = mongoose.model("Paper", paperSchema);

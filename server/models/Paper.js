const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const paperSchema = new Schema({
  type: {
    type: String,
    enum: ["article", "newsletter", "activity", "parent-info"],
    required: true,
  },
  classroomId: {
    type: Schema.Types.ObjectId,
    ref: "Classroom",
  },

  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100,
  },

  text: {
    type: String,
    required: true,
    maxlength: 200000,
    minlength: 3,
  },

  date: {
    type: Number,
    default: new Date().getTime(),
  },
  authorId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  mediasPaths: [{ type: String }],
  status: {
    type: String,
    enum: ["draft", "undervalidation", "released"],
    default: "draft",
  },
});

module.exports = mongoose.model("Paper", paperSchema);

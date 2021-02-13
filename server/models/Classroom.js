const mongoose = require("mongoose");
const { pictureSchema, Picture } = require("./Picture");
const Schema = mongoose.Schema;

const classroomSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    minlength: 10,
    maxlength: 300,
  },
  alias: {
    type: String,
    enum: ["ps", "ms", "gs", "cp", "ce1", "ce2", "cm1", "cm2"],
    required: true,
    unique: true,
  },
  teacher: {
    type: Schema.ObjectId,
    ref: "User",
  },
  helper: {
    type: Schema.ObjectId,
    ref: "User",
  },
  albums: {
    type: String,
  },
  images: [
    {
      type: Schema.ObjectId,
      ref: "Picture",
    },
  ],
  papers: [
    {
      type: Schema.ObjectId,
      ref: "Paper",
    },
  ],
});

module.exports = mongoose.model("Classroom", classroomSchema);

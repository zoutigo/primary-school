const mongoose = require("mongoose");
const { imageSchema, Image } = require("./Image");
const Schema = mongoose.Schema;

const classroomSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    minlength: 10,
    maxlength: 500,
    default: "Nous sommes la classe la plus sympa au monde",
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
    default: "6026a1bd31aa34384e1c9c8e",
  },
  helper: {
    type: Schema.ObjectId,
    ref: "User",
    default: "6026a1bd31aa34384e1c9c8e",
  },
  students: {
    type: Number,
    default: 15,
  },
  email: {
    type: String,
    maxlength: 50,
    minlength: 3,
    default: "saint-augustin@gmail.com",
  },
  albums: {
    type: String,
  },
  image: {
    type: Schema.ObjectId,
    ref: "Image",
  },

  papers: [
    {
      type: Schema.ObjectId,
      ref: "Paper",
    },
  ],
});

module.exports = mongoose.model("Classroom", classroomSchema);

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
    maxlength: 300,
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
  albums: {
    type: String,
  },
  images: [
    {
      type: Schema.ObjectId,
      ref: "Image",
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

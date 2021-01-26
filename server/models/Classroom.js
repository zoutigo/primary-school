const mongoose = require("mongoose");
const { pictureSchema, Picture } = require("./Picture");
const Schema = mongoose.Schema;

const classroomSchema = new Schema({
  _classroom_name: {
    type: String,
    required: true,
  },
  _classroom_summary: {
    type: String,
    minlength: 10,
    maxlength: 300,
  },
  _classroom_alias: {
    type: String,
    enum: ["ps", "ms", "gs", "ce1", "ce2", "cm1", "cm2"],
    required: true,
    unique: true,
  },
  _classroom_teatcher: {
    type: Schema.ObjectId,
    ref: "User",
  },
  _classroom_helper: {
    type: Schema.ObjectId,
    ref: "User",
  },
  _classroom_albums: {
    type: String,
  },
  _classroom_images: [
    {
      type: Schema.ObjectId,
      ref: "Picture",
    },
  ],
  _classroom_papers: [
    {
      type: Schema.ObjectId,
      ref: "Paper",
    },
  ],
});

module.exports = mongoose.model("Classroom", classroomSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const imageSchema = new Schema({
  filename: {
    type: String,
    required: true,
    max: 200,
  },
  path: {
    type: String,
    required: true,
    max: 300000,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  // parent can be article or event or User or classroom
  author: {
    type: Schema.ObjectId,
    ref: "User",
  },
  alt: {
    type: String,
    min: 3,
    max: 50,
  },
});

module.exports = mongoose.model("Image", imageSchema);

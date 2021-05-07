const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fileSchema = new Schema({
  title: {
    type: String,
    min: 3,
    max: 500,
  },
  type: {
    type: String,
    required: true,
    enum: ["menu", "newsletter", "document", "image"],
  },
  description: {
    type: String,
    min: 10,
    max: 500,
  },
  url: {
    type: String,
    min: 10,
    max: 500,
    required: true,
  },
  date: {
    type: Date,
  },
  validweek: {
    type: Number,
  },
  startdate: {
    type: Number,
  },
  enddate: {
    type: Number,
  },
  month: {
    type: Number,
  },

  author: {
    type: Schema.Types.ObjectId,
  },
  createdat: {
    type: Date,
    default: Date.now(),
    required: true,
  },
});

module.exports = mongoose.model("File", fileSchema);

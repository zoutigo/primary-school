const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");

const eventSchema = new Schema({
  title: {
    type: String,
    min: 3,
    max: 100,
    required: true,
  },
  text: {
    type: String,
    min: 10,
    max: 500,
  },
  place: {
    type: String,
    required: true,
    min: 4,
    max: 100,
    default: "Ecole Saint Augustin",
  },
  date: {
    type: Date,
    required: true,
  },

  author: {
    type: Schema.Types.ObjectId,
  },
  createdat: {
    type: String,
    default: new Date().getTime(),
  },
});

module.exports = mongoose.model("Event", eventSchema);

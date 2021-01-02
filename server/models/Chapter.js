const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const chapterSchema = new Schema({
  chapter_name: { type: String, required: true, maxlength: 30, minlength: 3 },
});

module.exports = mongoose.model("Chapter", chapterSchema);

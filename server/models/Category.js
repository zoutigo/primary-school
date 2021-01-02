const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const categorySchema = new Schema({
  cat_name: { type: String, required: true },
  cat_chapters: [{ type: Schema.Types.ObjectId, ref: "Chapter" }],
});

module.exports = mongoose.model("Category", categorySchema);

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const categorySchema = new Schema({
  category_name: { type: String, required: true },
  category_chapters: [{ type: Schema.Types.ObjectId, ref: "Chapter" }],
});

module.exports = mongoose.model("Category", categorySchema);

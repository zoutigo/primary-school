const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: { type: String, required: true },
  chapters: [{ type: Schema.Types.ObjectId, ref: "Chapter" }],
});

module.exports = mongoose.model("Category", categorySchema);

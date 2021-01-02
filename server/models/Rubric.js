const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const rubricSchema = new Schema({
  r_name: {
    type: String,
    required: true,
  },
  r_categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
});
module.exports = mongoose.model("Rubric", rubricSchema);

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const rubricSchema = new Schema({
  rubric_name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
  },
  rubric_categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
});
module.exports = mongoose.model("Rubric", rubricSchema);

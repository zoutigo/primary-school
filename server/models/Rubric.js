const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const rubricSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
  },
  alias: {
    type: String,
    unique: true,
    minlength: 2,
    maxlength: 20,
  },
  images: [
    {
      type: Schema.Types.ObjectId,
      ref: "Picures",
    },
  ],
  test: {
    type: Boolean,
    default: false,
  },
  categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
});
module.exports = mongoose.model("Rubric", rubricSchema);

const mongoose = require("mongoose");
const { commentSchema } = require("./Comment");
const { ImageSchema, Picture } = require("./Picture");

const Schema = mongoose.Schema;
const paperSchema = new Schema({
  rubric: {
    type: String,
    enum: ["ecole", "vie-scolaire", "informations", "apel-ogec"],
  },

  category: {
    type: String,
    enum: ["news", "information", "activity"],
    required: true,
  },
  title: {
    type: String,
    required: true,
  },

  text: {
    type: String,
    required: true,
  },

  target: {
    type: String,
    enum: ["classroom", "school", "public"],
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  images: [ImageSchema],

  createdAt: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  mediaPath: [{ type: String }],
  status: {
    type: String,
    enum: ["draft", "undervalidation", "released"],
    default: "draft",
  },
});

module.exports = mongoose.model("Paper", paperSchema);

const mongoose = require("mongoose");
const { commentSchema } = require("./Comment");
const { ImageSchema, Picture } = require("./Picture");

const Schema = mongoose.Schema;
const paperSchema = new Schema({
  paper_rubric: { type: Schema.Types.ObjectId, ref: "Rubric", required: true },
  paper_category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  paper_chapter: {
    type: Schema.Types.ObjectId,
    ref: "Chapter",
    required: true,
  },
  paper_type: {
    enum: ["article", "news", "event", "important"],
    required: true,
  },

  paper_title: {
    type: String,
    required: true,
  },

  content: {
    type: String,
    required: true,
  },

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

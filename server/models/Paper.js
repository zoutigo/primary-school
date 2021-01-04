const mongoose = require("mongoose");
const { commentSchema } = require("./Comment");
const { ImageSchema, Picture } = require("./Picture");

const Schema = mongoose.Schema;
const paperSchema = new Schema({
  paper_rubric: { type: Schema.Types.ObjectId, ref: "Rubric" },
  paper_category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  paper_chapter: {
    type: Schema.Types.ObjectId,
    ref: "Chapter",
  },
  paper_type: {
    type: String,
    enum: ["article", "news", "event", "important"],
    required: true,
  },

  paper_title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100,
  },

  paper_content: {
    type: String,
    required: true,
    maxlength: 30000,
  },

  paper_createdAt: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  paper_author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  mediaPath: [{ type: String }],
  paper_status: {
    type: String,
    enum: ["draft", "undervalidation", "released"],
    default: "draft",
  },
});

module.exports = mongoose.model("Paper", paperSchema);

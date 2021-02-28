const mongoose = require("mongoose");
const { commentSchema } = require("./Comment");
const { ImageSchema, Image } = require("./Image");

const Schema = mongoose.Schema;
const paperSchema = new Schema({
  paper_rubric_id: { type: Schema.Types.ObjectId, ref: "Rubric" },
  paper_category_id: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  paper_chapter_id: {
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
  paper_author_id: {
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

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  content: {
    type: String,
    min: 2,
    max: 300,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  likes: [
    {
      author: { type: Schema.Types.ObjectId },
      like: { type: Number, min: 0, max: 1 },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
    required: true,
  },
});

module.exports = mongoose.model("Comment", commentSchema);

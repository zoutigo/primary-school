const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ImageSchema } = require("./Picture");

const userSchema = new Schema({
  name: {
    type: String,
  },
  firstname: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  role: {
    type: String,
    enum: ["parent", "teacher", "moderator", "admin"],
    required: true,
  },
  images: [ImageSchema],
  presentation: {
    type: String,
  },
  articles: [
    {
      type: Schema.ObjectId,
      ref: "Article",
    },
  ],
  news: [
    {
      type: Schema.ObjectId,
      ref: "News",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);

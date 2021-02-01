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
    unique: true,
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
  roles: [
    {
      type: String,
      enum: ["parent", "teacher"],
      default: "parent",
    },
  ],
  grade: {
    type: String,
    enum: ["admin", "manager", "moderator"],
  },
  test: {
    type: Boolean,
    default: false,
  },

  images: [
    {
      type: Schema.ObjectId,
      ref: "Picture",
    },
  ],
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

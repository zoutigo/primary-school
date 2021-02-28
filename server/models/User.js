const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ImageSchema } = require("./Image");

const userSchema = new Schema({
  name: {
    type: String,
  },
  firstname: {
    type: String,
  },
  gender: {
    type: String,
    enum: ["monsieur", "madame"],
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
      type: Schema.ObjectId,
      ref: "Role",
    },
  ],
  grade: {
    type: String,
    enum: ["admin", "manager", "moderator"],
  },
  test: {
    type: Boolean,
    default: process.env.NODE_ENV === "development",
  },

  images: [
    {
      type: Schema.ObjectId,
      ref: "Image",
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

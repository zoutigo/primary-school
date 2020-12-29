const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports.ImageSchema = new Schema({
  name: {
    type: String,
    required: true,
    max: 1024,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  // parent can be article or event or User or classroom
  parent: {
    type: Schema.ObjectId,
  },
  alt: {
    type: String,
    min: 3,
    max: 50,
  },
});

// module.exports = mongoose.model("Image", ImageSchema);

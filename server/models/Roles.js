const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const roleSchema = new Schema({
  name: {
    type: String,
    unique: true,
    minlength: 4,
    maxlength: 30,
    required: true,
  },
  test: {
    type: Boolean,
    default: process.env.NODE_ENV === "development",
  },
});

module.exports = mongoose.model("Role", roleSchema);

// enum: [
//   "Les parents",
//   "Les enseignants",
//   "La direction",
//   "secretariat-comptabilité",
//   "personnel de cantine",
//   "Les aides maternelles",
// ],

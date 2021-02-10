const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const roleSchema = new Schema({
  name: {
    type: String,
    unique: true,
    minlength: 4,
    maxlength: 30,
  },
  test: {
    type: Boolean,
    default: true,
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

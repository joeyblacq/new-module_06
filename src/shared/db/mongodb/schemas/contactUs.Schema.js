const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: /.+\@.+\..+/,
  },
  phone: {
    type: String,
    required: true,
  },
  company_name: {
    type: String,
    required: true,
  },
  project_name: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  file: {
    type: String,
    default: null,
  },
});



module.exports = mongoose.model("contactUs",contactSchema);


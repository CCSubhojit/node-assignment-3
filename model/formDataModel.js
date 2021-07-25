const mongoose = require("mongoose");

const formDatasSchema = new mongoose.Schema({
  type: {
    type: String,
    required: [true, "Type is required field."],
  },
  data: {
    type: String,
    required: [true, "Data is required field."],
  },
  created_at: {
    type: Date,
    default: Date.now(),
  }
});

const FormDatas = mongoose.model("Formdatas", formDatasSchema);
module.exports = FormDatas;

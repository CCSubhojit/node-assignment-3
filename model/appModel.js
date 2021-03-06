const mongoose = require("mongoose");

const appSchema = new mongoose.Schema({
  type: {
    type: String,
    required: [true, "Type is required field."],
  },
  label: {
    type: String,
    required: [true, "Label is required field."],
  },
  name: {
    type: String,
    required: [true, "Name is required field."],
    validate:{ // This only works on CREATE and SAVE
        validator: function(el) {
          // const regex = /[^a-zA-Z0-9-]/;
          return !el.match(/[^a-zA-Z0-9-]/);
        },
        message: "Special charachter and space are not allowed"
    }
  },
  html_id: {
    type: String,
    required: [true, "Id is required field."],
  },
  width: {
    type: Number,
    required: [true, "Width is required field."],
  },
  height: {
    type: Number,
    required: [true, "Height is required field."],
  },
  maxlength: {
    type: Number,
    required: [true, "Maxlength is required field."],
  },
  minlength: {
    type: Number,
    required: [true, "Minlength is required field."],
  },
  placeholder: {
    type: String,
    required: [true, "Placeholder is required field."],
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  is_active: {
    type: Boolean,
    default: true,
  },
  className: Array,
  other_style: Object,
});

const Elements = mongoose.model("Elements", appSchema);
module.exports = Elements;

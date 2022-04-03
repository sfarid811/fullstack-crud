const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 20,
  },
  description: {
    type: String,
    required: true,
    minlength: 20,
    maxlength: 150,
  },
} ,{timestamps: true});

module.exports = mongoose.model('Todo', todoSchema);

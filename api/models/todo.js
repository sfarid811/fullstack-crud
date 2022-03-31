const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 200,
  },
  isComplete: Boolean,
  date: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model('Todo', todoSchema);

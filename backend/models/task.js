const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 200,
    },
    status: {
      type: String,
      required: true,
    },
    deadlineDate: {
      type: Date,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model("task", taskSchema);

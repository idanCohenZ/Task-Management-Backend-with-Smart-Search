const mongoose = require("mongoose");
// define the user schema
const tasksSchema = new mongoose.Schema({
  Title: String,
  Description: String,
  DueDate: { type: Date, default: Date.now },
  Priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Low",
  },
  Status: {
    type: String,
    enum: ["Todo", "In Progress", "Done"],
    default: "Todo",
  },
});

mongoose.model("tasks", tasksSchema);

// model.js
const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: String,
  contact: Number,
  address: String,
  designation: String,
  dateCreated: {
    type: Date,
    default: Date.now, // Automatically sets to the current date and time
  },
});

const employee = mongoose.model("employee", employeeSchema);

module.exports = employee;

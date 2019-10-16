const mongoose = require("mongoose");
let departmentSchema = new mongoose.Schema({
  DeptName: {
    type: String,
    required: true
  },
  DeptSeats: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("department", departmentSchema);
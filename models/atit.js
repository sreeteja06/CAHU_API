const mongoose = require("mongoose");
let ATITSchema = new mongoose.Schema({
  maths: {
    type: Number,
    required: true
  },
  physics: {
    type: Number,
    required: true
  },
  english: {
    type: Number,
    required: true
  },
  logical: {
    type: Number,
    required: true
  },
  totalScore: {
    type: Number,
    required: true
  },
  _user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});

module.exports = mongoose.model("ATIT", ATITSchema);

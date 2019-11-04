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
  email: {
    type: String,
    required: true
  },
  preference:{
    type: String,
    required:true
  },
  preference2:{
    type: String,
    required:true
  },
  preference3:{
    type: String,
    required:true
  }
});

module.exports = mongoose.model("ATIT", ATITSchema);

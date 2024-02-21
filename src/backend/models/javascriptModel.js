const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  question: {
    type: String,
    required: [true, "please provide a question"],
  },
  answer: {
    type: String,
    required: [true, "please provide a answer"],
  },
  descTitle: {
    type: String,
  },
  desc: {
    type: String,
  },
});

const JavascriptData =
  mongoose.model.javascript || mongoose.model("javascript", interviewSchema);

module.exports = JavascriptData;

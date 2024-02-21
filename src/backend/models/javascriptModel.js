const schema = require("../utils/questionSchema");
const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema(schema);

const JavascriptData =
  mongoose.model.javascript || mongoose.model("javascript", interviewSchema);

module.exports = JavascriptData;

const schema = require("../utils/questionSchema");
const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema(schema);

const TypescriptData =
  mongoose.model.typescript || mongoose.model("typescript", interviewSchema);

module.exports = TypescriptData;

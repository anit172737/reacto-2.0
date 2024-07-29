const schema = require("../utils/questionSchema");
const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema(schema);

const NextData = mongoose.model.next || mongoose.model("next", interviewSchema);

module.exports = NextData;

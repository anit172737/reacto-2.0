const schema = require("../utils/questionSchema");
const mongoose = require("mongoose");

const reactModel = new mongoose.Schema(schema);

const ReactData = mongoose.model.react || mongoose.model("react", reactModel);

module.exports = ReactData;

const schema = require("../utils/questionSchema");
const mongoose = require("mongoose");

const cssModel = new mongoose.Schema(schema);

const CssData = mongoose.model.css || mongoose.model("css", cssModel);

module.exports = CssData;

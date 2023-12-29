const mongoose = require("mongoose");

const reactModel = new mongoose.Schema({
  question: {
    type: String,
    required: [true, "please provide a question"],
  },
  answer: {
    type: String,
    required: [true, "please provide a answer"],
  },
});

const ReactData = mongoose.model.react || mongoose.model("react", reactModel);

module.exports = ReactData;

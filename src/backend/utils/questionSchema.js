const questionSchema = {
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
};

module.exports = questionSchema;

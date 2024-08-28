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
  loading: {
    type: Boolean,
  },
  speaking: {
    type: Boolean,
  },
};

module.exports = questionSchema;

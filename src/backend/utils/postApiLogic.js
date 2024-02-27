const PostApiLogic = async (req, res, Questions) => {
  try {
    const questions = await Questions.countDocuments();
    const customId = questions;
    const data = req.body;
    console.log("datttta", data);
    if (req.file) {
      // Generate a URL for the uploaded file
      const imageUrl = "http://localhost:8000/uploads/" + req.file.filename;
      data.desc = imageUrl;
    }
    const newQuestion = new Questions({ id: `${customId + 1}`, ...data });
    await newQuestion.save();
    return res.json({
      data,
      message: "Question successfully added",
      status: 201,
    });
  } catch (error) {
    return res.json({ error: error.message, status: 500 });
  }
};

module.exports = PostApiLogic;

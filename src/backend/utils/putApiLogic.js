const PutApiLogic = async (req, res, Questions) => {
  try {
    const itemId = parseInt(req.params.id);
    const data = req.body;
    if (req.file) {
      // Generate a URL for the uploaded file
      const imageUrl = "http://localhost:8000/uploads/" + req.file.filename;
      data.desc = imageUrl;
    }
    await Questions.updateOne(
      { id: itemId },
      { $set: { ...data } },
      { new: true }
    );
    res.json({
      status: 200,
      message: "Question updated successfully",
    });
  } catch (error) {
    return res.json({ error: error.message, status: 400 });
  }
};

module.exports = PutApiLogic;

const DeleteApiLogic = async (req, res, Questions) => {
  try {
    await Questions.deleteOne({ id: req.params.id });
    res.json({
      status: 204,
      message: "Question deleted successfully",
    });
  } catch (error) {
    res.json({ error: error.message, status: 404 });
  }
};

module.exports = DeleteApiLogic;

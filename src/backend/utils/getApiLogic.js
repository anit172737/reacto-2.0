const GetApiLogic = async (req, res, Questions) => {
  try {
    const { search, pageSize, pageNumber } = req?.query;

    // Calculate the skip and limit values
    const skip = (pageNumber - 1) * pageSize;
    const limit = pageSize;

    const questions = await Questions.find(
      { question: { $regex: search, $options: "i" } },
      { _id: 0 }
    )
      .skip(skip)
      .limit(limit);
    const questionsAll = await Questions.find(
      { question: { $regex: search, $options: "i" } },
      { _id: 0 }
    );

    return res.json({
      data: {
        questions,
        count: questions?.length,
        total: questionsAll?.length,
      },
      message: "Questions fetch successfully",
      status: 201,
    });
  } catch (error) {
    return res.json({ error: error.message, status: 500 });
  }
};

module.exports = GetApiLogic;

const express = require("express");
const router = express.Router();
const Questions = require("../../../models/javascriptModel");
const upload = require("../../../middleware/uploader");

//fetch questions
router.get("/jsList", async (req, res) => {
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
});

//create new question
router.post("/addJs", upload.single("desc"), async (req, res) => {
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
});

//update question by id
//upload.single("desc") : this is imp for uploading file in binary format don't forgot add in api tag
router.put("/editJs/:id", upload.single("desc"), async (req, res) => {
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
});

//delete question by id
router.delete("/deleteJs/:id", async (req, res) => {
  try {
    await Questions.deleteOne({ id: req.params.id });
    res.json({
      status: 204,
      message: "Question deleted successfully",
    });
  } catch (error) {
    res.json({ error: error.message, status: 404 });
  }
});

module.exports = router;

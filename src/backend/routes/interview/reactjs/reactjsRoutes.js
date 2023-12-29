const express = require("express");
const router = express.Router();
const Questions = require("../../../models/reactModel");

//create new question
router.post("/questionreact", async (req, res) => {
  try {
    const newQuestion = new Questions(req.body);
    await newQuestion.save();
    return res.json({ message: "Question added successfully", status: 201 });
  } catch (error) {
    return res.json({ error: error.message, status: 500 });
  }
});

//fetch questions
router.get("/questionreact", async (req, res) => {
  try {
    const questions = await Questions.find();
    return res.json({
      data: questions,
      message: "Questions fetch successfully",
      status: 201,
    });
  } catch (error) {
    return res.json({ error: error.message, status: 500 });
  }
});

//update question by id
router.put("/questionreact/:id", async (req, res) => {
  try {
    const question = await Questions.findbyIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({
      data: question,
      status: 200,
      message: "Question updated successfully",
    });
  } catch (error) {
    return res.json({ error: error.message, status: 400 });
  }
});

//delete question by id
router.delete("/questionreact/:id", async (req, res) => {
  try {
    await Questions.findbyIdAndRemove(req.params.id);
    res.json({
      status: 204,
      message: "Question deleted successfully",
    });
  } catch (error) {
    res.json({ error: error.message, status: 404 });
  }
});

module.exports = router;

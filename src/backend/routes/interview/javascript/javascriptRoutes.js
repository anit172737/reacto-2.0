const express = require("express");
const router = express.Router();
const Questions = require("../../../models/javascriptModel");


//fetch questions
router.get("/questionjs", async (req, res) => {
  try {
    
    const questions = await Questions.find({}, { _id: 0 });
    return res.json({
      data: questions,
      message: "Questions fetch successfully",
      status: 201,
    });
  } catch (error) {
    return res.json({ error: error.message, status: 500 });
  }
});


//create new question
router.post("/questionjs", async (req, res) => {
  try {
    const questions = await Questions.countDocuments();
    const customId = questions;
    const data = req.body;
    const newQuestion = new Questions({ id: `${customId + 1}`, ...data });
    await newQuestion.save();
    return res.json({ message: "Question successfully added", status: 201 });
  } catch (error) {
    return res.json({ error: error.message, status: 500 });
  }
});


//update question by id
router.put("/questionjs/:id", async (req, res) => {
  try {
    const itemId = parseInt(req.params.id);
    const data = req.body
    await Questions.updateOne({id:itemId}, {$set:data}, {new:true})
    res.json({
      status: 200,
      message: "Question updated successfully",
    });
  } catch (error) {
    return res.json({ error: error.message, status: 400 });
  }
});

//delete question by id
router.delete("/questionjs/:id", async (req, res) => {
  try {
    await Questions.deleteOne({id:req.params.id});
    res.json({
      status: 204,
      message: "Question deleted successfully",
    });
  } catch (error) {
    res.json({ error: error.message, status: 404 });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const Questions = require("../../../models/reactModel");
const upload = require("../../../middleware/uploader");
const GetApiLogic = require("../../../utils/getApiLogic");
const PostApiLogic = require("../../../utils/postApiLogic");
const PutApiLogic = require("../../../utils/putApiLogic");
const DeleteApiLogic = require("../../../utils/deleteApiLogic");

//fetch questions
router.get("/reactList", async (req, res) => {
  GetApiLogic(req, res, Questions);
  // try {
  //   const questions = await Questions.find();
  //   return res.json({
  //     data: questions,
  //     message: "Questions fetch successfully",
  //     status: 201,
  //   });
  // } catch (error) {
  //   return res.json({ error: error.message, status: 500 });
  // }
});

//create new question
router.post("/addReact", upload.single("desc"), async (req, res) => {
  PostApiLogic(req, res, Questions);
  // try {
  //   const newQuestion = new Questions(req.body);
  //   await newQuestion.save();
  //   return res.json({ message: "Question added successfully", status: 201 });
  // } catch (error) {
  //   return res.json({ error: error.message, status: 500 });
  // }
});

//update question by id
router.put("/editReact/:id", upload.single("desc"), async (req, res) => {
  PutApiLogic(req, res, Questions);
  // try {
  //   const question = await Questions.findbyIdAndUpdate(
  //     req.params.id,
  //     req.body,
  //     { new: true }
  //   );
  //   res.json({
  //     data: question,
  //     status: 200,
  //     message: "Question updated successfully",
  //   });
  // } catch (error) {
  //   return res.json({ error: error.message, status: 400 });
  // }
});

//delete question by id
router.delete("/deleteReact/:id", async (req, res) => {
  DeleteApiLogic(req, res, Questions);
  // try {
  //   await Questions.findbyIdAndRemove(req.params.id);
  //   res.json({
  //     status: 204,
  //     message: "Question deleted successfully",
  //   });
  // } catch (error) {
  //   res.json({ error: error.message, status: 404 });
  // }
});

module.exports = router;

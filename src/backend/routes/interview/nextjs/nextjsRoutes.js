const express = require("express");
const router = express.Router();
const Questions = require("../../../models/nextModel");
const upload = require("../../../middleware/uploader");
const GetApiLogic = require("../../../utils/getApiLogic");
const PostApiLogic = require("../../../utils/postApiLogic");
const PutApiLogic = require("../../../utils/putApiLogic");
const DeleteApiLogic = require("../../../utils/deleteApiLogic");

//fetch questions
router.get("/nextList", async (req, res) => {
  GetApiLogic(req, res, Questions);
});

//create new question
router.post("/addNext", upload.single("desc"), async (req, res) => {
  PostApiLogic(req, res, Questions);
});

//update question by id
//upload.single("desc") : this is imp for uploading file in binary format don't forgot add in api tag
router.put("/editNext/:id", upload.single("desc"), async (req, res) => {
  PutApiLogic(req, res, Questions);
});

//delete question by id
router.delete("/deleteNext/:id", async (req, res) => {
  DeleteApiLogic(req, res, Questions);
});

module.exports = router;

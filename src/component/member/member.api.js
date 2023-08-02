"use strict";

const express = require("express");
const router = express.Router();
const memberController = require("./member.controller");
const multer = require("multer");
//dest는 파일이 저장될 디렉토리 지정.
const upload = multer({ dest: "./upload" });

router.get("/api/members", memberController.read);
router.post("/api/members", upload.single("image"), memberController.create);
router.delete("/api/members/:id", memberController.delete);

module.exports = router;

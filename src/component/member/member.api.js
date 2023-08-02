"use strict";

const express = require("express");
const router = express.Router();
const controller = require("./member.controller");
const multer = require("multer");
//dest는 파일이 저장될 디렉토리 지정.
const upload = multer({ dest: "./upload" });

router.get("/api/members", controller.read);

router.post("/api/members", upload.single("image"), controller.create);

module.exports = router;

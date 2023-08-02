"use strict";

const express = require("express");
const router = express.Router();
const postController = require("./post.controller");

router.get("/api/posts", postController.read);
router.post("/api/posts", postController.create);

module.exports = router;

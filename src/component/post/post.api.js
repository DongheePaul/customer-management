"use strict";

const express = require("express");
const router = express.Router();
const postController = require("./post.controller");

router.post("/api/posts", postController.create);

module.exports = router;

"use strict";

const express = require("express");
const router = express.Router();
const postController = require("./post.controller");

router.get("/api/posts", postController.read);
router.get("/api/posts/:post_id", postController.read);
router.post("/api/posts", postController.create);
router.put("/api/posts/:post_id", postController.update);

module.exports = router;

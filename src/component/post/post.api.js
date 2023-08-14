"use strict";

const express = require("express");
const router = express.Router();
const postController = require("./post.controller");
const { jwtHelper } = require("../../middlewares");

router.get("/api/posts", postController.read);
router.get("/api/posts/:post_id", postController.read);
router.post("/api/posts", jwtHelper.verifyMiddleware, postController.create);
router.put("/api/posts/:post_id", postController.update);
router.delete("/api/posts/:post_id", postController.delete);

module.exports = router;

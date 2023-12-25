import express, { Router } from "express";
import * as postController from "./post.controller";
import { jwtHelper } from "../../middlewares"; // 실제 경로에 맞게 조정 필요

const router: Router = express.Router();

router.get("/api/posts", postController.read);
router.get("/api/posts/:post_id", postController.read);
router.post("/api/posts", jwtHelper.verifyMiddleware, postController.create);
router.put(
  "/api/posts/:post_id",
  jwtHelper.verifyMiddleware,
  postController.update
);
router.delete(
  "/api/posts/:post_id",
  jwtHelper.verifyMiddleware,
  postController.delete
);

export default router;

import express, { Router } from "express";
import * as memberController from "./member.controller";
import multer from "multer";

const router: Router = express.Router();
const upload = multer({ dest: "./upload" });

router.get("/api/members", memberController.read);
router.post("/api/members", upload.single("image"), memberController.create);
router.delete("/api/members/:id", memberController.delete);

export default router;

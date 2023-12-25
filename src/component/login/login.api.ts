import express from "express";
import { Request, Response } from "express";
import * as loginController from "./login.controller";

const router = express.Router();

router.post("/api/login", loginController.read);

export default router;

"use strict";

const express = require("express");
const router = express.Router();
const loginController = require("./login.controller");

router.post("/api/login", loginController.read);

module.exports = router;

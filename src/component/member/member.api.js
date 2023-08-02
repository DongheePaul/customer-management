"use strict";

const express = require("express");
const router = express.Router();
const controller = require("./member.controller");

router.get("/api/members", controller.read);

module.exports = router;

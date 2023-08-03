"use strict";

const { m_member } = require("../../model");
const { jwtHelper } = require("../../utils");

const read = async (req, res, next) => {
  const params = [req.body.username, req.body.password];

  // Prepared Statement 쿼리 생성
  const sql = "SELECT * FROM members WHERE name = ? AND password = ?";
  try {
    const results = await m_member.read(sql, params);
    const token = jwtHelper.generateToken(results[0].id, results[0].name);
    res.status(200).json({ success: true, token: token });
  } catch (error) {
    res.status(401).json({ success: false, message: "Invalid credentials" });
    return;
  }
};
module.exports = {
  read,
};

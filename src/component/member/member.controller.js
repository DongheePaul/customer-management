"use strict";

const { m_member } = require("../../model");

const read = async (req, res, next) => {
  const query = "select * from members where is_deleted = 0";
  const results = await m_member.read(query);
  res.json(results);
};

const create = async (req, res, next) => {
  console.log("in create in member.controller");
  let sql = "insert into members values (null, ?, ?, ?, ?, 0, 0, now(), null)";
  let image = "http://localhost:3001/image/" + req.file.filename;
  let name = req.body.name;
  let password = req.body.password;
  let gender = req.body.gender;
  let params = [image, name, password, gender];
  const results = await m_member.create(sql, params);
  res.json(results);
};
const deleteMember = async (req, res, next) => {
  let sql = "UPDATE members SET is_deleted = 1 WHERE id = ?";
  let params = [req.params.id];
  const results = await m_member.delete(sql, params);
  res.json(results);
};

module.exports = {
  read,
  create,
  delete: deleteMember,
};

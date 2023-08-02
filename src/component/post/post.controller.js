"use strict";

const { m_post } = require("../../model");
const jwt = require("jsonwebtoken");
const conf = require("../../../config/config.json");

const read = async (req, res, next) => {
  const query = "select * from members where is_deleted = 0";
  const results = await m_member.read(query);
  res.json(results);
};

const create = async (req, res, next) => {
  const authToken = req.header("Authorization");
  const tokenValue = authToken ? authToken.replace("Bearer ", "") : null;

  const { title, content } = req.body;
  console.log("title: ", title);
  console.log("content: ", content);
  let authorId = null;
  try {
    const decodedToken = jwt.verify(tokenValue, conf.jwt.secret);
    authorId = decodedToken.id;
    const sql = `INSERT INTO posts (title, content, author_id) VALUES (?, ?, ?)`;
    const values = [title, content, authorId];
    const results = await m_post.create(sql, values);
    res.json(results);
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(401).json({ error: "Invalid token" });
  }
  //   let sql = "insert into members values (null, ?, ?, ?, ?, 0, 0, now(), null)";
  //   let image = "http://localhost:3001/image/" + req.file.filename;
  //   let name = req.body.name;
  //   let password = req.body.password;
  //   let gender = req.body.gender;
  //   let params = [image, name, password, gender];
  //   res.json(results);
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

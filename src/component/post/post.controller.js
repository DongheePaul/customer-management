"use strict";

const { m_post } = require("../../model");
const conf = require("../../../config/config.json");
const { jwtHelper } = require("../../middlewares");

const read = async (req, res, next) => {
  const query = "select * from members where is_deleted = 0";
  const results = await m_member.read(query);
  res.json(results);
};

const create = async (req, res, next) => {
  const authToken = req.header("Authorization");

  const { title, content } = req.body;
  let authorId = null;

  try {
    const decodedToken = await jwtHelper.verify(authToken);
    authorId = decodedToken.id;
    const sql = `INSERT INTO posts (title, content, author_id) VALUES (?, ?, ?)`;
    const values = [title, content, authorId];
    const results = await m_post.create(sql, values);
    res.json(results);
  } catch (error) {
    return res.status(401).json({ error: error });
  }
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

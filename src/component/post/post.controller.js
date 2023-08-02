"use strict";

const { m_post } = require("../../model");
const { jwtHelper } = require("../../middlewares");

const read = async (req, res, next) => {
  const { post_id } = req.params;
  console.log("read in post.controller. id => " + post_id);
  if (post_id) {
    const query = "select * from posts where id = " + post_id;

    const results = await m_post.read(query);
    console.log("read in post.controller. results => " + results);

    res.json(results);
  } else {
    const query = "select * from posts where is_deleted = 0";
    const results = await m_post.read(query);
    res.json(results);
  }
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

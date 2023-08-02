"use strict";

const { m_post } = require("../../model");
const { jwtHelper } = require("../../middlewares");
const { param } = require("./post.api");

const read = async (req, res, next) => {
  const { post_id } = req.params;
  if (post_id) {
    const query = "select * from posts where id = " + post_id;

    const results = await m_post.read(query);

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
    authorId = decodedToken.username;
    const sql = `INSERT INTO posts (title, content, author_id) VALUES (?, ?, ?)`;
    const values = [title, content, authorId];
    const results = await m_post.create(sql, values);
    res.json(results);
  } catch (error) {
    return res.status(401).json({ error: error });
  }
};
const deletePost = async (req, res, next) => {
  const { post_id } = req.params;
  let params = [post_id];
  let sql = "UPDATE posts SET is_deleted = 1 WHERE id = ?";
  console.log("post_id ===> " + params);
  const results = await m_post.delete(sql, params);
  console.log("results ===> " + results);

  res.json(results);
};

const update = async (req, res, next) => {
  console.log("in updatePost******************");
  const { post_id } = req.params;
  const { title, content } = req.body;
  const params = [title, content, post_id];
  const sql = "UPDATE posts SET title=?, content=? WHERE id=?";

  try {
    const result = await m_post.update(sql, params);
    console.log(result);
    res.json(result);
  } catch (error) {
    console.log("error in update in post.controller.js ==> " + error);
    return res.status(401).json({ error: error });
  }
};

module.exports = {
  read,
  create,
  delete: deletePost,
  update,
};

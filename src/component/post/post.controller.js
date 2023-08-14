"use strict";

const { m_post } = require("../../model");
const { jwtHelper } = require("../../middlewares");
const { postAuth } = require("./post.auth");

const read = async (req, res, next) => {
  try {
    //post_id가 있다면 게시물 1개 읽어오기
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
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const create = async (req, res, next) => {
  console.log("in create. req.user ===> " + JSON.stringify(req.user));
  try {
    const authToken = req.header("Authorization");
    const { title, content } = req.body;
    if (!title || !content || !authToken) {
      throw new Error("Missing title or content or JWT token");
    }
    const decodedToken = await jwtHelper.verify(authToken);
    const sql = `INSERT INTO posts (title, content, author_id, author_name) VALUES (?, ?, ?, ?)`;
    const params = [title, content, decodedToken.id, decodedToken.name];
    const results = await m_post.create(sql, params);
    res.json(results);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deletePost = async (req, res, next) => {
  try {
    const { post_id } = req.params;
    const authToken = req.header("Authorization");
    if (!post_id || !authToken) {
      throw new Error("Missing post id or JWT token");
    }
    const decodedToken = await jwtHelper.verify(authToken);
    const isAuthorized = await postAuth(post_id, decodedToken.id);
    if (!isAuthorized) {
      throw new Error("Authorization failed");
    }
    const params = [post_id];
    const sql = "UPDATE posts SET is_deleted = 1 WHERE id = ?";
    const results = await m_post.delete(sql, params);
    res.json(results);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const update = async (req, res, next) => {
  console.log("in update");
  try {
    const { post_id } = req.params;
    const { title, content } = req.body;
    const authToken = req.header("Authorization");

    if (!title || !post_id || !content | !authToken) {
      throw new Error("Missing post id or JWT token");
    }
    const decodedToken = await jwtHelper.verify(authToken);
    const isAuthorized = await postAuth(post_id, decodedToken.id);
    console.log("isAuthorized", isAuthorized);
    if (!isAuthorized) {
      throw new Error("Authorization failed");
    }
    const params = [title, content, post_id];
    const sql = "UPDATE posts SET title=?, content=? WHERE id=?";
    const result = await m_post.update(sql, params);
    res.json(result);
  } catch (error) {
    console.log("in update error => " + error.message);
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  read,
  create,
  delete: deletePost,
  update,
};

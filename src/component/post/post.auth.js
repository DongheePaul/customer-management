"use strict";

const { m_post } = require("../../model");

//토큰 안에 유저 아이디가 들어가 있고. mysql의 posts 테이블에서 post_id로 게시물 찾아내어 author_id와 토큰 안 유저 아이디 비교하면 됨
const postAuth = async (post_id, user_id) => {
  const sql = "select author_id from posts where id = " + post_id;
  const result = await m_post.read(sql);
  if (result.length > 0 && result[0].author_id === user_id) {
    console.log("post auth success");
    return true;
  } else {
    console.log("post auth failed");
    return false;
  }
};

module.exports = {
  postAuth,
};

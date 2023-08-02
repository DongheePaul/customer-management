"use strict";

const { m_member } = require("../../model");

const read = async (req, res, next) => {
  const query = "select * from members where is_deleted = 0";
  const results = await m_member.read(query);
  res.json(results);
};

module.exports = {
  read,
};

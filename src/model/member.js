"use strict";

const db = require("./database");

const read = async (sql) => {
  const result = await db.query(sql);
  return result;
};

const create = async (sql, params) => {
  const result = await db.query(sql, params);
  return result;
};

module.exports = {
  read,
  create,
};

"use strict";

const db = require("./database");

const read = async (sql, params) => {
  const result = await db.query(sql, params);
  return result;
};

const create = async (sql, params) => {
  const result = await db.query(sql, params);
  return result;
};

const deleteMember = async (sql, params) => {
  const result = await db.query(sql, params);
  return result;
};

module.exports = {
  read,
  create,
  delete: deleteMember,
};

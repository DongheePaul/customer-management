"use strict";

const db = require("./database");

const read = async (sql) => {
  const result = await db.query(sql);
  return result;
};

module.exports = {
  read,
};

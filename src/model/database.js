"use strict";

const mysql = require("mysql");
const conf = require("../../config/config.json");
let connection;

const connect = () => {
  return new Promise((resolve, reject) => {
    const con = mysql.createConnection({
      host: conf.db.host,
      user: conf.db.user,
      password: conf.db.password,
      port: conf.db.port,
      database: conf.db.database,
    });
    con.connect((err) => {
      if (err) {
        reject(err);
      } else {
        connection = con;
        resolve(con);
      }
    });
  });
};

const connectionStart = async () => {
  try {
    await connect();
    console.log("Connection established.");
  } catch (error) {
    console.error("Connection error:", error);
  }
};

const query = (sql, params) => {
  return new Promise((resolve, reject) => {
    connection.query(sql, params, (err, rows, fields) => {
      if (err) {
        console.log("in query err" + err);
        reject(err);
      } else {
        console.log("in query rows" + rows);
        resolve(rows);
      }
    });
  });
};

connectionStart();

module.exports = {
  connect,
  query,
};

const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = fs.readFileSync("./database.json");
const conf = JSON.parse(db);
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database,
});
connection.connect();

app.get("/api/customers", (req, res) => {
  connection.query("select * from customer", (err, rows, fields) => {
    res.send(rows);
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));

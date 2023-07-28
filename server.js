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
  connection.query(
    "select * from customer where isDeleted = 0",
    (err, rows, fields) => {
      res.send(rows);
    }
  );
});

const multer = require("multer");
const upload = multer({ dest: "./upload" });
//image경로로 들어오면 upload폴더와 매핑.
app.use("/image", express.static("./upload"));

app.post("/api/customers", upload.single("image"), (req, res) => {
  let sql = "insert into customer values (null, ?, ?, ?, ?, ?, now(), 0)";
  let image = "http://localhost:3001/image/" + req.file.filename;
  let name = req.body.name;
  let birthday = req.body.birthday;
  let gender = req.body.gender;
  let job = req.body.job;
  let params = [image, name, birthday, gender, job];
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

app.delete("/api/customers/:id", (req, res) => {
  let sql = "UPDATE customer SET isDeleted = 1 WHERE id = ?";
  let params = [req.params.id];
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

app.post("/api/members", upload.single("image"), (req, res) => {
  let sql = "insert into members values (null, ?, ?, ?, ?, 0, 0, now(), null)";
  let image = "http://localhost:3001/image/" + req.file.filename;
  let name = req.body.name;
  let password = req.body.password;
  let gender = req.body.gender;
  let params = [image, name, password, gender];
  connection.query(sql, params, (err, rows, fields) => {
    console.log("에러" + err);
    console.log("rows" + rows);
    res.send(rows);
  });
});

app.get("/api/members", (req, res) => {
  console.log("api/members 왓슈 ");
  connection.query(
    "select * from members where is_deleted = 0",
    (err, rows, fields) => {
      res.send(rows);
    }
  );
});

app.delete("/api/members/:id", (req, res) => {
  let sql = "UPDATE members SET is_deleted = 1 WHERE id = ?";
  let params = [req.params.id];
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

app.post("/api/login", (req, res) => {
  console.log("login 왓슈");
  res.send("hi");
});

app.listen(port, () => console.log(`Listening on port ${port}`));

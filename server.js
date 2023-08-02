"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3001;
const routes = require("./src/routes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//image경로로 요청이 들어오면 upload폴더와 매핑.
app.use("/image", express.static("./upload"));

routes.load(app);

app.delete("/api/customers/:id", (req, res) => {
  let sql = "UPDATE customer SET isDeleted = 1 WHERE id = ?";
  let params = [req.params.id];
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

const { jwtHelper } = require("./src/middlewares");
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  // Prepared Statement 쿼리 생성
  const sql = "SELECT * FROM members WHERE name = ? AND password = ?";

  // Prepared Statement 쿼리 실행
  connection.query(sql, [username, password], (err, results) => {
    if (err) {
      res.status(401).json({ success: false, message: "Invalid credentials" });
      return;
    }
    const token = jwtHelper.generateToken(results[0].id, results[0].name);
    res.status(200).json({ success: true, token: token });
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));

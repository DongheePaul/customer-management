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

app.listen(port, () => console.log(`Listening on port ${port}`));

import express from "express";
import bodyParser from "body-parser";
import { load } from "./src/routes"; // 예시 경로, 실제 경로에 맞게 조정 필요
import { connectionStart } from "./src/model/database"; // 예시 경로, 실제 경로에 맞게 조정 필요

const app = express();
const port = process.env.PORT || 3001;

connectionStart();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// image 경로로 요청이 들어오면 upload 폴더와 매핑
app.use("/image", express.static("./upload"));

load(app);

app.listen(port, () => console.log(`Listening on port ${port}`));

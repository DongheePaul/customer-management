import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  paper: {
    padding: theme.spacing(3),
    maxWidth: 300,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: theme.spacing(2),
  },
}));

const LoginPage = () => {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    // 서버 URL을 설정합니다. 적절한 URL로 변경해주세요.
    const apiUrl = "/api/login";

    // 보낼 데이터를 JSON 형태로 만듭니다.
    const requestData = {
      username: username,
      password: password,
    };

    // fetch 함수를 사용하여 POST 요청을 보냅니다.
    return fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });
  };

  const callApi = () => {
    handleLogin()
      .then((response) => {
        // HTTP 응답이 성공적으로 도착한 경우에만 JSON 데이터를 가져와서 처리합니다.
        if (response.ok) {
          return response.json();
        } else {
          // HTTP 응답이 에러인 경우에 대한 처리를 여기에 추가할 수 있습니다.
          // 예를 들어, 로그인 실패 시 에러 메시지를 사용자에게 보여줄 수 있습니다.
          console.error("HTTP Error:", response.status);
        }
      })
      .then((data) => {
        // 서버로부터 받은 응답 데이터를 처리합니다.
        // 예를 들어, 로그인 성공 여부 등을 판단하여 다음 동작을 수행할 수 있습니다.
        console.log(data);
      })
      .catch((error) => {
        // 에러가 발생한 경우 처리합니다.
        console.error("Error:", error);
      });
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <form className={classes.form}>
          <TextField
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={callApi}>
            Login
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default LoginPage;

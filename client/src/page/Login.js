import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const handleLogin = async () => {
    const apiUrl = "/api/login";

    const requestData = {
      username: username,
      password: password,
    };

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
        if (response.ok) {
          return response.json();
        } else {
          console.error("HTTP Error:", response.status);
        }
      })
      .then((data) => {
        if (data && data.token) {
          localStorage.setItem("authToken", data.token);
          const storedToken = localStorage.getItem("authToken");
          if (storedToken) {
            // 토큰이 존재하는 경우, 원하는 동작 수행
            navigate("/", { replace: true }); // "/"로 페이지 이동.replace 옵션을 true로 설정하여 기록에 남기지 않음
          } else {
            console.log("Token not found in localStorage.");
          }
        } else {
          console.error("Token not found in response data.");
        }
      })
      .catch((error) => {
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

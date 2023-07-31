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
    const apiUrl = "/api/login";

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
        if (response.ok) {
          console.log(response);
        } else {
          console.error("HTTP Error:", response.status);
        }
      })
      .then((data) => {
        //console.log(data);
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

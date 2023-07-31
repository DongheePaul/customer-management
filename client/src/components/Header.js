import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "#2196f3",
  },
  title: {
    flexGrow: 1,
    textDecoration: "none",
    color: "white",
  },
  loginButton: {
    color: "white",
  },
}));

const Header = () => {
  const classes = useStyles();
  const authToken = localStorage.getItem("authToken");
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/", { replace: true }); // "/"로 페이지 이동 (replace 옵션을 true로 설정하여 기록에 남기지 않음)
  };

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          className={classes.title}
        >
          고객 관리 시스템
        </Typography>
        {authToken ? (
          <IconButton
            component={Link}
            to="/"
            edge="end"
            className={classes.loginButton}
            onClick={handleLogout}
          >
            <AccountCircleIcon />
          </IconButton>
        ) : (
          <Typography
            variant="h6"
            component={Link}
            to="/login"
            className={classes.loginButton}
          >
            Login
          </Typography>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;

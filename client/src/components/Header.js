import React from "react";
import { Link } from "react-router-dom";
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
        <IconButton
          component={Link}
          to="/login"
          edge="end"
          className={classes.loginButton}
        >
          <AccountCircleIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

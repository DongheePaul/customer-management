import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar disableGutters>
        <Typography
          className={classes.title}
          variant="h6"
          noWrap
          component={Link}
          to="/"
          color="inherit"
        >
          Home
        </Typography>
        <Typography
          variant="h6"
          color="inherit"
          noWrap
          component="a"
          href="/"
          className={classes.title}
        >
          고객 관리 시스템
        </Typography>
        <Typography
          variant="h6"
          noWrap
          component={Link}
          to="/signup"
          color="inherit"
          className={classes.title}
        >
          로그인
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

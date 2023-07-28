import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar disableGutters>
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="/"
          color="inherit"
          style={{ marginRight: "20px" }}
        >
          Home
        </Typography>
        <Typography
          variant="h6"
          color="inherit"
          noWrap
          component="a"
          href="/"
          style={{ marginRight: "20px" }}
        >
          고객 관리 시스템
        </Typography>
        <Typography variant="h6" noWrap component="a" href="/" color="inherit">
          로그인
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

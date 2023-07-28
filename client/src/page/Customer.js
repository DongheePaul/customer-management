import React, { useState, useEffect } from "react";
import CustomerTable from "../components/CustomerTable";
import CustomerAdd from "../components/CustomerAdd";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { alpha } from "@material-ui/core/styles/colorManipulator";
import SearchIcon from "@material-ui/icons/Search";

const styles = (theme) => ({
  root: {
    width: "100%",
    minWidth: 1080,
  },
  progress: {
    margin: theme.spacing(2),
  },
  menu: {
    marginTop: 15,
    marginBottom: 15,
    display: "flex",
    justifyContent: "center",
  },
  paper: {
    marginLeft: 18,
    marginRight: 18,
  },
  grow: {
    flexGrow: 1,
  },
  tableHead: {
    fontSize: "1.0rem",
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
    marginLeft: 30,
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit,
      width: "auto",
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200,
      },
    },
  },
});
const useStyles = makeStyles(styles);

function Customer() {
  const [customers, setCustomers] = useState([]);
  const [completed, setCompleted] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState("");
  const classes = useStyles(); // makeStyles의 반환 값을 호출하여 classes 객체를 가져옴

  const stateRefresh = () => {
    setCustomers([]);
    setCompleted(0);
    setSearchKeyword("");
    callApi()
      .then((res) => setCustomers(res))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const timer = setInterval(progress, 20);
    callApi()
      .then((res) => setCustomers(res))
      .catch((err) => console.log(err));

    return () => {
      clearInterval(timer);
    };
  }, []);

  const callApi = async () => {
    const response = await fetch("/api/customers");
    const body = await response.json();
    return body;
  };

  const progress = () => {
    setCompleted((prevCompleted) =>
      prevCompleted >= 100 ? 0 : prevCompleted + 1
    );
  };

  const handleValueChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const filteredComponent = (data) => {
    data = data.filter((customer) => {
      return customer.name.indexOf(searchKeyword) > -1;
    });
    return data.map((c) => {
      return (
        <CustomerTable
          stateRefresh={stateRefresh}
          key={c.id}
          id={c.id}
          image={c.image}
          name={c.name}
          birthday={c.birthday}
          gender={c.gender}
          job={c.job}
        />
      );
    });
  };

  const cellList = [
    "번호",
    "프로필",
    "이름",
    "생년월일",
    "성별",
    "직업",
    "설정",
  ];

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar disableGutters>
          <Typography
            className={classes.title}
            variant="h6"
            noWrap
            component="a"
            href="/"
            color="inherit"
          >
            Home
          </Typography>
          <Typography
            className={classes.title}
            variant="h6"
            color="inherit"
            noWrap
            component="a"
            href="/"
          >
            고객 관리 시스템
          </Typography>
          <div className={classes.grow} />
        </Toolbar>
      </AppBar>
      <div className={classes.menu}>
        <CustomerAdd stateRefresh={stateRefresh} />
      </div>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="검색하기"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          name="searchKeyword"
          value={searchKeyword}
          onChange={handleValueChange}
        />
      </div>
      <Paper className={classes.paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              {cellList.map((c) => {
                return <TableCell className={classes.tableHead}>{c}</TableCell>;
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {customers ? (
              filteredComponent(customers)
            ) : (
              <TableRow>
                <TableCell colSpan="6" align="center">
                  <CircularProgress
                    className={classes.progress}
                    variant="determinate"
                    value={completed}
                  />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}

export default withStyles(styles)(Customer);

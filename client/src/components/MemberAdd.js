import React from "react";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  hidden: {
    display: "none",
  },
});

class MemberAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      userName: "",
      password: "",
      gender: "",
      job: "",
      fileName: "",
      open: false, //다이얼로그창을 위한 플래그
    };
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    this.addMember().then((response) => {
      this.props.stateRefresh();
    });
    this.setState({
      file: null,
      userName: "",
      password: "",
      gender: "",
      job: "",
      fileName: "",
      open: false,
    });
  };

  handleFileChange = (e) => {
    this.setState({
      file: e.target.files[0],
      fileName: e.target.value,
    });
  };

  handleValueChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  };

  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = () => {
    this.setState({
      file: null,
      userName: "",
      password: "",
      gender: "",
      job: "",
      fileName: "",
      open: false,
    });
  };

  addMember = () => {
    const url = "/api/members";
    const formData = new FormData();
    formData.append("image", this.state.file);
    formData.append("name", this.state.userName);
    formData.append("password", this.state.password);
    formData.append("gender", this.state.gender);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    return axios.post(url, formData, config);
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={this.handleClickOpen}
        >
          멤버 추가
        </Button>
        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle>멤버 추가</DialogTitle>
          <DialogContent>
            <input
              className={classes.hidden}
              accept="image/*"
              id="raised-button-file"
              type="file"
              file={this.state.file}
              value={this.state.fileName}
              onChange={this.handleFileChange}
            />
            <br />
            <label htmlFor="raised-button-file">
              <Button
                variant="contained"
                color="primary"
                component="span"
                name="file"
              >
                {this.state.fileName === ""
                  ? "프로필 이미지 선택"
                  : this.state.fileName}
              </Button>
            </label>
            <br />
            <TextField
              label="이름"
              type="text"
              name="userName"
              value={this.state.userName}
              onChange={this.handleValueChange}
            />
            <br />
            <TextField
              label="비밀번호"
              type="text"
              name="password"
              value={this.state.password}
              onChange={this.handleValueChange}
            />
            <br />
            <TextField
              label="성별"
              type="text"
              name="gender"
              value={this.state.gender}
              onChange={this.handleValueChange}
            />
            <br />
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleFormSubmit}
            >
              추가
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={this.handleClose}
            >
              닫기
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(MemberAdd);
